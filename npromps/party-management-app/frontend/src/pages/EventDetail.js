import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  CakeIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  AcademicCapIcon,
  TrophyIcon,
  MusicalNoteIcon,
  TagIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  ShareIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, loading, error, deleteEvent } = useEvents();
  const [event, setEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundEvent = events.find(e => e._id === eventId);
    setEvent(foundEvent);
  }, [events, eventId]);

  const getEventTypeIcon = (eventType) => {
    const icons = {
      boda: HeartIcon,
      cumpleanos: CakeIcon,
      corporativo: BuildingOfficeIcon,
      social: UserGroupIcon,
      religioso: SparklesIcon,
      deportivo: TrophyIcon,
      cultural: AcademicCapIcon,
      musical: MusicalNoteIcon,
      otro: TagIcon
    };
    return icons[eventType] || TagIcon;
  };

  const getEventTypeColor = (eventType) => {
    const colors = {
      boda: 'text-pink-600 bg-pink-100',
      cumpleanos: 'text-yellow-600 bg-yellow-100',
      corporativo: 'text-blue-600 bg-blue-100',
      social: 'text-green-600 bg-green-100',
      religioso: 'text-purple-600 bg-purple-100',
      deportivo: 'text-orange-600 bg-orange-100',
      cultural: 'text-indigo-600 bg-indigo-100',
      musical: 'text-red-600 bg-red-100',
      otro: 'text-gray-600 bg-gray-100'
    };
    return colors[eventType] || 'text-gray-600 bg-gray-100';
  };

  const getEventTypeLabel = (eventType) => {
    const labels = {
      boda: 'Boda',
      cumpleanos: 'Cumpleaños',
      corporativo: 'Corporativo',
      social: 'Social',
      religioso: 'Religioso',
      deportivo: 'Deportivo',
      cultural: 'Cultural',
      musical: 'Musical',
      otro: 'Otro'
    };
    return labels[eventType] || 'Otro';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(eventId);
      navigate('/events');
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-secondary-600">Cargando evento...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6 text-center">
            <XCircleIcon className="w-12 h-12 text-danger-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-danger-900 mb-2">
              Evento no encontrado
            </h2>
            <p className="text-danger-600 mb-4">
              El evento que buscas no existe o no tienes permisos para verlo.
            </p>
            <Link to="/events" className="btn-primary">
              Volver a mis eventos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = getEventTypeIcon(event.eventType);
  const typeColor = getEventTypeColor(event.eventType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="container-elegant max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/events')}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-xl transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-xl ${typeColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-secondary-500 uppercase tracking-wide">
                  {getEventTypeLabel(event.eventType)}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-secondary-900">{event.title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-xl transition-colors">
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-secondary-400 hover:text-danger-600 hover:bg-danger-50 rounded-xl transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            {event.description && (
              <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">Descripción</h2>
                <p className="text-secondary-600 leading-relaxed">{event.description}</p>
              </div>
            )}

            {/* Detalles del Evento */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Detalles del Evento</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CalendarDaysIcon className="w-5 h-5 text-primary-600" />
                  <div>
                    <span className="text-sm font-medium text-secondary-700">Fecha</span>
                    <p className="text-secondary-900">{formatDate(event.date)}</p>
                  </div>
                </div>

                {(event.startTime || event.endTime) && (
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="text-sm font-medium text-secondary-700">Horario</span>
                      <p className="text-secondary-900">
                        {event.startTime && formatTime(event.startTime)}
                        {event.startTime && event.endTime && ' - '}
                        {event.endTime && formatTime(event.endTime)}
                      </p>
                    </div>
                  </div>
                )}

                {event.location?.venue && (
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="text-sm font-medium text-secondary-700">Ubicación</span>
                      <p className="text-secondary-900">{event.location.venue}</p>
                      {event.location.address && (
                        <p className="text-sm text-secondary-600">{event.location.address}</p>
                      )}
                      {event.location.city && (
                        <p className="text-sm text-secondary-600">
                          {event.location.city}
                          {event.location.state && `, ${event.location.state}`}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {event.guestCount && (
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="text-sm font-medium text-secondary-700">Invitados</span>
                      <p className="text-secondary-900">{event.guestCount} personas</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información Adicional */}
            {(event.budget || event.theme || event.specialRequirements) && (
              <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">Información Adicional</h2>
                <div className="space-y-4">
                  {event.budget && (
                    <div>
                      <span className="text-sm font-medium text-secondary-700">Presupuesto</span>
                      <p className="text-secondary-900">${parseInt(event.budget).toLocaleString()}</p>
                    </div>
                  )}

                  {event.theme && (
                    <div>
                      <span className="text-sm font-medium text-secondary-700">Tema</span>
                      <p className="text-secondary-900">{event.theme}</p>
                    </div>
                  )}

                  {event.specialRequirements && (
                    <div>
                      <span className="text-sm font-medium text-secondary-700">Requisitos Especiales</span>
                      <p className="text-secondary-900">{event.specialRequirements}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Acciones Rápidas */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <PencilIcon className="w-4 h-4" />
                  <span>Editar Evento</span>
                </button>
                <button className="w-full btn-ghost flex items-center justify-center space-x-2">
                  <ShareIcon className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
                <button className="w-full btn-ghost flex items-center justify-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>Agregar Invitado</span>
                </button>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Estado</span>
                  <span className="text-sm font-medium text-green-600">Activo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Creado</span>
                  <span className="text-sm font-medium text-secondary-900">
                    {new Date(event.createdAt).toLocaleDateString('es-ES')}
                  </span>
                </div>
                {event.guestCount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Invitados</span>
                    <span className="text-sm font-medium text-secondary-900">{event.guestCount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Próximos Pasos */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Próximos Pasos</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-primary-800">Evento creado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-primary-300 rounded-full"></div>
                  <span className="text-sm text-primary-700">Agregar invitados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-primary-300 rounded-full"></div>
                  <span className="text-sm text-primary-700">Buscar proveedores</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-primary-300 rounded-full"></div>
                  <span className="text-sm text-primary-700">Crear lista de tareas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Confirmación de Eliminación */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-large max-w-md w-full p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrashIcon className="w-6 h-6 text-danger-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  ¿Eliminar evento?
                </h3>
                <p className="text-secondary-600 mb-6">
                  Esta acción no se puede deshacer. Se eliminará permanentemente "{event.title}".
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 btn-ghost"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteEvent}
                    className="flex-1 bg-danger-600 hover:bg-danger-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
