import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

import { config } from './config/index.js';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import providerRoutes from './routes/providerRoutes.js';

const app = express();

// Conectar a MongoDB
connectDB();

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Wedding Planner API',
            version: '1.0.0',
            description: 'API profesional para gestión de eventos y bodas',
            contact: {
                name: 'Wedding Planner Team',
                email: 'support@weddingplanner.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
                description: 'Servidor de desarrollo'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware de seguridad
app.use(helmet());

// CORS
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

// Rate limiting - Configuración más permisiva para desarrollo
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 1000, // 1000 requests por minuto (muy permisivo)
    message: {
        success: false,
        message: 'Demasiadas solicitudes. Intenta más tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.use(limiter);

// Logging
if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Wedding Planner API Documentation'
}));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Wedding Planner API está funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV
    });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/providers', providerRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '¡Bienvenido a Wedding Planner API! 🎉',
        version: '1.0.0',
        documentation: '/api-docs',
        health: '/health'
    });
});

// Manejo de rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`
  🎉 Wedding Planner API está ejecutándose!
  
  📍 Servidor: http://localhost:${PORT}
  📚 Documentación: http://localhost:${PORT}/api-docs
  🏥 Health Check: http://localhost:${PORT}/health
  🌍 Entorno: ${config.NODE_ENV}
  
  ¡Listo para planificar bodas perfectas! 💒✨
  `);
});

export default app;