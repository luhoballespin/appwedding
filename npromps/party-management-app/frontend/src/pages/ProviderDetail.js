import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon,
  ShareIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhotoIcon,
  TagIcon,
  BuildingOfficeIcon,
  CameraIcon,
  MusicalNoteIcon,
  SparklesIcon,
  TruckIcon,
  HomeIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const ProviderDetail = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Datos de ejemplo - en producción vendrían del backend
  useEffect(() => {
    const mockProvider = {
      id: parseInt(providerId),
      businessName: 'Catering Elegante',
      description: 'Somos una empresa especializada en catering premium para bodas y eventos especiales. Con más de 10 años de experiencia, ofrecemos servicios de alta calidad con ingredientes frescos y preparaciones gourmet.',
      category: 'catering',
      location: {
        address: 'Av. Insurgentes Sur 1234',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '03100'
      },
      contact: {
        phone: '+52 55 1234 5678',
        email: 'contacto@cateringelegante.com',
        website: 'https://www.cateringelegante.com',
        socialMedia: {
          facebook: '@cateringelegante',
          instagram: '@cateringelegante',
          twitter: '@cateringelegante'
        }
      },
      pricing: {
        basePrice: 15000,
        currency: 'MXN',
        pricePerPerson: 500,
        minimumOrder: 10000
      },
      services: [
        {
          name: 'Paquete Básico',
          description: 'Menú para 50 personas con opciones vegetarianas',
          price: 15000,
          isActive: true
        },
        {
          name: 'Paquete Premium',
          description: 'Menú gourmet para 100 personas con chef personal',
          price: 25000,
          isActive: true
        },
        {
          name: 'Servicio de Barra',
          description: 'Barra abierta con bebidas premium',
          price: 8000,
          isActive: true
        }
      ],
      images: [
        '/images/catering1.jpg',
        '/images/catering2.jpg',
        '/images/catering3.jpg'
      ],
      rating: 4.8,
      totalReviews: 45,
      isVerified: true,
      tags: ['premium', 'bodas', 'elegante', 'gourmet'],
      availability: {
        monday: { start: '09:00', end: '18:00', isAvailable: true },
        tuesday: { start: '09:00', end: '18:00', isAvailable: true },
        wednesday: { start: '09:00', end: '18:00', isAvailable: true },
        thursday: { start: '09:00', end: '18:00', isAvailable: true },
        friday: { start: '09:00', end: '18:00', isAvailable: true },
        saturday: { start: '09:00', end: '18:00', isAvailable: true },
        sunday: { start: '10:00', end: '16:00', isAvailable: true }
      },
      reviews: [
        {
          id: 1,
          user: 'María González',
          rating: 5,
          comment: 'Excelente servicio, la comida estaba deliciosa y el personal muy profesional.',
          date: '2024-01-15'
        },
        {
          id: 2,
          user: 'Carlos Rodríguez',
          rating: 4,
          comment: 'Muy buena calidad, aunque un poco caro. Recomendado para eventos especiales.',
          date: '2024-01-10'
        },
        {
          id: 3,
          user: 'Ana Martínez',
          rating: 5,
          comment: 'Perfecto para nuestra boda, todo salió como lo planeamos.',
          date: '2024-01-05'
        }
      ]
    };

    setProvider(mockProvider);
    setLoading(false);
  }, [providerId]);

  const getCategoryIcon = (category) => {
    const icons = {
      catering: UserGroupIcon,
      decoracion: SparklesIcon,
      musica: MusicalNoteIcon,
      fotografia: CameraIcon,
      flores: SparklesIcon,
      transportacion: TruckIcon,
      alojamiento: HomeIcon,
      seguridad: ShieldCheckIcon,
      limpieza: WrenchScrewdriverIcon,
      planificacion: CalendarDaysIcon,
      otros: TagIcon
    };
    return icons[category] || TagIcon;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      catering: 'Catering',
      decoracion: 'Decoración',
      musica: 'Música',
      fotografia: 'Fotografía',
      flores: 'Flores',
      transportacion: 'Transportación',
      alojamiento: 'Alojamiento',
      seguridad: 'Seguridad',
      limpieza: 'Limpieza',
      planificacion: 'Planificación',
      otros: 'Otros'
    };
    return labels[category] || 'Otros';
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleContact = () => {
    setShowContactForm(true);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
        <div className="container-elegant">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-secondary-600">Cargando proveedor...</span>
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

  const IconComponent = getCategoryIcon(provider.category);
  const categoryColor = getCategoryColor(provider.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="container-elegant max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/providers')}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-xl transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-xl ${categoryColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-secondary-500 uppercase tracking-wide">
                  {getCategoryLabel(provider.category)}
                </span>
                {provider.isVerified && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircleIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">Verificado</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-secondary-900">{provider.businessName}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-xl transition-colors ${isFavorited
                  ? 'text-red-600 bg-red-50'
                  : 'text-secondary-400 hover:text-red-600 hover:bg-red-50'
                  }`}
              >
                <HeartIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de Imágenes */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <IconComponent className="w-24 h-24 text-primary-600" />
              </div>
              <div className="p-4">
                <div className="flex space-x-2">
                  {provider.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg border-2 transition-colors ${selectedImage === index
                        ? 'border-primary-500'
                        : 'border-secondary-200 hover:border-secondary-300'
                        }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 rounded-md flex items-center justify-center">
                        <PhotoIcon className="w-6 h-6 text-primary-600" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Descripción</h2>
              <p className="text-secondary-600 leading-relaxed">{provider.description}</p>
            </div>

            {/* Servicios */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Servicios</h2>
              <div className="space-y-4">
                {provider.services.map((service, index) => (
                  <div key={index} className="border border-secondary-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-secondary-900 mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-secondary-600 mb-2">
                          {service.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <CurrencyDollarIcon className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${service.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {service.isActive ? 'Disponible' : 'No disponible'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reseñas */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Reseñas</h2>
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-secondary-900">{provider.rating}</span>
                  <span className="text-sm text-secondary-600">({provider.totalReviews} reseñas)</span>
                </div>
              </div>

              <div className="space-y-4">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="border-b border-secondary-100 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{review.user}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-4 h-4 ${i < review.rating
                                  ? 'text-yellow-500'
                                  : 'text-secondary-300'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-secondary-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <p className="text-secondary-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información de Contacto */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-secondary-700">{provider.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-secondary-700">{provider.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-secondary-700">
                    {provider.location.address}, {provider.location.city}
                  </span>
                </div>
                {provider.contact.website && (
                  <div className="flex items-center space-x-3">
                    <GlobeAltIcon className="w-5 h-5 text-primary-600" />
                    <a
                      href={provider.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Sitio web
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Precios */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Precios</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-600">Precio base</span>
                  <span className="font-medium text-secondary-900">
                    {formatPrice(provider.pricing.basePrice)}
                  </span>
                </div>
                {provider.pricing.pricePerPerson && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Por persona</span>
                    <span className="font-medium text-secondary-900">
                      {formatPrice(provider.pricing.pricePerPerson)}
                    </span>
                  </div>
                )}
                {provider.pricing.minimumOrder && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Pedido mínimo</span>
                    <span className="font-medium text-secondary-900">
                      {formatPrice(provider.pricing.minimumOrder)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Disponibilidad</h3>
              <div className="space-y-2">
                {Object.entries(provider.availability).map(([day, schedule]) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-700 capitalize">
                      {day === 'monday' ? 'Lunes' :
                        day === 'tuesday' ? 'Martes' :
                          day === 'wednesday' ? 'Miércoles' :
                            day === 'thursday' ? 'Jueves' :
                              day === 'friday' ? 'Viernes' :
                                day === 'saturday' ? 'Sábado' : 'Domingo'}
                    </span>
                    <div className="flex items-center space-x-2">
                      {schedule.isAvailable ? (
                        <>
                          <ClockIcon className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">
                            {schedule.start} - {schedule.end}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-red-600">Cerrado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">¿Interesado?</h3>
              <div className="space-y-3">
                <Link
                  to={`/providers/${provider.id}/booking`}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>Contratar Servicio</span>
                </Link>
                <button className="w-full btn-ghost flex items-center justify-center space-x-2">
                  <ShareIcon className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;
