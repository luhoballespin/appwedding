import mongoose from 'mongoose';
import Provider from '../src/models/Provider.js';
import { config } from '../src/config/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Importar proveedores
const importProviders = async () => {
  try {
    // Leer archivo JSON
    const providersPath = path.join(__dirname, '../sample-providers.json');
    const providersData = JSON.parse(fs.readFileSync(providersPath, 'utf8'));

    console.log(`📄 Leyendo ${providersData.length} proveedores del archivo...`);

    // Limpiar proveedores existentes (opcional)
    await Provider.deleteMany({});
    console.log('🗑️ Proveedores existentes eliminados');

    // Insertar nuevos proveedores
    const insertedProviders = await Provider.insertMany(providersData);
    console.log(`✅ ${insertedProviders.length} proveedores importados exitosamente`);

    // Mostrar resumen
    console.log('\n📊 Resumen de proveedores importados:');
    insertedProviders.forEach((provider, index) => {
      console.log(`${index + 1}. ${provider.businessName} - ${provider.category} - $${provider.pricing.basePrice} ${provider.pricing.currency}`);
    });

  } catch (error) {
    console.error('❌ Error importando proveedores:', error);
  }
};

// Función principal
const main = async () => {
  console.log('🚀 Iniciando importación de proveedores...\n');

  await connectDB();
  await importProviders();

  console.log('\n🎉 Importación completada exitosamente!');
  process.exit(0);
};

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
