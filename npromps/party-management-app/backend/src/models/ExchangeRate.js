import mongoose from 'mongoose';

const exchangeRateSchema = new mongoose.Schema({
  fromCurrency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'ARS', 'MXN']
  },
  toCurrency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'ARS', 'MXN']
  },
  rate: {
    type: Number,
    required: true,
    min: 0
  },
  source: {
    type: String,
    enum: ['api', 'manual', 'bank'],
    default: 'api'
  },
  provider: {
    type: String,
    default: 'fixer.io' // o el proveedor de tasas de cambio
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índice único para evitar duplicados
exchangeRateSchema.index({ fromCurrency: 1, toCurrency: 1 }, { unique: true });

// Método estático para obtener tasa de cambio
exchangeRateSchema.statics.getRate = async function (fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return 1;

  const rate = await this.findOne({
    fromCurrency,
    toCurrency,
    isActive: true
  }).sort({ lastUpdated: -1 });

  if (!rate) {
    throw new Error(`Tasa de cambio no encontrada para ${fromCurrency} a ${toCurrency}`);
  }

  return rate.rate;
};

// Método estático para convertir moneda
exchangeRateSchema.statics.convertCurrency = async function (amount, fromCurrency, toCurrency) {
  const rate = await this.getRate(fromCurrency, toCurrency);
  return amount * rate;
};

// Método estático para actualizar todas las tasas
exchangeRateSchema.statics.updateAllRates = async function () {
  // Aquí integrarías con una API de tasas de cambio como Fixer.io, CurrencyLayer, etc.
  const currencies = ['USD', 'EUR', 'ARS', 'MXN'];
  const rates = [];

  for (let from of currencies) {
    for (let to of currencies) {
      if (from !== to) {
        // Simular obtención de tasa (reemplazar con API real)
        const rate = await this.fetchRateFromAPI(from, to);
        rates.push({
          fromCurrency: from,
          toCurrency: to,
          rate: rate,
          source: 'api',
          lastUpdated: new Date()
        });
      }
    }
  }

  // Actualizar o crear tasas
  for (const rateData of rates) {
    await this.findOneAndUpdate(
      { fromCurrency: rateData.fromCurrency, toCurrency: rateData.toCurrency },
      rateData,
      { upsert: true, new: true }
    );
  }
};

// Método simulado para obtener tasa de API (implementar con API real)
exchangeRateSchema.statics.fetchRateFromAPI = async function (from, to) {
  // Ejemplo de tasas simuladas (reemplazar con API real)
  const mockRates = {
    'USD-EUR': 0.85,
    'USD-ARS': 850,
    'USD-MXN': 20,
    'EUR-USD': 1.18,
    'EUR-ARS': 1000,
    'EUR-MXN': 23.5,
    'ARS-USD': 0.0012,
    'ARS-EUR': 0.001,
    'ARS-MXN': 0.024,
    'MXN-USD': 0.05,
    'MXN-EUR': 0.043,
    'MXN-ARS': 42
  };

  return mockRates[`${from}-${to}`] || 1;
};

const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

export default ExchangeRate;
