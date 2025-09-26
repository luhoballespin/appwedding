import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { eventService } from '../services/eventService';
import { useAuth } from './AuthContext';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar eventos del usuario
  const loadEvents = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setEvents([]);
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      const response = await eventService.getUserEvents();

      if (response.success) {
        setEvents(response.data || []);
        return response.data || [];
      } else {
        throw new Error(response.message || 'Error al cargar eventos');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al cargar eventos';
      setError(message);
      // Solo mostrar toast si no es un error de autenticación
      if (!message.includes('401') && !message.includes('Unauthorized')) {
        toast.error(message);
      }
      return [];
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Crear nuevo evento
  const createEvent = useCallback(async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.createEvent(eventData);

      if (response.success) {
        const newEvent = response.data;
        setEvents(prev => [newEvent, ...prev]);
        toast.success('Evento creado exitosamente');
        return { success: true, event: newEvent };
      } else {
        throw new Error(response.message || 'Error al crear evento');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al crear evento';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar evento
  const updateEvent = useCallback(async (eventId, eventData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.updateEvent(eventId, eventData);

      if (response.success) {
        const updatedEvent = response.data;
        setEvents(prev => prev.map(event =>
          event._id === eventId ? updatedEvent : event
        ));

        if (currentEvent && currentEvent._id === eventId) {
          setCurrentEvent(updatedEvent);
        }

        toast.success('Evento actualizado exitosamente');
        return { success: true, event: updatedEvent };
      } else {
        throw new Error(response.message || 'Error al actualizar evento');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al actualizar evento';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [currentEvent]);

  // Eliminar evento
  const deleteEvent = useCallback(async (eventId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.deleteEvent(eventId);

      if (response.success) {
        setEvents(prev => prev.filter(event => event._id !== eventId));

        if (currentEvent && currentEvent._id === eventId) {
          setCurrentEvent(null);
        }

        toast.success('Evento eliminado exitosamente');
        return { success: true };
      } else {
        throw new Error(response.message || 'Error al eliminar evento');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al eliminar evento';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [currentEvent]);

  // Obtener evento por ID
  const getEventById = useCallback(async (eventId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.getEventById(eventId);

      if (response.success) {
        const event = response.data;
        setCurrentEvent(event);
        return { success: true, event };
      } else {
        throw new Error(response.message || 'Evento no encontrado');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al cargar evento';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar invitado
  const addGuest = useCallback(async (eventId, guestData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.addGuest(eventId, guestData);

      if (response.success) {
        const updatedEvent = response.data;
        setEvents(prev => prev.map(event =>
          event._id === eventId ? updatedEvent : event
        ));

        if (currentEvent && currentEvent._id === eventId) {
          setCurrentEvent(updatedEvent);
        }

        toast.success('Invitado agregado exitosamente');
        return { success: true, event: updatedEvent };
      } else {
        throw new Error(response.message || 'Error al agregar invitado');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al agregar invitado';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [currentEvent]);

  // Actualizar estado de invitado
  const updateGuestStatus = useCallback(async (eventId, guestId, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.updateGuestStatus(eventId, guestId, status);

      if (response.success) {
        const updatedEvent = response.data;
        setEvents(prev => prev.map(event =>
          event._id === eventId ? updatedEvent : event
        ));

        if (currentEvent && currentEvent._id === eventId) {
          setCurrentEvent(updatedEvent);
        }

        toast.success('Estado de invitado actualizado');
        return { success: true, event: updatedEvent };
      } else {
        throw new Error(response.message || 'Error al actualizar invitado');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al actualizar invitado';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [currentEvent]);

  // Agregar tarea al checklist
  const addChecklistItem = useCallback(async (eventId, taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.addChecklistItem(eventId, taskData);

      if (response.success) {
        const updatedEvent = response.data;
        setEvents(prev => prev.map(event =>
          event._id === eventId ? updatedEvent : event
        ));

        if (currentEvent && currentEvent._id === eventId) {
          setCurrentEvent(updatedEvent);
        }

        toast.success('Tarea agregada al checklist');
        return { success: true, event: updatedEvent };
      } else {
        throw new Error(response.message || 'Error al agregar tarea');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al agregar tarea';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [currentEvent]);

  // Completar tarea del checklist
  const completeChecklistItem = useCallback(async (eventId, taskId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.completeChecklistItem(eventId, taskId);

      if (response.success) {
        const updatedEvent = response.data;
        setEvents(prev => prev.map(event =>
          event._id === eventId ? updatedEvent : event
        ));

        if (currentEvent && currentEvent._id === eventId) {
          setCurrentEvent(updatedEvent);
        }

        toast.success('¡Tarea completada!');
        return { success: true, event: updatedEvent };
      } else {
        throw new Error(response.message || 'Error al completar tarea');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al completar tarea';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [currentEvent]);

  // Agregar proveedor al evento
  const addProvider = useCallback(async (eventId, providerData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.addProvider(eventId, providerData);

      if (response.success) {
        const updatedEvent = response.data;
        setEvents(prev => prev.map(event =>
          event._id === eventId ? updatedEvent : event
        ));

        if (currentEvent && currentEvent._id === eventId) {
          setCurrentEvent(updatedEvent);
        }

        toast.success('Proveedor agregado al evento');
        return { success: true, event: updatedEvent };
      } else {
        throw new Error(response.message || 'Error al agregar proveedor');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error al agregar proveedor';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [currentEvent]);

  // Cargar eventos al montar el componente
  useEffect(() => {
    if (isAuthenticated && user) {
      loadEvents();
    } else {
      setEvents([]);
      setError(null);
    }
  }, [isAuthenticated, user]);

  // Filtrar eventos por estado
  const getEventsByStatus = useCallback((status) => {
    return events.filter(event => event.status === status);
  }, [events]);

  // Filtrar eventos por tipo
  const getEventsByType = useCallback((type) => {
    return events.filter(event => event.eventType === type);
  }, [events]);

  // Obtener eventos próximos (próximos 30 días)
  const getUpcomingEvents = useCallback(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= now && eventDate <= thirtyDaysFromNow;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  // Obtener eventos pasados
  const getPastEvents = useCallback(() => {
    const now = new Date();
    return events.filter(event => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [events]);

  // Estadísticas de eventos
  const getEventStats = useCallback(() => {
    const total = events.length;
    const upcoming = getUpcomingEvents().length;
    const past = getPastEvents().length;
    const planning = getEventsByStatus('planning').length;
    const confirmed = getEventsByStatus('confirmed').length;

    return {
      total,
      upcoming,
      past,
      planning,
      confirmed
    };
  }, [events, getUpcomingEvents, getPastEvents, getEventsByStatus]);

  const value = {
    events,
    currentEvent,
    loading,
    error,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    addGuest,
    updateGuestStatus,
    addChecklistItem,
    completeChecklistItem,
    addProvider,
    getEventsByStatus,
    getEventsByType,
    getUpcomingEvents,
    getPastEvents,
    getEventStats,
    setCurrentEvent,
    clearError: () => setError(null)
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents debe ser usado dentro de un EventProvider');
  }
  return context;
};
