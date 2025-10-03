import React, { useState } from 'react';
import {
  PhotoIcon,
  PlusIcon,
  TrashIcon,
  StarIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import ImageUpload from './ImageUpload';

const ProviderImageManager = ({
  provider,
  onUpdateProvider,
  isEditing = false
}) => {
  const [activeTab, setActiveTab] = useState('main');
  const [selectedImage, setSelectedImage] = useState(null);

  const tabs = [
    { id: 'main', name: 'Imágenes Principales', count: provider?.images?.length || 0 },
    { id: 'portfolio', name: 'Portfolio', count: provider?.portfolio?.length || 0 },
    { id: 'services', name: 'Imágenes de Servicios', count: getServiceImagesCount() }
  ];

  function getServiceImagesCount() {
    if (!provider?.services) return 0;
    return provider.services.reduce((total, service) => {
      return total + (service.images?.length || 0);
    }, 0);
  }

  const handleMainImagesChange = (newImages) => {
    onUpdateProvider({
      ...provider,
      images: newImages
    });
  };

  const handlePortfolioChange = (newPortfolio) => {
    onUpdateProvider({
      ...provider,
      portfolio: newPortfolio
    });
  };

  const handleServiceImagesChange = (serviceIndex, newImages) => {
    const updatedServices = [...provider.services];
    updatedServices[serviceIndex] = {
      ...updatedServices[serviceIndex],
      images: newImages
    };

    onUpdateProvider({
      ...provider,
      services: updatedServices
    });
  };

  const setMainImage = (imageIndex) => {
    const newImages = provider.images.map((img, index) => ({
      ...img,
      isMain: index === imageIndex
    }));
    handleMainImagesChange(newImages);
  };

  const removeMainImage = (imageIndex) => {
    const newImages = provider.images.filter((_, index) => index !== imageIndex);
    // Si se eliminó la imagen principal, hacer la primera imagen principal
    if (provider.images[imageIndex]?.isMain && newImages.length > 0) {
      newImages[0].isMain = true;
    }
    handleMainImagesChange(newImages);
  };

  const removePortfolioImage = (imageIndex) => {
    const newPortfolio = provider.portfolio.filter((_, index) => index !== imageIndex);
    handlePortfolioChange(newPortfolio);
  };

  const removeServiceImage = (serviceIndex, imageIndex) => {
    const service = provider.services[serviceIndex];
    const newImages = service.images.filter((_, index) => index !== imageIndex);

    // Si se eliminó la imagen principal, hacer la primera imagen principal
    if (service.images[imageIndex]?.isMain && newImages.length > 0) {
      newImages[0].isMain = true;
    }

    handleServiceImagesChange(serviceIndex, newImages);
  };

  const setMainServiceImage = (serviceIndex, imageIndex) => {
    const service = provider.services[serviceIndex];
    const newImages = service.images.map((img, index) => ({
      ...img,
      isMain: index === imageIndex
    }));
    handleServiceImagesChange(serviceIndex, newImages);
  };

  const renderMainImages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">Imágenes Principales</h3>
          <p className="text-sm text-secondary-600">
            Estas imágenes aparecerán en tu perfil y en las tarjetas de búsqueda
          </p>
        </div>
        {isEditing && (
          <span className="text-sm text-secondary-500">
            {provider?.images?.length || 0} de 10 imágenes
          </span>
        )}
      </div>

      {isEditing ? (
        <ImageUpload
          images={provider?.images || []}
          onImagesChange={handleMainImagesChange}
          maxImages={10}
          showPreview={true}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {provider?.images?.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary-100">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              </div>

              {image.isMain && (
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    <StarSolidIcon className="w-3 h-3 mr-1" />
                    Principal
                  </span>
                </div>
              )}

              <div className="mt-2">
                <p className="text-xs text-secondary-600 truncate">
                  {image.alt || `Imagen ${index + 1}`}
                </p>
              </div>
            </div>
          )) || (
              <div className="col-span-full text-center py-8 text-secondary-500">
                <PhotoIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay imágenes principales</p>
              </div>
            )}
        </div>
      )}
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">Portfolio</h3>
          <p className="text-sm text-secondary-600">
            Galería extendida de tu trabajo y proyectos
          </p>
        </div>
        {isEditing && (
          <span className="text-sm text-secondary-500">
            {provider?.portfolio?.length || 0} de 50 imágenes
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {provider?.portfolio?.map((item, index) => (
          <div key={index} className="bg-white rounded-lg border border-secondary-200 overflow-hidden">
            <div className="aspect-video bg-secondary-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setSelectedImage(item)}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-secondary-900 truncate">
                  {item.title || `Proyecto ${index + 1}`}
                </h4>
                <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-600 rounded-full">
                  {item.category}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-secondary-600 line-clamp-2">
                  {item.description}
                </p>
              )}
              {isEditing && (
                <button
                  onClick={() => removePortfolioImage(index)}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        )) || (
            <div className="col-span-full text-center py-8 text-secondary-500">
              <PhotoIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No hay elementos en el portfolio</p>
            </div>
          )}
      </div>
    </div>
  );

  const renderServiceImages = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-secondary-900">Imágenes de Servicios</h3>
        <p className="text-sm text-secondary-600">
          Imágenes específicas para cada servicio que ofreces
        </p>
      </div>

      {provider?.services?.map((service, serviceIndex) => (
        <div key={serviceIndex} className="bg-white rounded-lg border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-secondary-900">{service.name}</h4>
              <p className="text-sm text-secondary-600">
                {service.images?.length || 0} imágenes
              </p>
            </div>
            {isEditing && (
              <span className="text-sm text-secondary-500">
                {service.images?.length || 0} de 5 imágenes
              </span>
            )}
          </div>

          {isEditing ? (
            <ImageUpload
              images={service.images || []}
              onImagesChange={(newImages) => handleServiceImagesChange(serviceIndex, newImages)}
              maxImages={5}
              showPreview={true}
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {service.images?.map((image, imageIndex) => (
                <div key={imageIndex} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-secondary-100">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    />
                  </div>

                  {image.isMain && (
                    <div className="absolute top-1 left-1">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        <StarSolidIcon className="w-2.5 h-2.5 mr-0.5" />
                        Principal
                      </span>
                    </div>
                  )}

                  <div className="mt-1">
                    <p className="text-xs text-secondary-600 truncate">
                      {image.alt || `Imagen ${imageIndex + 1}`}
                    </p>
                  </div>
                </div>
              )) || (
                  <div className="col-span-full text-center py-4 text-secondary-500">
                    <PhotoIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <p className="text-xs">Sin imágenes</p>
                  </div>
                )}
            </div>
          )}
        </div>
      )) || (
          <div className="text-center py-8 text-secondary-500">
            <PhotoIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay servicios con imágenes</p>
          </div>
        )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tabs de navegación */}
      <div className="border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
            >
              {tab.name}
              {tab.count > 0 && (
                <span className="ml-2 bg-secondary-100 text-secondary-900 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de las tabs */}
      <div>
        {activeTab === 'main' && renderMainImages()}
        {activeTab === 'portfolio' && renderPortfolio()}
        {activeTab === 'services' && renderServiceImages()}
      </div>

      {/* Modal de vista previa */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={selectedImage.url || selectedImage.imageUrl}
                alt={selectedImage.alt || selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            {(selectedImage.alt || selectedImage.title) && (
              <div className="p-4 bg-white border-t">
                <h3 className="font-semibold text-secondary-900">
                  {selectedImage.title || selectedImage.alt}
                </h3>
                {selectedImage.description && (
                  <p className="text-sm text-secondary-600 mt-1">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderImageManager;
