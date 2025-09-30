import React, { useState, useEffect } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const PaymentModal = ({
  isOpen,
  onClose,
  event,
  selectedProviders,
  onPaymentSuccess
}) => {
  const [paymentData, setPaymentData] = useState({
    currency: 'USD',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [exchangeRates, setExchangeRates] = useState({});

  const currencies = [
    { code: 'USD', name: 'Dólar Americano', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' }
  ];

  const paymentMethods = [
    { value: 'credit_card', label: 'Tarjeta de Crédito', icon: CreditCardIcon },
    { value: 'debit_card', label: 'Tarjeta de Débito', icon: CreditCardIcon },
    { value: 'bank_transfer', label: 'Transferencia Bancaria', icon: BanknotesIcon }
  ];

  useEffect(() => {
    if (isOpen) {
      fetchExchangeRates();
    }
  }, [isOpen]);

  const fetchExchangeRates = async () => {
    try {
      // Simular obtención de tasas de cambio
      const rates = {
        'USD-EUR': 0.85,
        'USD-ARS': 850,
        'USD-MXN': 20,
        'EUR-USD': 1.18,
        'EUR-ARS': 1000,
        'EUR-MXN': 23.5
      };
      setExchangeRates(rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const calculateTotal = () => {
    if (!selectedProviders || selectedProviders.length === 0) return 0;

    let total = 0;
    selectedProviders.forEach(provider => {
      if (provider.status === 'confirmed') {
        let amount = provider.price;

        // Convertir moneda si es necesario
        if (provider.currency !== paymentData.currency) {
          const rateKey = `${provider.currency}-${paymentData.currency}`;
          const rate = exchangeRates[rateKey] || 1;
          amount = amount * rate;
        }

        total += amount;
      }
    });

    return total;
  };

  const calculateCommission = () => {
    const total = calculateTotal();
    const commissionRate = 8.5; // 8.5% comisión
    return total * (commissionRate / 100);
  };

  const calculateProviderTotal = () => {
    const total = calculateTotal();
    const commission = calculateCommission();
    return total - commission;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.cardNumber.trim()) {
      newErrors.cardNumber = 'Número de tarjeta requerido';
    } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }

    if (!paymentData.expiryDate.trim()) {
      newErrors.expiryDate = 'Fecha de vencimiento requerida';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Formato inválido (MM/YY)';
    }

    if (!paymentData.cvv.trim()) {
      newErrors.cvv = 'CVV requerido';
    } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      newErrors.cvv = 'CVV inválido';
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Nombre del titular requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const paymentRequest = {
        eventId: event._id,
        paymentMethod: paymentData.paymentMethod,
        currency: paymentData.currency,
        totalAmount: calculateTotal(),
        providers: selectedProviders.map(provider => ({
          providerId: provider._id,
          service: provider.service,
          amount: provider.price,
          currency: provider.currency
        }))
      };

      const response = await fetch('/api/payments/events/' + event._id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(paymentRequest)
      });

      const result = await response.json();

      if (result.success) {
        onPaymentSuccess(result.data);
        onClose();
      } else {
        throw new Error(result.message || 'Error al procesar el pago');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency) => {
    const currencyInfo = currencies.find(c => c.code === currency);
    return `${currencyInfo?.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Procesar Pago</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-200 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Resumen del pago */}
          <div className="bg-secondary-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-secondary-900 mb-3">Resumen del Pago</h3>

            <div className="space-y-2">
              {selectedProviders.map((provider, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-secondary-600">{provider.businessName} - {provider.service}</span>
                  <span className="font-medium">{formatCurrency(provider.price, provider.currency)}</span>
                </div>
              ))}

              <div className="border-t border-secondary-200 pt-2 mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(calculateTotal(), paymentData.currency)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-secondary-600">Comisión de la plataforma (8.5%)</span>
                  <span className="font-medium text-orange-600">-{formatCurrency(calculateCommission(), paymentData.currency)}</span>
                </div>

                <div className="flex justify-between font-semibold text-lg border-t border-secondary-200 pt-2">
                  <span>Total a Pagar</span>
                  <span className="text-primary-600">{formatCurrency(calculateTotal(), paymentData.currency)}</span>
                </div>

                <div className="flex justify-between text-sm text-secondary-500">
                  <span>Proveedores recibirán</span>
                  <span>{formatCurrency(calculateProviderTotal(), paymentData.currency)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de pago */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de moneda */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Moneda de Pago
              </label>
              <select
                value={paymentData.currency}
                onChange={(e) => setPaymentData(prev => ({ ...prev, currency: e.target.value }))}
                className="input-field"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Método de pago */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Método de Pago
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paymentMethods.map(method => {
                  const IconComponent = method.icon;
                  return (
                    <label
                      key={method.value}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${paymentData.paymentMethod === method.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentData.paymentMethod === method.value}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="sr-only"
                      />
                      <IconComponent className="w-5 h-5 text-primary-600" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Información de tarjeta */}
            {(paymentData.paymentMethod === 'credit_card' || paymentData.paymentMethod === 'debit_card') && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData(prev => ({
                      ...prev,
                      cardNumber: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
                    }))}
                    className={`input-field ${errors.cardNumber ? 'border-danger-500' : ''}`}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.cardNumber && <p className="text-danger-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Fecha de Vencimiento
                    </label>
                    <input
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData(prev => ({
                        ...prev,
                        expiryDate: e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim()
                      }))}
                      className={`input-field ${errors.expiryDate ? 'border-danger-500' : ''}`}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && <p className="text-danger-500 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData(prev => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, '')
                      }))}
                      className={`input-field ${errors.cvv ? 'border-danger-500' : ''}`}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <p className="text-danger-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className={`input-field ${errors.cardholderName ? 'border-danger-500' : ''}`}
                    placeholder="Juan Pérez"
                  />
                  {errors.cardholderName && <p className="text-danger-500 text-sm mt-1">{errors.cardholderName}</p>}
                </div>
              </div>
            )}

            {/* Información de seguridad */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Pago Seguro</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Tu pago está protegido con encriptación SSL. Los fondos se mantienen seguros hasta que el evento se complete.
                  </p>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost flex-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span>Pagar {formatCurrency(calculateTotal(), paymentData.currency)}</span>
                  </>
                )}
              </button>
            </div>

            {errors.submit && (
              <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-danger-600" />
                  <p className="text-danger-700">{errors.submit}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
