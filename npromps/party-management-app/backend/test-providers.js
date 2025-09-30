import mongoose from 'mongoose';
import Provider from './src/models/Provider.js';

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/wedding-planner');
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Probar consulta de proveedores
const testProviders = async () => {
  try {
    console.log('🔍 Buscando proveedores...');

    const providers = await Provider.find({ isActive: true });
    console.log(`✅ Encontrados ${providers.length} proveedores`);

    providers.forEach((provider, index) => {
      console.log(`${index + 1}. ${provider.businessName} - ${provider.category} - $${provider.pricing.basePrice} ${provider.pricing.currency}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Función principal
const main = async () => {
  await connectDB();
  await testProviders();
  process.exit(0);
};

main();
