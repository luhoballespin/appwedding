import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { providerService } from '../services/api';

const ProviderSelector = ({
  selectedProviders = [],
  onSelectionChange,
  eventDate,
  eventCity,
  className = ""
}) => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { value: 'catering', label: 'Catering', color: 'text-orange-600' },
    { value: 'decoracion', label: 'Decoración', color: 'text-pink-600' },
    { value: 'musica', label: 'Música', color: 'text-purple-600' },
    { value: 'fotografia', label: 'Fotografía', color: 'text-blue-600' },
    { value: 'video', label: 'Video', color: 'text-indigo-600' },
    { value: 'flores', label: 'Flores', color: 'text-green-600' },
    { value: 'transportacion', label: 'Transportación', color: 'text-yellow-600' },
    { value: 'alojamiento', label: 'Alojamiento', color: 'text-red-600' },
    { value: 'entretenimiento', label: 'Entretenimiento', color: 'text-cyan-600' },
    { value: 'seguridad', label: 'Seguridad', color: 'text-gray-600' },
    { value: 'limpieza', label: 'Limpieza', color: 'text-teal-600' },
    { value: 'planificacion', label: 'Planificación', color: 'text-violet-600' }
  ];

  useEffect(() => {
    console.log('🔄 Cargando proveedores al montar componente...');
    fetchProviders();
  }, [eventDate, eventCity]);

  useEffect(() => {
    if (showModal) {
      console.log('🔄 Abriendo modal, obteniendo proveedores...');
      fetchProviders();
    }
  }, [showModal]);

  useEffect(() => {
    filterProviders();
  }, [providers, searchTerm, selectedCategory]);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      // Verificar autenticación
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('❌ No hay token de autenticación');
        setProviders([]);
        return;
      }

      const params = {};
      if (eventDate) params.date = eventDate;
      if (eventCity) params.location = eventCity;
      if (selectedCategory) params.category = selectedCategory;

      console.log('🔍 Parámetros de búsqueda:', params);
      console.log('🔑 Token presente:', !!token);

      const data = await providerService.getProviders(params);
      console.log('✅ Proveedores obtenidos:', data);
      setProviders(data.data || []);
    } catch (error) {
      console.error('❌ Error fetching providers:', error);
      // Si hay error de autenticación, redirigir al login
      if (error.response?.status === 401) {
        console.log('🔄 Token expirado, redirigiendo al login...');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const filterProviders = () => {
    let filtered = providers;

    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(provider => provider.category === selectedCategory);
    }

    setFilteredProviders(filtered);
  };

  const handleProviderSelect = (provider) => {
    const isSelected = selectedProviders.some(p => p._id === provider._id);

    if (isSelected) {
      // Remover proveedor
      const updated = selectedProviders.filter(p => p._id !== provider._id);
      onSelectionChange(updated);
    } else {
      // Agregar proveedor con información de precios
      const updated = [...selectedProviders, {
        ...provider,
        service: '',
        price: 0,
        status: 'requested',
        priority: 'medium',
        isEssential: false,
        // Nuevos campos para precios por hora
        pricingType: 'fixed',
        hours: 1,
        people: 1,
        items: 1,
        calculatedPrice: 0
      }];
      onSelectionChange(updated);
    }
  };

  const handleProviderUpdate = (providerId, field, value) => {
    const updated = selectedProviders.map(provider => {
      if (provider._id === providerId) {
        const updatedProvider = { ...provider, [field]: value };

        // Si se actualiza el tipo de precio, horas, personas o items, recalcular el precio
        if (['pricingType', 'hours', 'people', 'items'].includes(field)) {
          updatedProvider.calculatedPrice = calculateServicePrice(updatedProvider);
        }

        return updatedProvider;
      }
      return provider;
    });
    onSelectionChange(updated);
  };

  const calculateServicePrice = (provider) => {
    const service = provider.services?.find(s => s.name === provider.service);
    if (!service) return 0;

    let totalPrice = 0;

    switch (service.pricingType) {
      case 'hourly':
        totalPrice = service.hourlyRate * (provider.hours || 1);
        break;
      case 'per_person':
        totalPrice = service.basePrice * (provider.people || 1);
        break;
      case 'per_item':
        totalPrice = service.basePrice * (provider.items || 1);
        break;
      case 'fixed':
      default:
        totalPrice = service.basePrice;
        break;
    }

    return totalPrice;
  };

  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const removeProvider = (providerId) => {
    const updated = selectedProviders.filter(provider => provider._id !== providerId);
    onSelectionChange(updated);
  };

  const isProviderSelected = (providerId) => {
    return selectedProviders.some(p => p._id === providerId);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key={fullStars} className="w-4 h-4 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={fullStars + i + 1} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className={className}>
      {/* Proveedores seleccionados */}
      {selectedProviders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary-900">
            Proveedores Seleccionados ({selectedProviders.length})
          </h3>

          <div className="space-y-3">
            {selectedProviders.map((provider) => (
              <div key={provider._id} className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-secondary-900">{provider.businessName}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${categories.find(c => c.value === provider.category)?.color || 'text-gray-600'
                        } bg-gray-100`}>
                        {categories.find(c => c.value === provider.category)?.label || provider.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Servicio *
                        </label>
                        <select
                          value={provider.service}
                          onChange={(e) => handleProviderUpdate(provider._id, 'service', e.target.value)}
                          className="input-field text-sm"
                          required
                        >
                          <option value="">Seleccionar servicio</option>
                          {provider.services?.map((service, index) => (
                            <option key={index} value={service.name}>
                              {service.name} - {formatPrice(service.basePrice, service.currency)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Tipo de Precio
                        </label>
                        <select
                          value={provider.pricingType}
                          onChange={(e) => handleProviderUpdate(provider._id, 'pricingType', e.target.value)}
                          className="input-field text-sm"
                        >
                          <option value="fixed">Precio Fijo</option>
                          <option value="hourly">Por Hora</option>
                          <option value="per_person">Por Persona</option>
                          <option value="per_item">Por Item</option>
                        </select>
                      </div>

                      {/* Campos condicionales basados en el tipo de precio */}
                      {provider.pricingType === 'hourly' && (
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-1">
                            Horas
                          </label>
                          <input
                            type="number"
                            value={provider.hours}
                            onChange={(e) => handleProviderUpdate(provider._id, 'hours', parseInt(e.target.value) || 1)}
                            className="input-field text-sm"
                            min="1"
                            step="1"
                          />
                        </div>
                      )}

                      {provider.pricingType === 'per_person' && (
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-1">
                            Número de Personas
                          </label>
                          <input
                            type="number"
                            value={provider.people}
                            onChange={(e) => handleProviderUpdate(provider._id, 'people', parseInt(e.target.value) || 1)}
                            className="input-field text-sm"
                            min="1"
                            step="1"
                          />
                        </div>
                      )}

                      {provider.pricingType === 'per_item' && (
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-1">
                            Cantidad de Items
                          </label>
                          <input
                            type="number"
                            value={provider.items}
                            onChange={(e) => handleProviderUpdate(provider._id, 'items', parseInt(e.target.value) || 1)}
                            className="input-field text-sm"
                            min="1"
                            step="1"
                          />
                        </div>
                      )}

                      {/* Precio calculado */}
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Precio Calculado
                        </label>
                        <div className="input-field text-sm bg-gray-50 text-gray-700">
                          {formatPrice(provider.calculatedPrice, provider.pricing?.currency || 'USD')}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Prioridad
                        </label>
                        <select
                          value={provider.priority}
                          onChange={(e) => handleProviderUpdate(provider._id, 'priority', e.target.value)}
                          className="input-field text-sm"
                        >
                          <option value="low">Baja</option>
                          <option value="medium">Media</option>
                          <option value="high">Alta</option>
                          <option value="urgent">Urgente</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`essential-${provider._id}`}
                          checked={provider.isEssential}
                          onChange={(e) => handleProviderUpdate(provider._id, 'isEssential', e.target.checked)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor={`essential-${provider._id}`} className="text-sm font-medium text-secondary-700">
                          Servicio esencial
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeProvider(provider._id)}
                    className="ml-4 p-2 text-danger-500 hover:text-danger-700 hover:bg-danger-50 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón para agregar proveedores */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full btn-outline flex items-center justify-center space-x-2"
      >
        <TagIcon className="w-5 h-5" />
        <span>Agregar Proveedores</span>
      </button>

      {/* Modal de selección de proveedores */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Seleccionar Proveedores</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-primary-200 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Filtros */}
            <div className="p-6 border-b border-secondary-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Buscar proveedor
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10"
                      placeholder="Buscar por nombre o descripción..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Lista de proveedores */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProviders.map(provider => (
                    <div
                      key={provider._id}
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${isProviderSelected(provider._id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-25'
                        }`}
                      onClick={() => handleProviderSelect(provider)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-secondary-900">{provider.businessName}</h3>
                            {isProviderSelected(provider._id) && (
                              <CheckIcon className="w-5 h-5 text-primary-600" />
                            )}
                          </div>

                          <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                            {provider.description}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-secondary-500">
                            <div className="flex items-center space-x-1">
                              <StarIconSolid className="w-4 h-4 text-yellow-400" />
                              <span>{provider.averageRating.toFixed(1)}</span>
                              <span>({provider.totalReviews})</span>
                            </div>

                            {provider.location?.city && (
                              <div className="flex items-center space-x-1">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{provider.location.city}</span>
                              </div>
                            )}
                          </div>

                          {provider.pricing?.basePrice && (
                            <div className="mt-2 text-sm font-medium text-primary-600">
                              Desde ${provider.pricing.basePrice.toLocaleString()} {provider.pricing.currency}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TagIcon className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                  <p className="text-secondary-600">No se encontraron proveedores</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">
                  {selectedProviders.length} proveedor(es) seleccionado(s)
                </span>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-primary"
                >
                  Confirmar Selección
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderSelector;
