import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate } from '../middleware/validation.js';
import { updateUserSchema } from '../validations/userValidation.js';

// Obtener perfil de usuario
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

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

// Actualizar perfil de usuario
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    // Verificar que el usuario sea el propietario del perfil o admin
    if (user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este perfil'
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
        success: true,
        data: updatedUser.getPublicProfile(),
        message: 'Perfil actualizado exitosamente'
    });
});

// Subir avatar
export const uploadAvatar = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    if (user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para actualizar este avatar'
        });
    }

    // Aquí se implementaría la lógica de subida de archivos
    // Por ahora simulamos la actualización
    const avatarUrl = req.body.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;

    user.avatar = avatarUrl;
    await user.save();

    res.status(200).json({
        success: true,
        data: user.getPublicProfile(),
        message: 'Avatar actualizado exitosamente'
    });
});

// Eliminar cuenta
export const deleteAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
        });
    }

    if (user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para eliminar esta cuenta'
        });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Cuenta eliminada exitosamente'
    });
});

// Obtener estadísticas del usuario
export const getUserStats = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    // Verificar que el usuario sea el propietario o admin
    if (userId !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para ver estas estadísticas'
        });
    }

    // Aquí se implementarían las consultas para obtener estadísticas
    // Por ahora devolvemos datos simulados
    const stats = {
        totalEvents: 0,
        upcomingEvents: 0,
        completedEvents: 0,
        totalProviders: 0,
        accountAge: Math.floor((Date.now() - new Date(req.user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    };

    res.status(200).json({
        success: true,
        data: stats
    });
});