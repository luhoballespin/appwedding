import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate } from '../middleware/validation.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';

// Registro de usuario
export const register = asyncHandler(async (req, res) => {
    const userData = {
        ...req.body,
        emailVerified: false
    };

    const user = new User(userData);
    await user.save();

    const token = generateToken(user._id);
    const userResponse = user.getPublicProfile();

    res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        token,
        user: userResponse
    });
});

// Inicio de sesión
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Credenciales inválidas'
        });
    }

    // Verificar si la cuenta está bloqueada
    if (user.isLocked) {
        return res.status(423).json({
            success: false,
            message: 'Cuenta temporalmente bloqueada. Intenta más tarde.'
        });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        // Incrementar intentos de login fallidos
        await user.incLoginAttempts();

        return res.status(401).json({
            success: false,
            message: 'Credenciales inválidas'
        });
    }

    // Resetear intentos de login si la contraseña es correcta
    if (user.loginAttempts > 0) {
        await user.resetLoginAttempts();
    }

    // Actualizar último login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    const userResponse = user.getPublicProfile();

    res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        user: userResponse
    });
});

// Obtener perfil del usuario autenticado
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: user.getPublicProfile()
    });
});

// Cerrar sesión (opcional, principalmente para logging)
export const logout = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Sesión cerrada exitosamente'
    });
});

// Verificar token
export const verifyToken = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Token válido',
        user: req.user
    });
});