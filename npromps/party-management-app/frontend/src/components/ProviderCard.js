import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    StarIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    EyeIcon,
    HeartIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ProviderCard = ({ provider, showActions = true, className = '' }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorited(!isFavorited);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(price);
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'catering': return '🍽️';
            case 'decoracion': return '🎨';
            case 'musica': return '🎵';
            case 'fotografia': return '📸';
            case 'video': return '🎬';
            case 'flores': return '🌸';
            case 'transportacion': return '🚗';
            case 'alojamiento': return '🏨';
            case 'entretenimiento': return '🎪';
            case 'seguridad': return '🛡️';
            case 'limpieza': return '🧹';
            case 'planificacion': return '📋';
            default: return '🎉';
        }
    };

    const getCategoryLabel = (category) => {
        const labels = {
            catering: 'Catering',
            decoracion: 'Decoración',
            musica: 'Música',
            fotografia: 'Fotografía',
            video: 'Video',
            flores: 'Flores',
            transportacion: 'Transportación',
            alojamiento: 'Alojamiento',
            entretenimiento: 'Entretenimiento',
            seguridad: 'Seguridad',
            limpieza: 'Limpieza',
            planificacion: 'Planificación',
            otros: 'Otros'
        };
        return labels[category] || category;
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <StarSolidIcon key={i} className="w-4 h-4 text-warning-400" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <StarSolidIcon key="half" className="w-4 h-4 text-warning-400 opacity-50" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <StarIcon key={`empty-${i}`} className="w-4 h-4 text-secondary-300" />
            );
        }

        return stars;
    };

    return (
        <motion.div
            className={`card group hover:shadow-large transition-all duration-300 ${className}`}
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Imagen del Proveedor */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                {provider.portfolio && provider.portfolio.length > 0 && !imageError ? (
                    <img
                        src={provider.portfolio[0].imageUrl}
                        alt={provider.businessName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <div className="text-6xl opacity-50">
                            {getCategoryIcon(provider.category)}
                        </div>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="badge-primary text-xs">
                        {getCategoryIcon(provider.category)} {getCategoryLabel(provider.category)}
                    </span>
                    {provider.isVerified && (
                        <span className="badge-success text-xs flex items-center gap-1">
                            <CheckBadgeIcon className="w-3 h-3" />
                            Verificado
                        </span>
                    )}
                </div>

                {/* Botón de favorito */}
                <button
                    onClick={handleFavorite}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                    {isFavorited ? (
                        <HeartIcon className="w-5 h-5 text-danger-500 fill-current" />
                    ) : (
                        <HeartIcon className="w-5 h-5 text-secondary-400" />
                    )}
                </button>

                {/* Precio */}
                <div className="absolute bottom-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-secondary-900">
                            {formatPrice(provider.pricing?.basePrice || 0)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Contenido de la Card */}
            <div className="card-body">
                {/* Nombre y Rating */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-secondary-900 mb-1 line-clamp-1">
                            {provider.businessName}
                        </h3>
                        {provider.rating && (
                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {renderStars(provider.rating.average)}
                                </div>
                                <span className="text-sm text-secondary-500 ml-1">
                                    ({provider.rating.totalReviews})
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Descripción */}
                <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
                    {provider.description}
                </p>

                {/* Ubicación */}
                {provider.location && (
                    <div className="flex items-center gap-2 mb-4">
                        <MapPinIcon className="w-4 h-4 text-secondary-400" />
                        <span className="text-sm text-secondary-500">
                            {provider.location.city}, {provider.location.state}
                        </span>
                    </div>
                )}

                {/* Servicios destacados */}
                {provider.services && provider.services.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                            {provider.services.slice(0, 3).map((service, index) => (
                                <span key={index} className="badge-secondary text-xs">
                                    {service.name}
                                </span>
                            ))}
                            {provider.services.length > 3 && (
                                <span className="badge-secondary text-xs">
                                    +{provider.services.length - 3} más
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Información de contacto */}
                <div className="flex items-center gap-4 mb-4 text-xs text-secondary-500">
                    {provider.contact?.phone && (
                        <div className="flex items-center gap-1">
                            <PhoneIcon className="w-3 h-3" />
                            <span>Teléfono</span>
                        </div>
                    )}
                    {provider.contact?.email && (
                        <div className="flex items-center gap-1">
                            <EnvelopeIcon className="w-3 h-3" />
                            <span>Email</span>
                        </div>
                    )}
                </div>

                {/* Acciones */}
                {showActions && (
                    <div className="flex gap-2">
                        <Link
                            to={`/providers/${provider._id}`}
                            className="btn-primary flex-1 text-center"
                        >
                            <EyeIcon className="w-4 h-4 mr-2" />
                            Ver Detalles
                        </Link>
                        <Link
                            to={`/providers/${provider._id}/contact`}
                            className="btn-outline btn-sm"
                        >
                            Contactar
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProviderCard;