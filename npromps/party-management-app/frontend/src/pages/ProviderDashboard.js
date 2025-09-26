import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  PhotoIcon,
  TagIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalViews: 0,
    totalRequests: 0
  });

  // Datos de ejemplo - en producción vendrían del backend
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Paquete Básico de Catering',
        category: 'catering',
        price: 15000,
        description: 'Servicio completo de catering para 50 personas',
        images: ['/images/catering1.jpg'],
        isActive: true,
        views: 45,
        requests: 3,
        rating: 4.8,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'Decoración Floral Premium',
        category: 'flores',
        price: 8000,
        description: 'Arreglos florales elegantes para bodas',
        images: ['/images/flores1.jpg'],
        isActive: true,
        views: 32,
        requests: 2,
        rating: 4.9,
        createdAt: '2024-01-20'
      },
      {
        id: 3,
        name: 'Servicio de Fotografía',
        category: 'fotografia',
        price: 12000,
        description: 'Sesión completa de fotografía para eventos',
        images: ['/images/foto1.jpg'],
        isActive: false,
        views: 28,
        requests: 1,
        rating: 4.7,
        createdAt: '2024-01-25'
      }
    ];

    setProducts(mockProducts);
    setStats({
      totalProducts: mockProducts.length,
      activeProducts: mockProducts.filter(p => p.isActive).length,
      totalViews: mockProducts.reduce((sum, p) => sum + p.views, 0),
      totalRequests: mockProducts.reduce((sum, p) => sum + p.requests, 0)
    });
    setLoading(false);
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      catering: UserGroupIcon,
      decoracion: TagIcon,
      musica: ChartBarIcon,
      fotografia: PhotoIcon,
      video: PhotoIcon,
      flores: TagIcon,
      transportacion: BuildingOfficeIcon,
      alojamiento: BuildingOfficeIcon,
      entretenimiento: UserGroupIcon,
      seguridad: BuildingOfficeIcon,
      limpieza: BuildingOfficeIcon,
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
    return labels[category] || 'Otros';
  };

  const getCategoryColor = (category) => {
    const colors = {
      catering: 'bg-green-100 text-green-800',
      decoracion: 'bg-pink-100 text-pink-800',
      musica: 'bg-purple-100 text-purple-800',
      fotografia: 'bg-blue-100 text-blue-800',
      video: 'bg-indigo-100 text-indigo-800',
      flores: 'bg-yellow-100 text-yellow-800',
      transportacion: 'bg-gray-100 text-gray-800',
      alojamiento: 'bg-orange-100 text-orange-800',
      entretenimiento: 'bg-red-100 text-red-800',
      seguridad: 'bg-slate-100 text-slate-800',
      limpieza: 'bg-cyan-100 text-cyan-800',
      planificacion: 'bg-emerald-100 text-emerald-800',
      otros: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  const handleToggleProduct = (productId) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, isActive: !product.isActive }
        : product
    ));
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="container-elegant">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Mi Panel de Proveedor</h1>
              <p className="text-secondary-600 mt-2">Gestiona tus productos y servicios</p>
            </div>
            <Link
              to="/provider/products/create"
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Nuevo Producto</span>
            </Link>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Productos</p>
                <p className="text-3xl font-bold text-secondary-900">{stats.totalProducts}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <TagIcon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Activos</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeProducts}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Visualizaciones</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalViews}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <EyeIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Solicitudes</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalRequests}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <UserGroupIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 overflow-hidden">
          <div className="p-6 border-b border-secondary-100">
            <h2 className="text-xl font-semibold text-secondary-900">Mis Productos</h2>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <TagIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                No tienes productos aún
              </h3>
              <p className="text-secondary-500 mb-6">
                Comienza agregando tu primer producto o servicio
              </p>
              <Link
                to="/provider/products/create"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Crear mi primer producto</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-secondary-100">
              {products.map((product) => {
                const IconComponent = getCategoryIcon(product.category);

                return (
                  <div key={product.id} className="p-6 hover:bg-secondary-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-secondary-100 rounded-xl flex items-center justify-center">
                            <IconComponent className="w-8 h-8 text-secondary-600" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-secondary-900">
                              {product.name}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(product.category)}`}>
                              {getCategoryLabel(product.category)}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                              }`}>
                              {product.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>

                          <p className="text-secondary-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center space-x-6 text-sm text-secondary-500">
                            <div className="flex items-center space-x-1">
                              <CurrencyDollarIcon className="w-4 h-4" />
                              <span>{formatPrice(product.price)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <EyeIcon className="w-4 h-4" />
                              <span>{product.views} vistas</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <UserGroupIcon className="w-4 h-4" />
                              <span>{product.requests} solicitudes</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <StarIcon className="w-4 h-4 text-yellow-500" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleProduct(product.id)}
                          className={`p-2 rounded-xl transition-colors ${product.isActive
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-green-600 hover:bg-green-50'
                            }`}
                          title={product.isActive ? 'Desactivar' : 'Activar'}
                        >
                          {product.isActive ? (
                            <XCircleIcon className="w-5 h-5" />
                          ) : (
                            <CheckCircleIcon className="w-5 h-5" />
                          )}
                        </button>

                        <button className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                          <EyeIcon className="w-5 h-5" />
                        </button>

                        <button className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-xl transition-colors">
                          <PencilIcon className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-secondary-400 hover:text-danger-600 hover:bg-danger-50 rounded-xl transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Información del Negocio */}
        <div className="mt-8 bg-white rounded-2xl shadow-soft border border-secondary-100 p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Información del Negocio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-secondary-900 mb-2">Datos de Contacto</h4>
              <div className="space-y-2 text-sm text-secondary-600">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="w-4 h-4" />
                  <span>+52 55 1234 5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>contacto@miempresa.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GlobeAltIcon className="w-4 h-4" />
                  <span>www.miempresa.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-secondary-900 mb-2">Ubicación</h4>
              <div className="space-y-2 text-sm text-secondary-600">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>Ciudad de México, CDMX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4" />
                  <span>Lun - Vie: 9:00 - 18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
