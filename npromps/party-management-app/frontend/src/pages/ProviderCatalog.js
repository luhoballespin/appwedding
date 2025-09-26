import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  EyeIcon,
  HeartIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CameraIcon,
  MusicalNoteIcon,
  SparklesIcon,
  TruckIcon,
  HomeIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  TagIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const ProviderCatalog = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Datos de ejemplo - en producción vendrían del backend
  useEffect(() => {
    const mockProviders = [
      {
        id: 1,
        businessName: 'Catering Elegante',
        description: 'Servicio de catering premium para bodas y eventos especiales',
        category: 'catering',
        location: {
          city: 'Ciudad de México',
          state: 'CDMX'
        },
        pricing: {
          basePrice: 15000,
          currency: 'MXN'
        },
        rating: 4.8,
        totalReviews: 45,
        images: ['/images/catering1.jpg'],
        isVerified: true,
        tags: ['premium', 'bodas', 'elegante']
      },
      {
        id: 2,
        businessName: 'DJ Pro Music',
        description: 'Servicio de DJ profesional con equipos de última generación',
        category: 'musica',
        location: {
          city: 'Guadalajara',
          state: 'Jalisco'
        },
        pricing: {
          basePrice: 8000,
          currency: 'MXN'
        },
        rating: 4.9,
        totalReviews: 32,
        images: ['/images/dj1.jpg'],
        isVerified: true,
        tags: ['profesional', 'equipos', 'música']
      },
      {
        id: 3,
        businessName: 'Decoraciones Florales',
        description: 'Arreglos florales y decoración para eventos',
        category: 'flores',
        location: {
          city: 'Monterrey',
          state: 'Nuevo León'
        },
        pricing: {
          basePrice: 12000,
          currency: 'MXN'
        },
        rating: 4.7,
        totalReviews: 28,
        images: ['/images/flores1.jpg'],
        isVerified: false,
        tags: ['flores', 'decoración', 'natural']
      },
      {
        id: 4,
        businessName: 'Fotografía Artística',
        description: 'Servicio de fotografía profesional para bodas y eventos',
        category: 'fotografia',
        location: {
          city: 'Puebla',
          state: 'Puebla'
        },
        pricing: {
          basePrice: 18000,
          currency: 'MXN'
        },
        rating: 4.9,
        totalReviews: 67,
        images: ['/images/foto1.jpg'],
        isVerified: true,
        tags: ['profesional', 'artístico', 'bodas']
      },
      {
        id: 5,
        businessName: 'Barra Premium',
        description: 'Servicio de barra con bartenders profesionales',
        category: 'catering',
        location: {
          city: 'Ciudad de México',
          state: 'CDMX'
        },
        pricing: {
          basePrice: 20000,
          currency: 'MXN'
        },
        rating: 4.6,
        totalReviews: 23,
        images: ['/images/barra1.jpg'],
        isVerified: true,
        tags: ['barra', 'bebidas', 'premium']
      },
      {
        id: 6,
        businessName: 'Luces y Sonido',
        description: 'Iluminación profesional y sistemas de sonido',
        category: 'decoracion',
        location: {
          city: 'Tijuana',
          state: 'Baja California'
        },
        pricing: {
          basePrice: 15000,
          currency: 'MXN'
        },
        rating: 4.5,
        totalReviews: 19,
        images: ['/images/luces1.jpg'],
        isVerified: false,
        tags: ['iluminación', 'sonido', 'tecnología']
      }
    ];

    setProviders(mockProviders);
    setLoading(false);
  }, []);

  const categories = [
    { value: 'all', label: 'Todos', icon: TagIcon },
    { value: 'catering', label: 'Catering', icon: UserGroupIcon },
    { value: 'decoracion', label: 'Decoración', icon: SparklesIcon },
    { value: 'musica', label: 'Música', icon: MusicalNoteIcon },
    { value: 'fotografia', label: 'Fotografía', icon: CameraIcon },
    { value: 'flores', label: 'Flores', icon: SparklesIcon },
    { value: 'transportacion', label: 'Transportación', icon: TruckIcon },
    { value: 'alojamiento', label: 'Alojamiento', icon: HomeIcon },
    { value: 'seguridad', label: 'Seguridad', icon: ShieldCheckIcon },
    { value: 'limpieza', label: 'Limpieza', icon: WrenchScrewdriverIcon },
    { value: 'planificacion', label: 'Planificación', icon: CalendarDaysIcon }
  ];

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.icon : TagIcon;
  };

  const getCategoryLabel = (category) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.label : 'Otros';
  };

  const getCategoryColor = (category) => {
    const colors = {
      catering: 'bg-green-100 text-green-800',
      decoracion: 'bg-pink-100 text-pink-800',
      musica: 'bg-purple-100 text-purple-800',
      fotografia: 'bg-blue-100 text-blue-800',
      flores: 'bg-yellow-100 text-yellow-800',
      transportacion: 'bg-gray-100 text-gray-800',
      alojamiento: 'bg-orange-100 text-orange-800',
      seguridad: 'bg-slate-100 text-slate-800',
      limpieza: 'bg-cyan-100 text-cyan-800',
      planificacion: 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;

    const matchesLocation = selectedLocation === 'all' ||
      provider.location.city.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesPrice = (!priceRange.min || provider.pricing.basePrice >= parseInt(priceRange.min)) &&
      (!priceRange.max || provider.pricing.basePrice <= parseInt(priceRange.max));

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.pricing.basePrice - b.pricing.basePrice;
      case 'price-high':
        return b.pricing.basePrice - a.pricing.basePrice;
      case 'name':
        return a.businessName.localeCompare(b.businessName);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-secondary-600">Cargando proveedores...</span>
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
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Catálogo de Proveedores</h1>
          <p className="text-secondary-600">Encuentra los mejores proveedores para tu evento</p>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Buscar proveedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Botón de filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-ghost flex items-center space-x-2"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filtros expandibles */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-secondary-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    placeholder="Ciudad..."
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Precio Mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Precio Máximo
                  </label>
                  <input
                    type="number"
                    placeholder="Sin límite"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field"
                  >
                    <option value="rating">Mejor calificación</option>
                    <option value="price-low">Precio: menor a mayor</option>
                    <option value="price-high">Precio: mayor a menor</option>
                    <option value="name">Nombre A-Z</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setPriceRange({ min: '', max: '' });
                    setSortBy('rating');
                  }}
                  className="btn-ghost"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-secondary-600">
            {sortedProviders.length} proveedor{sortedProviders.length !== 1 ? 'es' : ''} encontrado{sortedProviders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Lista de Proveedores */}
        {sortedProviders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-12 text-center">
            <MagnifyingGlassIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No se encontraron proveedores
            </h3>
            <p className="text-secondary-600 mb-6">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLocation('all');
                setPriceRange({ min: '', max: '' });
              }}
              className="btn-primary"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProviders.map((provider) => {
              const IconComponent = getCategoryIcon(provider.category);
              const categoryColor = getCategoryColor(provider.category);

              return (
                <div
                  key={provider.id}
                  className="bg-white rounded-2xl shadow-soft border border-secondary-100 overflow-hidden hover:shadow-large transition-all duration-200 group"
                >
                  {/* Imagen del proveedor */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-primary-600" />
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                            {provider.businessName}
                          </h3>
                          {provider.isVerified && (
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                          {getCategoryLabel(provider.category)}
                        </span>
                      </div>
                    </div>

                    <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                      {provider.description}
                    </p>

                    {/* Información adicional */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-secondary-600">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{provider.location.city}, {provider.location.state}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-secondary-600">
                        <CurrencyDollarIcon className="w-4 h-4" />
                        <span>Desde {formatPrice(provider.pricing.basePrice)}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-secondary-600">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span>{provider.rating} ({provider.totalReviews} reseñas)</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {provider.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/providers/${provider.id}`}
                        className="flex-1 btn-primary flex items-center justify-center space-x-2"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>Ver Detalles</span>
                      </Link>
                      <button className="p-2 text-secondary-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <HeartIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Categorías Populares */}
        <div className="mt-12 bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Categorías Populares</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.value}
                  to={`/providers?category=${category.value}`}
                  className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-secondary-50 transition-colors"
                >
                  <IconComponent className="w-8 h-8 text-primary-600" />
                  <span className="text-sm font-medium text-secondary-700 text-center">
                    {category.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCatalog;
