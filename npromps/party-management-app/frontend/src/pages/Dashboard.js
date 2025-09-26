import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import {
  CalendarDaysIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  ChartBarIcon,
  BellIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { format, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';

const Dashboard = () => {
  const { user, isOrganizer } = useAuth();
  const {
    events
  } = useEvents();

  const [activeTab, setActiveTab] = useState('overview');

  // Calcular estadísticas
  const stats = {
    total: events.length,
    upcoming: events.filter(event => new Date(event.date) >= new Date()).length,
    planning: events.filter(event => event.status === 'planning').length,
    confirmed: events.filter(event => event.status === 'confirmed').length
  };

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const planningEvents = events.filter(event => event.status === 'planning');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getUpcomingEventDate = (date) => {
    if (isToday(new Date(date))) return 'Hoy';
    if (isTomorrow(new Date(date))) return 'Mañana';
    return format(new Date(date), 'dd MMM', { locale: es });
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'planning': return 'bg-warning-100 text-warning-800';
      case 'confirmed': return 'bg-success-100 text-success-800';
      case 'in_progress': return 'bg-primary-100 text-primary-800';
      case 'completed': return 'bg-secondary-100 text-secondary-800';
      default: return 'bg-secondary-100 text-secondary-800';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'boda': return <HeartIcon className="w-5 h-5 text-primary-600" />;
      case 'cumpleanos': return <UserGroupIcon className="w-5 h-5 text-accent-600" />;
      case 'corporativo': return <ChartBarIcon className="w-5 h-5 text-secondary-600" />;
      default: return <CalendarDaysIcon className="w-5 h-5 text-secondary-600" />;
    }
  };

  if (!isOrganizer()) {
    return (
      <div className="container-elegant py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Acceso Restringido
          </h1>
          <p className="text-secondary-600 mb-8">
            Esta sección es solo para organizadores de eventos.
          </p>
          <Link to="/" className="btn-primary">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-elegant py-8">
        {/* Header del Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-secondary-900 mb-2">
                {getGreeting()}, {user?.firstName || user?.username}! 👋
              </h1>
              <p className="text-lg text-secondary-600">
                Aquí tienes un resumen de tus eventos y actividades
              </p>
            </div>

            <Link to="/events/create" className="btn-primary btn-lg">
              <PlusIcon className="w-5 h-5 mr-2" />
              Nuevo Evento
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid-4 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Total Eventos</p>
                  <p className="text-3xl font-bold text-secondary-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-primary-100 rounded-xl">
                  <CalendarDaysIcon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Próximos</p>
                  <p className="text-3xl font-bold text-secondary-900">{stats.upcoming}</p>
                </div>
                <div className="p-3 bg-accent-100 rounded-xl">
                  <ClockIcon className="w-6 h-6 text-accent-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">En Planificación</p>
                  <p className="text-3xl font-bold text-secondary-900">{stats.planning}</p>
                </div>
                <div className="p-3 bg-warning-100 rounded-xl">
                  <BellIcon className="w-6 h-6 text-warning-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Confirmados</p>
                  <p className="text-3xl font-bold text-secondary-900">{stats.confirmed}</p>
                </div>
                <div className="p-3 bg-success-100 rounded-xl">
                  <CheckCircleIcon className="w-6 h-6 text-success-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Navegación */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-secondary-200">
            {[
              { id: 'overview', label: 'Resumen', icon: ChartBarIcon },
              { id: 'upcoming', label: 'Próximos Eventos', icon: CalendarDaysIcon },
              { id: 'planning', label: 'En Planificación', icon: ClockIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido de las Tabs */}
        <div className="grid-2 gap-8">
          {/* Panel Principal */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Próximos Eventos - Vista Rápida */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      Próximos Eventos
                    </h3>
                  </div>
                  <div className="card-body">
                    {upcomingEvents.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingEvents.slice(0, 3).map(event => (
                          <div key={event._id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-xl">
                            <div className="flex-shrink-0">
                              {getEventTypeIcon(event.eventType)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-secondary-900 truncate">
                                {event.title}
                              </p>
                              <p className="text-sm text-secondary-500">
                                {format(new Date(event.date), 'dd MMMM yyyy', { locale: es })}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <span className={`badge ${getEventStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarDaysIcon className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                        <p className="text-secondary-500 mb-4">No tienes eventos próximos</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link to="/events/create" className="btn-outline btn-sm">
                            Crear tu primer evento
                          </Link>
                          <Link to="/events" className="btn-ghost btn-sm">
                            Ver todos los eventos
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      Acciones Rápidas
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/events/create" className="btn-outline p-4 text-center hover:bg-primary-50">
                        <PlusIcon className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                        <span className="text-sm font-medium">Nuevo Evento</span>
                      </Link>
                      <Link to="/providers" className="btn-outline p-4 text-center hover:bg-accent-50">
                        <UserGroupIcon className="w-6 h-6 mx-auto mb-2 text-accent-600" />
                        <span className="text-sm font-medium">Buscar Proveedores</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'upcoming' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Todos los Próximos Eventos
                  </h3>
                </div>
                <div className="card-body">
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div key={event._id} className="p-4 border border-secondary-200 rounded-xl hover:shadow-soft transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                {getEventTypeIcon(event.eventType)}
                              </div>
                              <div>
                                <h4 className="font-medium text-secondary-900">{event.title}</h4>
                                <p className="text-sm text-secondary-500">
                                  {getUpcomingEventDate(event.date)} • {event.location?.city}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`badge ${getEventStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                              <Link
                                to={`/events/${event._id}`}
                                className="btn-ghost btn-sm"
                              >
                                Ver Detalles
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CalendarDaysIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-secondary-900 mb-2">
                        No hay eventos próximos
                      </h3>
                      <p className="text-secondary-500 mb-6">
                        Crea tu primer evento para comenzar a planificar
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link to="/events/create" className="btn-primary">
                          Crear Evento
                        </Link>
                        <Link to="/events" className="btn-ghost">
                          Ver todos los eventos
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'planning' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Eventos en Planificación
                  </h3>
                </div>
                <div className="card-body">
                  {planningEvents.length > 0 ? (
                    <div className="space-y-4">
                      {planningEvents.map(event => (
                        <div key={event._id} className="p-4 border border-secondary-200 rounded-xl hover:shadow-soft transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                {getEventTypeIcon(event.eventType)}
                              </div>
                              <div>
                                <h4 className="font-medium text-secondary-900">{event.title}</h4>
                                <p className="text-sm text-secondary-500">
                                  {format(new Date(event.date), 'dd MMMM yyyy', { locale: es })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="badge bg-warning-100 text-warning-800">
                                Planificación
                              </span>
                              <Link
                                to={`/events/${event._id}`}
                                className="btn-primary btn-sm"
                              >
                                Ver Detalles
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ClockIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-secondary-900 mb-2">
                        No hay eventos en planificación
                      </h3>
                      <p className="text-secondary-500 mb-6">
                        Todos tus eventos están organizados
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Recordatorios */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-secondary-900">
                  Recordatorios
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 2).map(event => {
                    const daysUntil = Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={event._id} className="p-3 bg-primary-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-secondary-900">
                              {event.title}
                            </p>
                            <p className="text-xs text-secondary-500">
                              {daysUntil === 0 ? '¡Es hoy!' :
                                daysUntil === 1 ? 'Mañana' :
                                  `En ${daysUntil} días`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Estadísticas Rápidas */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-secondary-900">
                  Estadísticas
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Eventos este mes</span>
                    <span className="font-semibold text-secondary-900">
                      {events.filter(e => {
                        const eventDate = new Date(e.date);
                        const now = new Date();
                        return eventDate.getMonth() === now.getMonth() &&
                          eventDate.getFullYear() === now.getFullYear();
                      }).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Invitados totales</span>
                    <span className="font-semibold text-secondary-900">
                      {events.reduce((total, event) => total + (event.guestCount?.expected || 0), 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Proveedores contactados</span>
                    <span className="font-semibold text-secondary-900">
                      {events.reduce((total, event) => total + (event.providers?.length || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
