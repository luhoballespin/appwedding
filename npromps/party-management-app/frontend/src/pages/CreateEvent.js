import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TagIcon
} from '@heroicons/react/24/outline';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { createEvent, loading } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    startTime: '',
    endTime: '',
    location: {
      venue: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: {
        latitude: '',
        longitude: ''
      }
    },
    guestCount: '',
    budget: '',
    theme: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState({});

  const eventTypes = [
    { value: 'boda', label: 'Boda', icon: HeartIcon, color: 'text-pink-600' },
    { value: 'cumpleanos', label: 'Cumpleaños', icon: CakeIcon, color: 'text-yellow-600' },
    { value: 'corporativo', label: 'Evento Corporativo', icon: BuildingOfficeIcon, color: 'text-blue-600' },
    { value: 'social', label: 'Evento Social', icon: UserGroupIcon, color: 'text-green-600' },
    { value: 'religioso', label: 'Evento Religioso', icon: SparklesIcon, color: 'text-purple-600' },
    { value: 'deportivo', label: 'Evento Deportivo', icon: TrophyIcon, color: 'text-orange-600' },
    { value: 'cultural', label: 'Evento Cultural', icon: AcademicCapIcon, color: 'text-indigo-600' },
    { value: 'musical', label: 'Evento Musical', icon: MusicalNoteIcon, color: 'text-red-600' },
    { value: 'otro', label: 'Otro', icon: TagIcon, color: 'text-gray-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'El tipo de evento es requerido';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'La fecha debe ser en el futuro';
      }
    }

    if (!formData.location.venue.trim()) {
      newErrors.venue = 'El lugar es requerido';
    }

    if (!formData.location.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!formData.location.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }

    if (!formData.location.state.trim()) {
      newErrors.state = 'El estado es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Datos del formulario:', formData);

    try {
      const result = await createEvent(formData);
      console.log('Resultado de createEvent:', result);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="container-elegant max-w-4xl">
        <div className="bg-white rounded-3xl shadow-soft border border-secondary-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Crear Nuevo Evento</h1>
                <p className="text-primary-100">Organiza tu evento perfecto paso a paso</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Información Básica */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <TagIcon className="w-5 h-5 text-primary-600" />
                <span>Información Básica</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Título del Evento *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`input-field ${errors.title ? 'border-danger-500' : ''}`}
                    placeholder="Ej: Boda de María y Juan"
                  />
                  {errors.title && <p className="text-danger-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Número de Invitados
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ej: 150"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="input-field"
                  placeholder="Describe tu evento, qué esperas, qué te gustaría..."
                />
              </div>
            </div>

            {/* Tipo de Evento */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <HeartIcon className="w-5 h-5 text-primary-600" />
                <span>Tipo de Evento</span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {eventTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <label
                      key={type.value}
                      className={`relative cursor-pointer group ${formData.eventType === type.value
                        ? 'ring-2 ring-primary-500 bg-primary-50'
                        : 'hover:bg-secondary-50'
                        } border border-secondary-200 rounded-2xl p-4 transition-all`}
                    >
                      <input
                        type="radio"
                        name="eventType"
                        value={type.value}
                        checked={formData.eventType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center space-y-2">
                        <IconComponent className={`w-6 h-6 ${type.color}`} />
                        <span className="text-sm font-medium text-secondary-700 text-center">
                          {type.label}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.eventType && <p className="text-danger-500 text-sm">{errors.eventType}</p>}
            </div>

            {/* Fecha y Hora */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-primary-600" />
                <span>Fecha y Hora</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Fecha del Evento *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`input-field ${errors.date ? 'border-danger-500' : ''}`}
                  />
                  {errors.date && <p className="text-danger-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Hora de Inicio
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Hora de Fin
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5 text-primary-600" />
                <span>Ubicación</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Nombre del Lugar *
                  </label>
                  <input
                    type="text"
                    name="location.venue"
                    value={formData.location.venue}
                    onChange={handleInputChange}
                    className={`input-field ${errors.venue ? 'border-danger-500' : ''}`}
                    placeholder="Ej: Hotel Marriott, Salón de Fiestas..."
                  />
                  {errors.venue && <p className="text-danger-500 text-sm mt-1">{errors.venue}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleInputChange}
                    className={`input-field ${errors.address ? 'border-danger-500' : ''}`}
                    placeholder="Calle, número, colonia..."
                  />
                  {errors.address && <p className="text-danger-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleInputChange}
                      className={`input-field ${errors.city ? 'border-danger-500' : ''}`}
                      placeholder="Ciudad"
                    />
                    {errors.city && <p className="text-danger-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Estado *
                    </label>
                    <input
                      type="text"
                      name="location.state"
                      value={formData.location.state}
                      onChange={handleInputChange}
                      className={`input-field ${errors.state ? 'border-danger-500' : ''}`}
                      placeholder="Estado"
                    />
                    {errors.state && <p className="text-danger-500 text-sm mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="location.zipCode"
                      value={formData.location.zipCode}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="CP"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-primary-600" />
                <span>Información Adicional</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Presupuesto Estimado
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ej: 50000"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Tema o Estilo
                  </label>
                  <input
                    type="text"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ej: Vintage, Moderno, Tropical..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Requisitos Especiales
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows="3"
                  className="input-field"
                  placeholder="Accesibilidad, restricciones alimentarias, preferencias musicales..."
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-100">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-ghost flex-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creando...</span>
                  </>
                ) : (
                  <>
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>Crear Evento</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
