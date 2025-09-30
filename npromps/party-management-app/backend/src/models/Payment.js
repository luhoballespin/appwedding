import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'digital_wallet', 'crypto'],
    required: true
  },
  provider: {
    type: String,
    enum: ['stripe', 'paypal', 'mercadopago', 'payu', 'other'],
    required: true
  },
  last4: String,
  brand: String,
  expiryMonth: Number,
  expiryYear: Number,
  isDefault: {
    type: Boolean,
    default: false
  }
});

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'ARS', 'MXN']
  },
  exchangeRate: {
    type: Number,
    default: 1
  },
  originalAmount: {
    type: Number,
    required: true
  },
  originalCurrency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentMethod: paymentMethodSchema,
  gatewayResponse: {
    type: mongoose.Schema.Types.Mixed
  },
  processedAt: Date,
  failedAt: Date,
  failureReason: String
});

const paymentSchema = new mongoose.Schema({
  // Información del pago principal
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Montos y comisiones
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'ARS', 'MXN']
  },

  // Comisiones de la plataforma
  platformCommission: {
    percentage: {
      type: Number,
      default: 8.5, // 8.5% comisión por defecto
      min: 0,
      max: 50
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    }
  },

  // Distribución a proveedores
  providerPayments: [{
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true
    },
    service: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'ARS', 'MXN']
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
      default: 'pending'
    },
    transactionId: String,
    processedAt: Date,
    notes: String
  }],

  // Estado general del pago
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'partially_completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },

  // Transacciones
  transactions: [transactionSchema],

  // Información de reembolsos
  refunds: [{
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending'
    },
    processedAt: Date,
    transactionId: String
  }],

  // Metadatos
  description: String,
  notes: String,
  tags: [String],

  // Fechas importantes
  dueDate: Date,
  completedAt: Date,
  cancelledAt: Date,

  // Configuración de pagos
  paymentSettings: {
    autoDistribute: {
      type: Boolean,
      default: true
    },
    distributionDelay: {
      type: Number,
      default: 24 // horas después del evento
    },
    holdPeriod: {
      type: Number,
      default: 7 // días de retención
    }
  }
}, {
  timestamps: true
});

// Índices para optimización
paymentSchema.index({ event: 1 });
paymentSchema.index({ customer: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ 'providerPayments.provider': 1 });
paymentSchema.index({ createdAt: -1 });

// Virtual para calcular total pagado a proveedores
paymentSchema.virtual('totalPaidToProviders').get(function () {
  return this.providerPayments
    .filter(payment => payment.status === 'completed')
    .reduce((total, payment) => total + payment.amount, 0);
});

// Virtual para calcular total pendiente
paymentSchema.virtual('totalPending').get(function () {
  return this.providerPayments
    .filter(payment => payment.status === 'pending')
    .reduce((total, payment) => total + payment.amount, 0);
});

// Método para agregar transacción
paymentSchema.methods.addTransaction = function (transactionData) {
  this.transactions.push(transactionData);
  return this.save();
};

// Método para actualizar estado de pago a proveedor
paymentSchema.methods.updateProviderPaymentStatus = function (providerId, status, transactionId = null) {
  const providerPayment = this.providerPayments.find(p => p.provider.toString() === providerId.toString());
  if (providerPayment) {
    providerPayment.status = status;
    if (transactionId) providerPayment.transactionId = transactionId;
    if (status === 'completed') providerPayment.processedAt = new Date();
    return this.save();
  }
  throw new Error('Pago de proveedor no encontrado');
};

// Método para procesar reembolso
paymentSchema.methods.processRefund = function (amount, currency, reason) {
  this.refunds.push({
    amount,
    currency,
    reason,
    status: 'pending'
  });
  return this.save();
};

// Middleware para calcular comisiones automáticamente
paymentSchema.pre('save', function (next) {
  if (this.isModified('totalAmount') || this.isModified('platformCommission.percentage')) {
    this.platformCommission.amount = this.totalAmount * (this.platformCommission.percentage / 100);
  }
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
