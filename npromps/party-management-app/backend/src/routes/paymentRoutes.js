import express from 'express';
import {
  createPayment,
  getUserPayments,
  getPaymentById,
  distributePayments,
  getPaymentStats,
  processRefund
} from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Rutas para gestión de pagos
router.post('/events/:eventId',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  createPayment
);

router.get('/',
  authenticate,
  getUserPayments
);

router.get('/:id',
  authenticate,
  getPaymentById
);

router.post('/:paymentId/distribute',
  authenticate,
  authorize('admin'),
  distributePayments
);

router.post('/:paymentId/refund',
  authenticate,
  processRefund
);

// Rutas administrativas
router.get('/admin/stats',
  authenticate,
  authorize('admin'),
  getPaymentStats
);

export default router;
