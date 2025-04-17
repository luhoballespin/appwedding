const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta protegida de ejemplo
router.get('/profile', authenticate, (req, res) => {
    res.status(200).json({ message: 'Perfil de usuario', user: req.user });
});

module.exports = router;