import express from 'express';
import {
  createEvent,
  getUserEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addGuest,
  updateGuestStatus,
  addChecklistItem,
  completeChecklistItem,
  addProvider,
  updateProviderStatus,
  updateProviderPayment,
  addProviderDocument,
  removeProvider,
  getAvailableProviders
} from '../controllers/eventController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validation.js';
import { createEventSchema, updateEventSchema } from '../validations/eventValidation.js';

const router = express.Router();

// Rutas para la gestión de eventos
router.post('/',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  validate(createEventSchema),
  createEvent
);

router.get('/', authenticate, getUserEvents);
router.get('/all', authenticate, authorize('admin'), getAllEvents);
router.get('/:id', authenticate, getEventById);

router.put('/:id',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  validate(updateEventSchema),
  updateEvent
);

router.delete('/:id',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  deleteEvent
);

// Rutas para gestión de invitados
router.post('/:id/guests',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  addGuest
);

router.put('/:eventId/guests/:guestId',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  updateGuestStatus
);

// Rutas para checklist
router.post('/:id/checklist',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  addChecklistItem
);

router.put('/:eventId/checklist/:taskId/complete',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  completeChecklistItem
);

// Rutas para proveedores
router.post('/:id/providers',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  addProvider
);

router.get('/:id/providers/available',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  getAvailableProviders
);

router.put('/:eventId/providers/:providerId/status',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  updateProviderStatus
);

router.put('/:eventId/providers/:providerId/payment',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  updateProviderPayment
);

router.post('/:eventId/providers/:providerId/documents',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  addProviderDocument
);

router.delete('/:eventId/providers/:providerId',
  authenticate,
  authorize('cumpleañero', 'planeador_bodas', 'organizador'),
  removeProvider
);

export default router;