import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  deleteAccount,
  getUserStats
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validation.js';
import { updateUserSchema } from '../validations/userValidation.js';

const router = express.Router();

// Rutas para la gestión de usuarios
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, validate(updateUserSchema), updateUserProfile);
router.post('/avatar', authenticate, uploadAvatar);
router.delete('/account', authenticate, deleteAccount);
router.get('/stats', authenticate, getUserStats);

// Rutas específicas por ID (para admin)
router.get('/:id', authenticate, getUserProfile);
router.put('/:id', authenticate, validate(updateUserSchema), updateUserProfile);
router.post('/:id/avatar', authenticate, uploadAvatar);
router.delete('/:id', authenticate, deleteAccount);
router.get('/:id/stats', authenticate, getUserStats);

export default router;