// Este archivo se mantiene por compatibilidad, pero los servicios
// principales están ahora en api.js

import { eventService as apiEventService } from './api';

// Exportar funciones individuales
export const getUserEvents = apiEventService.getUserEvents;
export const getEventById = apiEventService.getEventById;
export const createEvent = apiEventService.createEvent;
export const updateEvent = apiEventService.updateEvent;
export const deleteEvent = apiEventService.deleteEvent;
export const addGuest = apiEventService.addGuest;
export const updateGuestStatus = apiEventService.updateGuestStatus;
export const addChecklistItem = apiEventService.addChecklistItem;
export const completeChecklistItem = apiEventService.completeChecklistItem;
export const addProvider = apiEventService.addProvider;

// También exportar el servicio completo
export { apiEventService as eventService };

// Exportación por defecto
const eventServiceDefault = {
    getUserEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    addGuest,
    updateGuestStatus,
    addChecklistItem,
    completeChecklistItem,
    addProvider
};

export default eventServiceDefault;
