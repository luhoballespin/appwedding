import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  TrashIcon,
  PhotoIcon,
  TagIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CameraIcon,
  MusicalNoteIcon,
  SparklesIcon,
  TruckIcon,
  HomeIcon,
  ShieldCheckIcon,
  SparklesIcon as SparklesIcon2,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    category: '',
    services: [
      { name: '', description: '', price: '', isActive: true }
    ],
    pricing: {
      basePrice: '',
      currency: 'MXN',
      pricePerPerson: '',
      minimumOrder: ''
    },
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: { latitude: '', longitude: '' }
    },
    contact: {
      phone: '',
      email: '',
      website: '',
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    },
    tags: [],
    availability: {
      monday: { start: '09:00', end: '18:00', isAvailable: true },
      tuesday: { start: '09:00', end: '18:00', isAvailable: true },
      wednesday: { start: '09:00', end: '18:00', isAvailable: true },
      thursday: { start: '09:00', end: '18:00', isAvailable: true },
      friday: { start: '09:00', end: '18:00', isAvailable: true },
      saturday: { start: '09:00', end: '18:00', isAvailable: true },
      sunday: { start: '09:00', end: '18:00', isAvailable: false }
    }
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    { value: 'catering', label: 'Catering', icon: UserGroupIcon, color: 'text-green-600' },
    { value: 'decoracion', label: 'Decoración', icon: SparklesIcon, color: 'text-pink-600' },
    { value: 'musica', label: 'Música', icon: MusicalNoteIcon, color: 'text-purple-600' },
    { value: 'fotografia', label: 'Fotografía', icon: CameraIcon, color: 'text-blue-600' },
    { value: 'video', label: 'Video', icon: CameraIcon, color: 'text-indigo-600' },
    { value: 'flores', label: 'Flores', icon: SparklesIcon2, color: 'text-yellow-600' },
    { value: 'transportacion', label: 'Transportación', icon: TruckIcon, color: 'text-gray-600' },
    { value: 'alojamiento', label: 'Alojamiento', icon: HomeIcon, color: 'text-orange-600' },
    { value: 'entretenimiento', label: 'Entretenimiento', icon: UserGroupIcon, color: 'text-red-600' },
    { value: 'seguridad', label: 'Seguridad', icon: ShieldCheckIcon, color: 'text-slate-600' },
    { value: 'limpieza', label: 'Limpieza', icon: WrenchScrewdriverIcon, color: 'text-cyan-600' },
    { value: 'planificacion', label: 'Planificación', icon: CalendarDaysIcon, color: 'text-emerald-600' },
    { value: 'otros', label: 'Otros', icon: TagIcon, color: 'text-gray-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.');
      if (subChild) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [subChild]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
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

  const handleServiceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) =>
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '', price: '', isActive: true }]
    }));
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter((_, i) => i !== index)
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: field === 'isAvailable' ? value : value
        }
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'El nombre del negocio es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    if (!formData.pricing.basePrice) {
      newErrors.basePrice = 'El precio base es requerido';
    }

    if (!formData.location.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!formData.location.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }

    if (!formData.contact.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!formData.contact.email.trim()) {
      newErrors.email = 'El email es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Aquí se haría la llamada al API
      console.log('Datos del producto:', formData);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));

      navigate('/provider-dashboard');
    } catch (error) {
      console.error('Error al crear producto:', error);
    } finally {
      setLoading(false);
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
                <TagIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Crear Producto/Servicio</h1>
                <p className="text-primary-100">Agrega tu producto o servicio al catálogo</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Información Básica */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <BuildingOfficeIcon className="w-5 h-5 text-primary-600" />
                <span>Información Básica</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Nombre del Negocio *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className={`input-field ${errors.businessName ? 'border-danger-500' : ''}`}
                    placeholder="Ej: Catering Elegante"
                  />
                  {errors.businessName && <p className="text-danger-500 text-sm mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`input-field ${errors.category ? 'border-danger-500' : ''}`}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-danger-500 text-sm mt-1">{errors.category}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={`input-field ${errors.description ? 'border-danger-500' : ''}`}
                  placeholder="Describe tu negocio, servicios, experiencia..."
                />
                {errors.description && <p className="text-danger-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Servicios */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                  <UserGroupIcon className="w-5 h-5 text-primary-600" />
                  <span>Servicios</span>
                </h2>
                <button
                  type="button"
                  onClick={addService}
                  className="btn-ghost flex items-center space-x-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Agregar Servicio</span>
                </button>
              </div>

              {formData.services.map((service, index) => (
                <div key={index} className="border border-secondary-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-secondary-900">Servicio {index + 1}</h3>
                    {formData.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="p-2 text-danger-600 hover:bg-danger-50 rounded-xl transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Nombre del Servicio
                      </label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                        className="input-field"
                        placeholder="Ej: Paquete Básico"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Precio
                      </label>
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                        className="input-field"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div className="flex items-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={service.isActive}
                          onChange={(e) => handleServiceChange(index, 'isActive', e.target.checked)}
                          className="rounded border-secondary-300"
                        />
                        <span className="text-sm text-secondary-700">Activo</span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Descripción del Servicio
                    </label>
                    <textarea
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      rows="2"
                      className="input-field"
                      placeholder="Describe qué incluye este servicio..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Precios */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <CurrencyDollarIcon className="w-5 h-5 text-primary-600" />
                <span>Precios</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Precio Base *
                  </label>
                  <input
                    type="number"
                    name="pricing.basePrice"
                    value={formData.pricing.basePrice}
                    onChange={handleInputChange}
                    className={`input-field ${errors.basePrice ? 'border-danger-500' : ''}`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.basePrice && <p className="text-danger-500 text-sm mt-1">{errors.basePrice}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Moneda
                  </label>
                  <select
                    name="pricing.currency"
                    value={formData.pricing.currency}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="MXN">MXN - Peso Mexicano</option>
                    <option value="USD">USD - Dólar Americano</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Precio por Persona
                  </label>
                  <input
                    type="number"
                    name="pricing.pricePerPerson"
                    value={formData.pricing.pricePerPerson}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Pedido Mínimo
                </label>
                <input
                  type="number"
                  name="pricing.minimumOrder"
                  value={formData.pricing.minimumOrder}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="0"
                  min="0"
                />
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
                      Estado
                    </label>
                    <input
                      type="text"
                      name="location.state"
                      value={formData.location.state}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Estado"
                    />
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

            {/* Contacto */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <PhoneIcon className="w-5 h-5 text-primary-600" />
                <span>Contacto</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    className={`input-field ${errors.phone ? 'border-danger-500' : ''}`}
                    placeholder="+52 55 1234 5678"
                  />
                  {errors.phone && <p className="text-danger-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    className={`input-field ${errors.email ? 'border-danger-500' : ''}`}
                    placeholder="contacto@miempresa.com"
                  />
                  {errors.email && <p className="text-danger-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Sitio Web
                </label>
                <input
                  type="url"
                  name="contact.website"
                  value={formData.contact.website}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://www.miempresa.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="contact.socialMedia.facebook"
                    value={formData.contact.socialMedia.facebook}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="@miempresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="contact.socialMedia.instagram"
                    value={formData.contact.socialMedia.instagram}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="@miempresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="text"
                    name="contact.socialMedia.twitter"
                    value={formData.contact.socialMedia.twitter}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="@miempresa"
                  />
                </div>
              </div>
            </div>

            {/* Etiquetas */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center space-x-2">
                <TagIcon className="w-5 h-5 text-primary-600" />
                <span>Etiquetas</span>
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-primary-600 hover:text-primary-800"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="input-field flex-1"
                  placeholder="Agregar etiqueta..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="btn-ghost"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-100">
              <button
                type="button"
                onClick={() => navigate('/provider-dashboard')}
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
                    <TagIcon className="w-4 h-4" />
                    <span>Crear Producto</span>
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

export default CreateProduct;
