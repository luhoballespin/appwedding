import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Rutas para la gestión de eventos
router.post('/', authenticate, authorize(['Cumpleañero', 'Planeador de bodas profesional', 'Persona que organiza su propio casamiento']), createEvent);
router.get('/', authenticate, getEvents);
router.put('/:id', authenticate, authorize(['Cumpleañero', 'Planeador de bodas profesional', 'Persona que organiza su propio casamiento']), updateEvent);
router.delete('/:id', authenticate, authorize(['Cumpleañero', 'Planeador de bodas profesional', 'Persona que organiza su propio casamiento']), deleteEvent);

export default router;