import React, { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon, CloudArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline';

const ImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 5,
  accept = "image/*",
  showPreview = true,
  showCategories = false,
  category = 'work'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Simular subida de imagen (en producción sería una llamada real a la API)
  const uploadImage = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular URL de imagen subida
        const imageUrl = URL.createObjectURL(file);
        resolve({
          url: imageUrl,
          alt: file.name,
          isMain: images.length === 0, // La primera imagen es la principal
          uploadedAt: new Date().toISOString()
        });
      }, 1000);
    });
  };

  const handleFiles = async (files) => {
    if (images.length + files.length > maxImages) {
      alert(`No puedes subir más de ${maxImages} imágenes`);
      return;
    }

    setUploading(true);
    try {
      const newImages = [];

      for (let file of files) {
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          alert(`El archivo ${file.name} no es una imagen válida`);
          continue;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`El archivo ${file.name} es demasiado grande. Máximo 5MB`);
          continue;
        }

        const uploadedImage = await uploadImage(file);
        newImages.push(uploadedImage);
      }

      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error('Error subiendo imágenes:', error);
      alert('Error al subir las imágenes');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);

    // Si se eliminó la imagen principal, hacer la primera imagen principal
    if (images[index]?.isMain && newImages.length > 0) {
      newImages[0].isMain = true;
    }

    onImagesChange(newImages);
  };

  const setMainImage = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    onImagesChange(newImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Zona de subida */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive
          ? 'border-primary-500 bg-primary-50'
          : 'border-secondary-300 hover:border-secondary-400'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="space-y-2">
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-secondary-400" />
          <div className="text-sm text-secondary-600">
            <button
              type="button"
              onClick={openFileDialog}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Haz clic para subir
            </button>
            {' '}o arrastra y suelta
          </div>
          <p className="text-xs text-secondary-500">
            PNG, JPG, GIF hasta 5MB cada una (máximo {maxImages} imágenes)
          </p>
          {images.length > 0 && (
            <p className="text-xs text-secondary-500">
              {images.length} de {maxImages} imágenes subidas
            </p>
          )}
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-primary-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              <span className="text-sm">Subiendo...</span>
            </div>
          </div>
        )}
      </div>

      {/* Vista previa de imágenes */}
      {showPreview && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary-100">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay con acciones */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  {!image.isMain && (
                    <button
                      onClick={() => setMainImage(index)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-secondary-50 transition-colors"
                      title="Marcar como principal"
                    >
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={() => removeImage(index)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    title="Eliminar imagen"
                  >
                    <XMarkIcon className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Badge de imagen principal */}
              {image.isMain && (
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Principal
                  </span>
                </div>
              )}

              {/* Información de la imagen */}
              <div className="mt-2 space-y-1">
                <p className="text-xs text-secondary-600 truncate">
                  {image.alt || `Imagen ${index + 1}`}
                </p>
                <p className="text-xs text-secondary-400">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
