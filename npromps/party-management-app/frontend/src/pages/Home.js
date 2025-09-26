import React from 'react';
import { Link } from 'react-router-dom';
import {
    HeartIcon,
    StarIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    EyeIcon,
    UserGroupIcon,
    MusicalNoteIcon,
    CameraIcon,
    SparklesIcon,
    TruckIcon,
    HomeIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    CalendarDaysIcon,
    TagIcon,
    ArrowRightIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const Home = () => {
    const featuredProviders = [
        {
            id: 1,
            businessName: 'Catering Elegante',
            description: 'Servicio de catering premium para bodas y eventos especiales con menús gourmet',
            category: 'catering',
            location: 'Ciudad de México',
            rating: 4.8,
            totalReviews: 45,
            price: 15000,
            currency: 'MXN',
            image: '/images/catering-hero.jpg',
            isVerified: true,
            tags: ['premium', 'gourmet', 'bodas']
        },
        {
            id: 2,
            businessName: 'DJ Pro Music',
            description: 'Servicio de DJ profesional con equipos de última generación y música personalizada',
            category: 'musica',
            location: 'Guadalajara',
            rating: 4.9,
            totalReviews: 32,
            price: 8000,
            currency: 'MXN',
            image: '/images/dj-hero.jpg',
            isVerified: true,
            tags: ['profesional', 'equipos', 'música']
        },
        {
            id: 3,
            businessName: 'Decoraciones Florales',
            description: 'Arreglos florales únicos y decoración elegante para eventos especiales',
            category: 'flores',
            location: 'Monterrey',
            rating: 4.7,
            totalReviews: 28,
            price: 12000,
            currency: 'MXN',
            image: '/images/flores-hero.jpg',
            isVerified: false,
            tags: ['flores', 'decoración', 'elegante']
        },
        {
            id: 4,
            businessName: 'Fotografía Artística',
            description: 'Fotografía profesional para bodas y eventos con estilo artístico y creativo',
            category: 'fotografia',
            location: 'Puebla',
            rating: 4.9,
            totalReviews: 67,
            price: 18000,
            currency: 'MXN',
            image: '/images/foto-hero.jpg',
            isVerified: true,
            tags: ['profesional', 'artístico', 'creativo']
        },
        {
            id: 5,
            businessName: 'Barra Premium',
            description: 'Servicio de barra con bartenders profesionales y cócteles exclusivos',
            category: 'catering',
            location: 'Ciudad de México',
            rating: 4.6,
            totalReviews: 23,
            price: 20000,
            currency: 'MXN',
            image: '/images/barra-hero.jpg',
            isVerified: true,
            tags: ['barra', 'bebidas', 'premium']
        },
        {
            id: 6,
            businessName: 'Luces y Sonido',
            description: 'Iluminación profesional y sistemas de sonido de alta calidad',
            category: 'decoracion',
            location: 'Tijuana',
            rating: 4.5,
            totalReviews: 19,
            price: 15000,
            currency: 'MXN',
            image: '/images/luces-hero.jpg',
            isVerified: false,
            tags: ['iluminación', 'sonido', 'tecnología']
        }
    ];

    const categories = [
        { name: 'Catering', icon: UserGroupIcon, color: 'text-green-600', bgColor: 'bg-green-100', count: 45 },
        { name: 'Música', icon: MusicalNoteIcon, color: 'text-purple-600', bgColor: 'bg-purple-100', count: 32 },
        { name: 'Fotografía', icon: CameraIcon, color: 'text-blue-600', bgColor: 'bg-blue-100', count: 28 },
        { name: 'Decoración', icon: SparklesIcon, color: 'text-pink-600', bgColor: 'bg-pink-100', count: 38 },
        { name: 'Flores', icon: SparklesIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100', count: 25 },
        { name: 'Transporte', icon: TruckIcon, color: 'text-gray-600', bgColor: 'bg-gray-100', count: 15 }
    ];

    const getCategoryIcon = (category) => {
        const icons = {
            catering: UserGroupIcon,
            musica: MusicalNoteIcon,
            fotografia: CameraIcon,
            flores: SparklesIcon,
            decoracion: SparklesIcon,
            transportacion: TruckIcon,
            alojamiento: HomeIcon,
            seguridad: ShieldCheckIcon,
            limpieza: WrenchScrewdriverIcon,
            planificacion: CalendarDaysIcon,
            otros: TagIcon
        };
        return icons[category] || TagIcon;
    };

    const getCategoryColor = (category) => {
        const colors = {
            catering: 'bg-green-100 text-green-800',
            musica: 'bg-purple-100 text-purple-800',
            fotografia: 'bg-blue-100 text-blue-800',
            flores: 'bg-yellow-100 text-yellow-800',
            decoracion: 'bg-pink-100 text-pink-800',
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="container-elegant">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                                    Tu evento
                                    <span className="text-primary-600 block">perfecto</span>
                                    te espera
                                </h1>
                                <p className="text-xl text-secondary-600 leading-relaxed">
                                    Organiza tus eventos de manera fácil y eficiente con nuestra plataforma.
                                    Encuentra los mejores proveedores, gestiona tus invitados y crea recuerdos inolvidables.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/providers" className="btn-primary btn-lg flex items-center space-x-2">
                                    <HeartIcon className="w-5 h-5" />
                                    <span>Explorar Proveedores</span>
                                </Link>
                                <Link to="/register" className="btn-ghost btn-lg flex items-center space-x-2">
                                    <CalendarDaysIcon className="w-5 h-5" />
                                    <span>Comenzar Ahora</span>
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 pt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600">500+</div>
                                    <div className="text-sm text-secondary-600">Proveedores</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600">1000+</div>
                                    <div className="text-sm text-secondary-600">Eventos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary-600">4.9</div>
                                    <div className="text-sm text-secondary-600">Calificación</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10">
                                <div className="bg-white rounded-3xl shadow-large p-8 border border-secondary-100">
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                                                <HeartIcon className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-secondary-900">Wedding Planner</h3>
                                                <p className="text-sm text-secondary-600">Tu evento perfecto</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                                <span className="text-sm text-green-800">Proveedores verificados</span>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                                                <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                                                <span className="text-sm text-blue-800">Precios transparentes</span>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                                                <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                                                <span className="text-sm text-purple-800">Soporte 24/7</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-200 rounded-full opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Providers Section */}
            <section className="py-16 bg-white">
                <div className="container-elegant">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary-900 mb-4">Proveedores Destacados</h2>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            Descubre los mejores proveedores para tu evento, cuidadosamente seleccionados por su calidad y experiencia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProviders.map((provider) => {
                            const IconComponent = getCategoryIcon(provider.category);
                            const categoryColor = getCategoryColor(provider.category);

                            return (
                                <div
                                    key={provider.id}
                                    className="bg-white rounded-2xl shadow-soft border border-secondary-100 overflow-hidden hover:shadow-large transition-all duration-300 group"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <IconComponent className="w-16 h-16 text-primary-600" />
                                        </div>
                                        {provider.isVerified && (
                                            <div className="absolute top-4 right-4">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <CheckCircleIcon className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors mb-1">
                                                    {provider.businessName}
                                                </h3>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                                                    {provider.category.charAt(0).toUpperCase() + provider.category.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                                            {provider.description}
                                        </p>

                                        {/* Info */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center space-x-2 text-sm text-secondary-600">
                                                <MapPinIcon className="w-4 h-4" />
                                                <span>{provider.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-secondary-600">
                                                <CurrencyDollarIcon className="w-4 h-4" />
                                                <span>Desde {formatPrice(provider.price)}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-secondary-600">
                                                <StarIcon className="w-4 h-4 text-yellow-500" />
                                                <span>{provider.rating} ({provider.totalReviews} reseñas)</span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {provider.tags.slice(0, 2).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded-full text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
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

                    <div className="text-center mt-12">
                        <Link to="/providers" className="btn-primary btn-lg inline-flex items-center space-x-2">
                            <span>Ver Todos los Proveedores</span>
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="container-elegant">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary-900 mb-4">Categorías Populares</h2>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            Encuentra exactamente lo que necesitas para tu evento
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <Link
                                    key={index}
                                    to={`/providers?category=${category.name.toLowerCase()}`}
                                    className="group bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 text-center hover:shadow-large transition-all duration-300 hover:scale-105"
                                >
                                    <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                        <IconComponent className={`w-8 h-8 ${category.color}`} />
                                    </div>
                                    <h3 className="font-semibold text-secondary-900 mb-1">{category.name}</h3>
                                    <p className="text-sm text-secondary-600">{category.count} proveedores</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
                <div className="container-elegant text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            ¿Listo para crear tu evento perfecto?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Únete a miles de personas que ya han organizado sus eventos con nosotros
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="btn-white btn-lg">
                                Comenzar Gratis
                            </Link>
                            <Link to="/providers" className="btn-ghost btn-lg text-white border-white hover:bg-white/10">
                                Explorar Proveedores
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;