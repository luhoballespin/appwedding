import Provider from '../models/Provider.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate } from '../middleware/validation.js';
import { createProviderSchema, updateProviderSchema } from '../validations/providerValidation.js';

// Crear un nuevo proveedor
export const createProvider = asyncHandler(async (req, res) => {
    const providerData = {
        ...req.body,
        owner: req.user._id
    };

    const provider = new Provider(providerData);
    await provider.save();

    res.status(201).json({
        success: true,
        data: provider,
        message: 'Proveedor creado exitosamente'
    });
});

// Obtener todos los proveedores
export const getProviders = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        category,
        location,
        minPrice,
        maxPrice,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = req.query;

    // Construir filtros
    const filters = {};

    if (category) {
        filters.category = category;
    }

    if (location) {
        filters.$or = [
            { 'location.city': new RegExp(location, 'i') },
            { 'location.state': new RegExp(location, 'i') }
        ];
    }

    if (minPrice || maxPrice) {
        filters['pricing.basePrice'] = {};
        if (minPrice) filters['pricing.basePrice'].$gte = Number(minPrice);
        if (maxPrice) filters['pricing.basePrice'].$lte = Number(maxPrice);
    }

    if (search) {
        filters.$or = [
            { businessName: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { 'services.name': new RegExp(search, 'i') }
        ];
    }

    // Construir opciones de ordenamiento
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Ejecutar consulta con paginación
    const skip = (Number(page) - 1) * Number(limit);

    const providers = await Provider.find(filters)
        .populate('owner', 'username firstName lastName email')
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));

    const total = await Provider.countDocuments(filters);

    res.status(200).json({
        success: true,
        data: providers,
        pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            totalProviders: total,
            hasNext: skip + providers.length < total,
            hasPrev: Number(page) > 1
        }
    });
});

// Obtener un proveedor por ID
export const getProviderById = asyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.params.id)
        .populate('owner', 'username firstName lastName email')
        .populate('reviews.user', 'username firstName lastName');

    if (!provider) {
        return res.status(404).json({
            success: false,
            message: 'Proveedor no encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: provider
    });
});

// Actualizar un proveedor
export const updateProvider = asyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
        return res.status(404).json({
            success: false,
            message: 'Proveedor no encontrado'
        });
    }

    // Verificar que el usuario sea el propietario del proveedor
    if (provider.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este proveedor'
        });
    }

    const updatedProvider = await Provider.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    ).populate('owner', 'username firstName lastName email');

    res.status(200).json({
        success: true,
        data: updatedProvider,
        message: 'Proveedor actualizado exitosamente'
    });
});

// Eliminar un proveedor
export const deleteProvider = asyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
        return res.status(404).json({
            success: false,
            message: 'Proveedor no encontrado'
        });
    }

    // Verificar que el usuario sea el propietario del proveedor
    if (provider.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para eliminar este proveedor'
        });
    }

    await Provider.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Proveedor eliminado exitosamente'
    });
});

// Buscar proveedores
export const searchProviders = asyncHandler(async (req, res) => {
    const { q, category, location } = req.query;

    const filters = {};

    if (q) {
        filters.$or = [
            { businessName: new RegExp(q, 'i') },
            { description: new RegExp(q, 'i') },
            { 'services.name': new RegExp(q, 'i') }
        ];
    }

    if (category) {
        filters.category = category;
    }

    if (location) {
        filters.$or = [
            { 'location.city': new RegExp(location, 'i') },
            { 'location.state': new RegExp(location, 'i') }
        ];
    }

    const providers = await Provider.find(filters)
        .populate('owner', 'username firstName lastName email')
        .limit(20);

    res.status(200).json({
        success: true,
        data: providers,
        count: providers.length
    });
});

// Obtener solicitudes de un proveedor
export const getProviderRequests = asyncHandler(async (req, res) => {
    // Esta función necesitaría implementarse según el modelo de solicitudes
    res.status(200).json({
        success: true,
        data: [],
        message: 'Funcionalidad en desarrollo'
    });
});

// Actualizar estado de solicitud
export const updateRequestStatus = asyncHandler(async (req, res) => {
    // Esta función necesitaría implementarse según el modelo de solicitudes
    res.status(200).json({
        success: true,
        message: 'Funcionalidad en desarrollo'
    });
});