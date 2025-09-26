import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/wedding-planner',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 5242880, // 5MB
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15, // minutos
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100 // requests por ventana
};

export default config;
