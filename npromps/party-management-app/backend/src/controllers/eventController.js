import Event from '../models/Event.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate } from '../middleware/validation.js';
import { createEventSchema, updateEventSchema } from '../validations/eventValidation.js';

// Crear un nuevo evento
export const createEvent = asyncHandler(async (req, res) => {
    console.log('Datos recibidos:', req.body);
    console.log('Usuario:', req.user);

    const eventData = {
        ...req.body,
        organizer: req.user._id
    };

    console.log('Datos del evento:', eventData);

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
        success: true,
        data: event,
        message: 'Evento creado exitosamente'
    });
});

// Obtener eventos del usuario autenticado
export const getUserEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({ organizer: req.user._id })
        .populate('organizer', 'username firstName lastName email')
        .sort({ date: 1 });

    res.status(200).json({
        success: true,
        data: events,
        count: events.length
    });
});

// Obtener todos los eventos (para admin)
export const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()
        .populate('organizer', 'username firstName lastName email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: events,
        count: events.length
    });
});

// Obtener un evento por ID
export const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
        .populate('organizer', 'username firstName lastName email')
        .populate('providers.provider', 'businessName category pricing');

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    // Verificar que el usuario sea el organizador del evento
    if (event.organizer._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para ver este evento'
        });
    }

    res.status(200).json({
        success: true,
        data: event
    });
});

// Actualizar un evento
export const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    // Verificar que el usuario sea el organizador del evento
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    ).populate('organizer', 'username firstName lastName email');

    res.status(200).json({
        success: true,
        data: updatedEvent,
        message: 'Evento actualizado exitosamente'
    });
});

// Eliminar un evento
export const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    // Verificar que el usuario sea el organizador del evento
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para eliminar este evento'
        });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Evento eliminado exitosamente'
    });
});

// Agregar invitado a un evento
export const addGuest = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    await event.addGuest(req.body);

    res.status(200).json({
        success: true,
        data: event,
        message: 'Invitado agregado exitosamente'
    });
});

// Actualizar estado de invitado
export const updateGuestStatus = asyncHandler(async (req, res) => {
    const { eventId, guestId } = req.params;
    const { status } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    await event.updateGuestStatus(guestId, status);

    res.status(200).json({
        success: true,
        data: event,
        message: 'Estado de invitado actualizado'
    });
});

// Agregar tarea al checklist
export const addChecklistItem = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    await event.addChecklistItem(req.body);

    res.status(200).json({
        success: true,
        data: event,
        message: 'Tarea agregada al checklist'
    });
});

// Completar tarea del checklist
export const completeChecklistItem = asyncHandler(async (req, res) => {
    const { eventId, taskId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    await event.completeChecklistItem(taskId);

    res.status(200).json({
        success: true,
        data: event,
        message: 'Tarea completada'
    });
});

// Agregar proveedor al evento
export const addProvider = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    const providerData = {
        provider: req.body.providerId,
        service: req.body.service,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency || 'MXN',
        priority: req.body.priority || 'medium',
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        contactPerson: req.body.contactPerson,
        notes: req.body.notes,
        isEssential: req.body.isEssential || false,
        tags: req.body.tags || []
    };

    await event.addProvider(providerData);

    const updatedEvent = await Event.findById(req.params.id)
        .populate('providers.provider', 'businessName category pricing contact location');

    res.status(200).json({
        success: true,
        data: updatedEvent,
        message: 'Proveedor agregado al evento'
    });
});

// Actualizar estado de proveedor
export const updateProviderStatus = asyncHandler(async (req, res) => {
    const { eventId, providerId } = req.params;
    const { status } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    await event.updateProviderStatus(providerId, status);

    const updatedEvent = await Event.findById(eventId)
        .populate('providers.provider', 'businessName category pricing contact location');

    res.status(200).json({
        success: true,
        data: updatedEvent,
        message: 'Estado del proveedor actualizado'
    });
});

// Actualizar pago de proveedor
export const updateProviderPayment = asyncHandler(async (req, res) => {
    const { eventId, providerId } = req.params;
    const { status, paid, total } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    const paymentData = { status, paid, total };
    await event.updateProviderPayment(providerId, paymentData);

    const updatedEvent = await Event.findById(eventId)
        .populate('providers.provider', 'businessName category pricing contact location');

    res.status(200).json({
        success: true,
        data: updatedEvent,
        message: 'Información de pago actualizada'
    });
});

// Agregar documento a proveedor
export const addProviderDocument = asyncHandler(async (req, res) => {
    const { eventId, providerId } = req.params;
    const { name, url, type } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    const documentData = { name, url, type };
    await event.addProviderDocument(providerId, documentData);

    const updatedEvent = await Event.findById(eventId)
        .populate('providers.provider', 'businessName category pricing contact location');

    res.status(200).json({
        success: true,
        data: updatedEvent,
        message: 'Documento agregado al proveedor'
    });
});

// Remover proveedor del evento
export const removeProvider = asyncHandler(async (req, res) => {
    const { eventId, providerId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para editar este evento'
        });
    }

    await event.removeProvider(providerId);

    const updatedEvent = await Event.findById(eventId)
        .populate('providers.provider', 'businessName category pricing contact location');

    res.status(200).json({
        success: true,
        data: updatedEvent,
        message: 'Proveedor removido del evento'
    });
});

// Obtener proveedores disponibles para un evento
export const getAvailableProviders = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const { category, date, city } = req.query;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Evento no encontrado'
        });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para ver este evento'
        });
    }

    // Construir filtros de búsqueda
    const filters = {
        isActive: true,
        isVerified: true
    };

    if (category) {
        filters.category = category;
    }

    if (city) {
        filters['location.city'] = new RegExp(city, 'i');
    }

    const Provider = (await import('../models/Provider.js')).default;
    let providers = await Provider.find(filters)
        .select('businessName description category pricing location contact images averageRating totalReviews')
        .sort({ averageRating: -1, totalReviews: -1 });

    // Filtrar por disponibilidad en la fecha del evento
    if (date) {
        const eventDate = new Date(date);
        providers = providers.filter(provider =>
            provider.isAvailableOnDate(eventDate)
        );
    }

    res.status(200).json({
        success: true,
        data: providers,
        count: providers.length
    });
});