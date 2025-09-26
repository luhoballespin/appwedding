import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
  TagIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const ProviderBooking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventDate: '',
    eventTime: '',
    guestCount: '',
    eventType: '',
    location: '',
    specialRequests: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    selectedServices: []
  });
  const [errors, setErrors] = useState({});

  // Datos de ejemplo - en producción vendrían del backend
  useEffect(() => {
    const mockProvider = {
      id: parseInt(providerId),
      businessName: 'Catering Elegante',
      category: 'catering',
      pricing: {
        basePrice: 15000,
        currency: 'MXN',
        pricePerPerson: 500,
        minimumOrder: 10000
      },
      services: [
        {
          id: 1,
          name: 'Paquete Básico',
          description: 'Menú para 50 personas con opciones vegetarianas',
          price: 15000,
          isActive: true
        },
        {
          id: 2,
          name: 'Paquete Premium',
          description: 'Menú gourmet para 100 personas con chef personal',
          price: 25000,
          isActive: true
        },
        {
          id: 3,
          name: 'Servicio de Barra',
          description: 'Barra abierta con bebidas premium',
          price: 8000,
          isActive: true
        }
      ]
    };

    setProvider(mockProvider);
    setLoading(false);
  }, [providerId]);

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

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.eventDate) {
        newErrors.eventDate = 'La fecha del evento es requerida';
      }
      if (!formData.eventTime) {
        newErrors.eventTime = 'La hora del evento es requerida';
      }
      if (!formData.guestCount) {
        newErrors.guestCount = 'El número de invitados es requerido';
      }
      if (!formData.eventType) {
        newErrors.eventType = 'El tipo de evento es requerido';
      }
    }

    if (stepNumber === 2) {
      if (!formData.contactInfo.name) {
        newErrors.name = 'El nombre es requerido';
      }
      if (!formData.contactInfo.email) {
        newErrors.email = 'El email es requerido';
      }
      if (!formData.contactInfo.phone) {
        newErrors.phone = 'El teléfono es requerido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) {
      return;
    }

    try {
      // Aquí se haría la llamada al API para enviar la solicitud
      console.log('Solicitud de contratación:', formData);

      // Simular envío exitoso
      alert('Solicitud enviada exitosamente. El proveedor se pondrá en contacto contigo pronto.');
      navigate('/providers');
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al enviar la solicitud. Por favor, intenta de nuevo.');
    }
  };

  const getTotalPrice = () => {
    if (!provider) return 0;

    const selectedServices = provider.services.filter(service =>
      formData.selectedServices.includes(service.id)
    );

    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-secondary-600">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6 text-center">
            <XCircleIcon className="w-12 h-12 text-danger-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-danger-900 mb-2">
              Proveedor no encontrado
            </h2>
            <p className="text-danger-600 mb-4">
              El proveedor que buscas no existe o no está disponible.
            </p>
            <Link to="/providers" className="btn-primary">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="container-elegant max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate(`/providers/${providerId}`)}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-xl transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-secondary-900">Contratar Servicio</h1>
              <p className="text-secondary-600">{provider.businessName}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNumber
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-200 text-secondary-600'
                  }`}>
                  {stepNumber}
                </div>
                <span className={`ml-2 text-sm font-medium ${step >= stepNumber ? 'text-primary-600' : 'text-secondary-600'
                  }`}>
                  {stepNumber === 1 ? 'Detalles del Evento' :
                    stepNumber === 2 ? 'Información de Contacto' : 'Confirmación'}
                </span>
                {stepNumber < 3 && (
                  <div className={`w-8 h-0.5 ml-4 ${step > stepNumber ? 'bg-primary-600' : 'bg-secondary-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Paso 1: Detalles del Evento */}
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-6">Detalles del Evento</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Fecha del Evento *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className={`input-field ${errors.eventDate ? 'border-danger-500' : ''}`}
                      />
                      {errors.eventDate && <p className="text-danger-500 text-sm mt-1">{errors.eventDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Hora del Evento *
                      </label>
                      <input
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        className={`input-field ${errors.eventTime ? 'border-danger-500' : ''}`}
                      />
                      {errors.eventTime && <p className="text-danger-500 text-sm mt-1">{errors.eventTime}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Número de Invitados *
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className={`input-field ${errors.guestCount ? 'border-danger-500' : ''}`}
                        placeholder="Ej: 50"
                        min="1"
                      />
                      {errors.guestCount && <p className="text-danger-500 text-sm mt-1">{errors.guestCount}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Tipo de Evento *
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className={`input-field ${errors.eventType ? 'border-danger-500' : ''}`}
                      >
                        <option value="">Selecciona un tipo</option>
                        <option value="boda">Boda</option>
                        <option value="cumpleanos">Cumpleaños</option>
                        <option value="corporativo">Corporativo</option>
                        <option value="social">Social</option>
                        <option value="religioso">Religioso</option>
                        <option value="otro">Otro</option>
                      </select>
                      {errors.eventType && <p className="text-danger-500 text-sm mt-1">{errors.eventType}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Ubicación del Evento
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Dirección del evento"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Solicitudes Especiales
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows="4"
                      className="input-field"
                      placeholder="Describe cualquier solicitud especial o requisito..."
                    />
                  </div>
                </div>
              )}

              {/* Paso 2: Información de Contacto */}
              {step === 2 && (
                <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-6">Información de Contacto</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="contactInfo.name"
                        value={formData.contactInfo.name}
                        onChange={handleInputChange}
                        className={`input-field ${errors.name ? 'border-danger-500' : ''}`}
                        placeholder="Tu nombre completo"
                      />
                      {errors.name && <p className="text-danger-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="contactInfo.phone"
                        value={formData.contactInfo.phone}
                        onChange={handleInputChange}
                        className={`input-field ${errors.phone ? 'border-danger-500' : ''}`}
                        placeholder="+52 55 1234 5678"
                      />
                      {errors.phone && <p className="text-danger-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="contactInfo.email"
                      value={formData.contactInfo.email}
                      onChange={handleInputChange}
                      className={`input-field ${errors.email ? 'border-danger-500' : ''}`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-danger-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              )}

              {/* Paso 3: Confirmación */}
              {step === 3 && (
                <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-6">Confirmación</h2>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CalendarDaysIcon className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Fecha y Hora</p>
                        <p className="text-sm text-secondary-600">
                          {new Date(formData.eventDate).toLocaleDateString('es-ES')} a las {formData.eventTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <UserGroupIcon className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Invitados</p>
                        <p className="text-sm text-secondary-600">{formData.guestCount} personas</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <TagIcon className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Tipo de Evento</p>
                        <p className="text-sm text-secondary-600 capitalize">{formData.eventType}</p>
                      </div>
                    </div>

                    {formData.location && (
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="font-medium text-secondary-900">Ubicación</p>
                          <p className="text-sm text-secondary-600">{formData.location}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Contacto</p>
                        <p className="text-sm text-secondary-600">
                          {formData.contactInfo.name} - {formData.contactInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de Navegación */}
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn-ghost"
                  >
                    Anterior
                  </button>
                )}

                <div className="ml-auto">
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Enviar Solicitud
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resumen del Proveedor */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Proveedor</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900">{provider.businessName}</h4>
                  <p className="text-sm text-secondary-600 capitalize">{provider.category}</p>
                </div>
              </div>
            </div>

            {/* Servicios Seleccionados */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Servicios</h3>
              <div className="space-y-3">
                {provider.services.map((service) => (
                  <label key={service.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedServices.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                      className="mt-1 rounded border-secondary-300"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900">{service.name}</p>
                      <p className="text-sm text-secondary-600">{service.description}</p>
                      <p className="text-sm font-medium text-primary-600">
                        {formatPrice(service.price)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-primary-900">Total Estimado</span>
                <span className="text-xl font-bold text-primary-900">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <p className="text-sm text-primary-700">
                * Precio estimado. El precio final puede variar según los detalles específicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderBooking;
