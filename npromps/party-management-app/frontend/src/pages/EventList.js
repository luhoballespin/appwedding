import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  HeartIcon,
  CakeIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  AcademicCapIcon,
  TrophyIcon,
  MusicalNoteIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const EventList = () => {
  const { events, loading, error, deleteEvent } = useEvents();
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // Los eventos se cargan automáticamente desde el contexto
  }, []);

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
      day: 'numeric'
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

  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true;
    return event.eventType === filterType;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date) - new Date(b.date);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'type':
        return a.eventType.localeCompare(b.eventType);
      default:
        return 0;
    }
  });

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      await deleteEvent(eventId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-secondary-600">Cargando eventos...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6 text-center">
            <p className="text-danger-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="container-elegant">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Mis Eventos</h1>
              <p className="text-secondary-600 mt-2">Gestiona todos tus eventos en un solo lugar</p>
            </div>
            <Link
              to="/events/create"
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Nuevo Evento</span>
            </Link>
          </div>
        </div>

        {/* Filtros y Ordenamiento */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Filtrar por tipo
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-field"
              >
                <option value="all">Todos los tipos</option>
                <option value="boda">Boda</option>
                <option value="cumpleanos">Cumpleaños</option>
                <option value="corporativo">Corporativo</option>
                <option value="social">Social</option>
                <option value="religioso">Religioso</option>
                <option value="deportivo">Deportivo</option>
                <option value="cultural">Cultural</option>
                <option value="musical">Musical</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="date">Fecha</option>
                <option value="title">Título</option>
                <option value="type">Tipo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Eventos */}
        {sortedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-12 text-center">
            <CalendarDaysIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No tienes eventos aún
            </h3>
            <p className="text-secondary-600 mb-6">
              Crea tu primer evento y comienza a organizar tu celebración perfecta
            </p>
            <Link
              to="/events/create"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Crear mi primer evento</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => {
              const IconComponent = getEventTypeIcon(event.eventType);
              const typeColor = getEventTypeColor(event.eventType);

              return (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl shadow-soft border border-secondary-100 overflow-hidden hover:shadow-large transition-all duration-200 group"
                >
                  {/* Header del evento */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${typeColor}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-medium text-secondary-500 uppercase tracking-wide">
                            {getEventTypeLabel(event.eventType)}
                          </span>
                          <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-secondary-600 text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>
                    )}

                    {/* Información del evento */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-secondary-600">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>

                      {(event.startTime || event.endTime) && (
                        <div className="flex items-center space-x-2 text-sm text-secondary-600">
                          <ClockIcon className="w-4 h-4" />
                          <span>
                            {event.startTime && formatTime(event.startTime)}
                            {event.startTime && event.endTime && ' - '}
                            {event.endTime && formatTime(event.endTime)}
                          </span>
                        </div>
                      )}

                      {event.location?.venue && (
                        <div className="flex items-center space-x-2 text-sm text-secondary-600">
                          <MapPinIcon className="w-4 h-4" />
                          <span className="truncate">{event.location.venue}</span>
                        </div>
                      )}

                      {event.guestCount && (
                        <div className="flex items-center space-x-2 text-sm text-secondary-600">
                          <UserGroupIcon className="w-4 h-4" />
                          <span>{event.guestCount} invitados</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/events/${event._id}`}
                          className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                          title="Ver detalles"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-xl transition-colors"
                          title="Editar evento"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="p-2 text-secondary-400 hover:text-danger-600 hover:bg-danger-50 rounded-xl transition-colors"
                          title="Eliminar evento"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <Link
                        to={`/events/${event._id}`}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        Ver detalles →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Estadísticas */}
        {sortedEvents.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Resumen</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{sortedEvents.length}</div>
                <div className="text-sm text-secondary-600">Total de eventos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {sortedEvents.filter(event => new Date(event.date) >= new Date()).length}
                </div>
                <div className="text-sm text-secondary-600">Próximos eventos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {new Set(sortedEvents.map(event => event.eventType)).size}
                </div>
                <div className="text-sm text-secondary-600">Tipos diferentes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
