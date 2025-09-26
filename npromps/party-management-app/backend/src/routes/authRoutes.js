import express from 'express';
import {
    register,
    login,
    getProfile,
    logout,
    verifyToken
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validation.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';

const router = express.Router();

// Rutas públicas
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Rutas protegidas
router.get('/profile', authenticate, getProfile);
router.post('/logout', authenticate, logout);
router.get('/verify', authenticate, verifyToken);

export default router;