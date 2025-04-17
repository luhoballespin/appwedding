const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas para la gestión de usuarios
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, authorizeRoles('cumpleañero', 'planeador', 'proveedor'), updateUserProfile);

module.exports = router;