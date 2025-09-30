import Payment from '../models/Payment.js';
import Event from '../models/Event.js';
import ExchangeRate from '../models/ExchangeRate.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Crear pago para un evento
export const createPayment = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { paymentMethod, currency = 'USD' } = req.body;

  // Obtener evento con proveedores
  const event = await Event.findById(eventId)
    .populate('providers.provider', 'businessName category pricing contact');

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Evento no encontrado'
    });
  }

  if (event.organizer.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para crear pagos para este evento'
    });
  }

  // Calcular totales
  let totalAmount = 0;
  const providerPayments = [];

  for (const providerData of event.providers) {
    if (providerData.status === 'confirmed') {
      let amount = providerData.price;

      // Convertir moneda si es necesario
      if (providerData.currency !== currency) {
        const rate = await ExchangeRate.getRate(providerData.currency, currency);
        amount = amount * rate;
      }

      totalAmount += amount;
      providerPayments.push({
        provider: providerData.provider._id,
        service: providerData.service,
        amount: amount,
        currency: currency
      });
    }
  }

  if (totalAmount === 0) {
    return res.status(400).json({
      success: false,
      message: 'No hay proveedores confirmados para procesar el pago'
    });
  }

  // Calcular comisión de la plataforma (8.5% por defecto)
  const commissionPercentage = 8.5;
  const commissionAmount = totalAmount * (commissionPercentage / 100);

  // Crear pago
  const payment = new Payment({
    event: eventId,
    customer: req.user._id,
    totalAmount,
    currency,
    platformCommission: {
      percentage: commissionPercentage,
      amount: commissionAmount
    },
    providerPayments,
    status: 'pending',
    paymentSettings: {
      autoDistribute: true,
      distributionDelay: 24, // 24 horas después del evento
      holdPeriod: 7 // 7 días de retención
    }
  });

  await payment.save();

  // Procesar pago con gateway (Stripe, PayPal, etc.)
  const transactionResult = await processPayment({
    amount: totalAmount,
    currency,
    paymentMethod,
    customer: req.user._id
  });

  if (transactionResult.success) {
    payment.status = 'processing';
    payment.addTransaction({
      transactionId: transactionResult.transactionId,
      amount: totalAmount,
      currency,
      originalAmount: totalAmount,
      originalCurrency: currency,
      status: 'processing',
      paymentMethod,
      gatewayResponse: transactionResult.response
    });
    await payment.save();
  }

  res.status(201).json({
    success: true,
    data: payment,
    message: 'Pago creado exitosamente'
  });
});

// Obtener pagos del usuario
export const getUserPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ customer: req.user._id })
    .populate('event', 'title date location')
    .populate('providerPayments.provider', 'businessName category')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: payments,
    count: payments.length
  });
});

// Obtener pago por ID
export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
    .populate('event', 'title date location')
    .populate('customer', 'firstName lastName email')
    .populate('providerPayments.provider', 'businessName category contact');

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Pago no encontrado'
    });
  }

  // Verificar permisos
  if (payment.customer._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para ver este pago'
    });
  }

  res.status(200).json({
    success: true,
    data: payment
  });
});

// Procesar pago a proveedores
export const distributePayments = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const { providerId } = req.body;

  const payment = await Payment.findById(paymentId);

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Pago no encontrado'
    });
  }

  if (payment.status !== 'completed') {
    return res.status(400).json({
      success: false,
      message: 'El pago principal debe estar completado antes de distribuir'
    });
  }

  // Si se especifica un proveedor, procesar solo ese
  if (providerId) {
    const providerPayment = payment.providerPayments.find(
      p => p.provider.toString() === providerId
    );

    if (!providerPayment) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado en este pago'
      });
    }

    await processProviderPayment(providerPayment);
  } else {
    // Procesar todos los pagos pendientes
    for (const providerPayment of payment.providerPayments) {
      if (providerPayment.status === 'pending') {
        await processProviderPayment(providerPayment);
      }
    }
  }

  await payment.save();

  res.status(200).json({
    success: true,
    data: payment,
    message: 'Pagos distribuidos exitosamente'
  });
});

// Obtener estadísticas de pagos (para admin)
export const getPaymentStats = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para ver estas estadísticas'
    });
  }

  const stats = await Payment.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
        totalCommission: { $sum: '$platformCommission.amount' },
        totalPaidToProviders: { $sum: '$totalPaidToProviders' },
        totalPayments: { $sum: 1 },
        completedPayments: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        }
      }
    }
  ]);

  const currencyStats = await Payment.aggregate([
    {
      $group: {
        _id: '$currency',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: {
      general: stats[0] || {},
      byCurrency: currencyStats
    }
  });
});

// Procesar reembolso
export const processRefund = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const { amount, currency, reason } = req.body;

  const payment = await Payment.findById(paymentId);

  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Pago no encontrado'
    });
  }

  if (payment.customer.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para procesar reembolsos de este pago'
    });
  }

  await payment.processRefund(amount, currency, reason);

  res.status(200).json({
    success: true,
    data: payment,
    message: 'Reembolso procesado exitosamente'
  });
});

// Función auxiliar para procesar pago con gateway
async function processPayment({ amount, currency, paymentMethod, customer }) {
  // Aquí integrarías con tu gateway de pagos preferido (Stripe, PayPal, etc.)
  // Por ahora simulamos el proceso

  try {
    // Simular procesamiento con gateway
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simular respuesta del gateway
    const gatewayResponse = {
      id: transactionId,
      status: 'succeeded',
      amount: amount,
      currency: currency,
      created: new Date().toISOString()
    };

    return {
      success: true,
      transactionId,
      response: gatewayResponse
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Función auxiliar para procesar pago a proveedor
async function processProviderPayment(providerPayment) {
  try {
    // Simular procesamiento de pago a proveedor
    const transactionId = `provider_txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    providerPayment.status = 'completed';
    providerPayment.transactionId = transactionId;
    providerPayment.processedAt = new Date();

    return true;
  } catch (error) {
    providerPayment.status = 'failed';
    providerPayment.notes = error.message;
    return false;
  }
}
