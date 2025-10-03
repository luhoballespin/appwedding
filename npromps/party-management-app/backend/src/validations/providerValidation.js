import Joi from 'joi';

// Esquema para crear proveedor
export const createProviderSchema = Joi.object({
  businessName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'El nombre del negocio debe tener al menos 3 caracteres',
      'string.max': 'El nombre del negocio no puede tener más de 100 caracteres',
      'any.required': 'El nombre del negocio es requerido'
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.min': 'La descripción debe tener al menos 10 caracteres',
      'string.max': 'La descripción no puede tener más de 1000 caracteres',
      'any.required': 'La descripción es requerida'
    }),

  category: Joi.string()
    .valid('catering', 'decoracion', 'musica', 'fotografia', 'video', 'flores', 'transportacion', 'alojamiento', 'entretenimiento', 'seguridad', 'limpieza', 'planificacion', 'otros')
    .required()
    .messages({
      'any.only': 'La categoría debe ser una de las opciones válidas',
      'any.required': 'La categoría es requerida'
    }),

  services: Joi.array()
    .items(Joi.object({
      name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
          'string.min': 'El nombre del servicio debe tener al menos 3 caracteres',
          'string.max': 'El nombre del servicio no puede tener más de 100 caracteres',
          'any.required': 'El nombre del servicio es requerido'
        }),
      description: Joi.string()
        .max(500)
        .optional()
        .messages({
          'string.max': 'La descripción del servicio no puede tener más de 500 caracteres'
        }),
      basePrice: Joi.number()
        .min(0)
        .optional()
        .messages({
          'number.min': 'El precio base debe ser mayor o igual a 0'
        }),
      currency: Joi.string()
        .valid('USD', 'EUR', 'ARS', 'MXN')
        .default('USD'),
      pricingType: Joi.string()
        .valid('fixed', 'hourly', 'per_person', 'per_item')
        .default('fixed'),
      hourlyRate: Joi.number()
        .min(0)
        .optional()
        .messages({
          'number.min': 'La tarifa por hora debe ser mayor o igual a 0'
        }),
      minimumHours: Joi.number()
        .min(0)
        .default(0)
        .messages({
          'number.min': 'Las horas mínimas deben ser mayor o igual a 0'
        }),
      maximumHours: Joi.number()
        .min(0)
        .optional()
        .messages({
          'number.min': 'Las horas máximas deben ser mayor o igual a 0'
        }),
      // Imágenes específicas del servicio
      images: Joi.array()
        .items(Joi.object({
          url: Joi.string()
            .uri()
            .required()
            .messages({
              'string.uri': 'La URL de la imagen del servicio debe ser válida',
              'any.required': 'La URL de la imagen del servicio es requerida'
            }),
          alt: Joi.string()
            .max(100)
            .optional(),
          isMain: Joi.boolean()
            .default(false),
          uploadedAt: Joi.date()
            .default(Date.now)
        }))
        .max(5)
        .optional()
        .messages({
          'array.max': 'No se pueden tener más de 5 imágenes por servicio'
        }),
      isActive: Joi.boolean()
        .default(true)
    }))
    .min(1)
    .required()
    .messages({
      'array.min': 'Debe proporcionar al menos un servicio',
      'any.required': 'Los servicios son requeridos'
    }),

  pricing: Joi.object({
    basePrice: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.min': 'El precio base debe ser mayor o igual a 0',
        'any.required': 'El precio base es requerido'
      }),

    currency: Joi.string()
      .valid('MXN', 'USD', 'EUR')
      .default('MXN')
      .optional(),

    pricingType: Joi.string()
      .valid('fixed', 'per_hour', 'per_person', 'custom')
      .default('fixed')
      .optional(),

    customPricing: Joi.object({
      minPrice: Joi.number().min(0).optional(),
      maxPrice: Joi.number().min(0).optional(),
      pricePerHour: Joi.number().min(0).optional(),
      pricePerPerson: Joi.number().min(0).optional()
    }).optional()
  }).required(),

  location: Joi.object({
    address: Joi.string()
      .max(300)
      .optional(),

    city: Joi.string()
      .max(100)
      .required()
      .messages({
        'string.max': 'La ciudad no puede tener más de 100 caracteres',
        'any.required': 'La ciudad es requerida'
      }),

    state: Joi.string()
      .max(100)
      .required()
      .messages({
        'string.max': 'El estado no puede tener más de 100 caracteres',
        'any.required': 'El estado es requerido'
      }),

    zipCode: Joi.string()
      .max(20)
      .optional(),

    serviceArea: Joi.array()
      .items(Joi.string())
      .optional()
  }).required(),

  contact: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        'string.pattern.base': 'Debe proporcionar un número de teléfono válido',
        'any.required': 'El teléfono es requerido'
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Debe proporcionar un email válido',
        'any.required': 'El email es requerido'
      }),

    website: Joi.string()
      .uri()
      .optional()
      .messages({
        'string.uri': 'El sitio web debe ser una URL válida'
      }),

    socialMedia: Joi.object({
      facebook: Joi.string().uri().optional(),
      instagram: Joi.string().uri().optional(),
      twitter: Joi.string().uri().optional()
    }).optional()
  }).required(),

  // Imágenes principales del proveedor
  images: Joi.array()
    .items(Joi.object({
      url: Joi.string()
        .uri()
        .required()
        .messages({
          'string.uri': 'La URL de la imagen debe ser válida',
          'any.required': 'La URL de la imagen es requerida'
        }),
      alt: Joi.string()
        .max(100)
        .optional(),
      isMain: Joi.boolean()
        .default(false),
      uploadedAt: Joi.date()
        .default(Date.now)
    }))
    .max(10)
    .optional()
    .messages({
      'array.max': 'No se pueden tener más de 10 imágenes principales'
    }),

  // Portfolio extendido del proveedor
  portfolio: Joi.array()
    .items(Joi.object({
      imageUrl: Joi.string()
        .uri()
        .required()
        .messages({
          'string.uri': 'La URL de la imagen del portfolio debe ser válida',
          'any.required': 'La URL de la imagen del portfolio es requerida'
        }),
      title: Joi.string()
        .max(100)
        .optional(),
      description: Joi.string()
        .max(500)
        .optional(),
      category: Joi.string()
        .valid('work', 'setup', 'event', 'product', 'team', 'other')
        .default('work'),
      uploadedAt: Joi.date()
        .default(Date.now)
    }))
    .max(50)
    .optional()
    .messages({
      'array.max': 'No se pueden tener más de 50 imágenes en el portfolio'
    }),

  availability: Joi.object({
    schedule: Joi.object({
      monday: Joi.object({
        available: Joi.boolean().default(true),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
      }).optional(),
      tuesday: Joi.object({
        available: Joi.boolean().default(true),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
      }).optional(),
      wednesday: Joi.object({
        available: Joi.boolean().default(true),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
      }).optional(),
      thursday: Joi.object({
        available: Joi.boolean().default(true),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
      }).optional(),
      friday: Joi.object({
        available: Joi.boolean().default(true),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
      }).optional(),
      saturday: Joi.object({
        available: Joi.boolean().default(true),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
      }).optional(),
      sunday: Joi.object({
        available: Joi.boolean().default(true),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
      }).optional()
    }).optional(),

    blackoutDates: Joi.array()
      .items(Joi.date())
      .optional()
  }).optional(),

  certifications: Joi.array()
    .items(Joi.object({
      name: Joi.string()
        .max(200)
        .required(),
      issuer: Joi.string()
        .max(200)
        .optional(),
      date: Joi.date()
        .optional(),
      expiryDate: Joi.date()
        .optional()
    }))
    .optional(),

  isVerified: Joi.boolean()
    .default(false)
    .optional(),

  isActive: Joi.boolean()
    .default(true)
    .optional()
});

// Esquema para actualizar proveedor
export const updateProviderSchema = Joi.object({
  businessName: Joi.string()
    .min(3)
    .max(100)
    .optional(),

  description: Joi.string()
    .min(10)
    .max(1000)
    .optional(),

  category: Joi.string()
    .valid('catering', 'decoracion', 'musica', 'fotografia', 'video', 'flores', 'transportacion', 'alojamiento', 'entretenimiento', 'seguridad', 'limpieza', 'planificacion', 'otros')
    .optional(),

  services: Joi.array()
    .items(Joi.object({
      name: Joi.string().min(3).max(100).required(),
      description: Joi.string().max(500).optional(),
      price: Joi.number().min(0).optional()
    }))
    .min(1)
    .optional(),

  pricing: Joi.object({
    basePrice: Joi.number().min(0).optional(),
    currency: Joi.string().valid('MXN', 'USD', 'EUR').optional(),
    pricingType: Joi.string().valid('fixed', 'per_hour', 'per_person', 'custom').optional(),
    customPricing: Joi.object({
      minPrice: Joi.number().min(0).optional(),
      maxPrice: Joi.number().min(0).optional(),
      pricePerHour: Joi.number().min(0).optional(),
      pricePerPerson: Joi.number().min(0).optional()
    }).optional()
  }).optional(),

  location: Joi.object({
    address: Joi.string().max(300).optional(),
    city: Joi.string().max(100).optional(),
    state: Joi.string().max(100).optional(),
    zipCode: Joi.string().max(20).optional(),
    serviceArea: Joi.array().items(Joi.string()).optional()
  }).optional(),

  contact: Joi.object({
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
    email: Joi.string().email().optional(),
    website: Joi.string().uri().optional(),
    socialMedia: Joi.object({
      facebook: Joi.string().uri().optional(),
      instagram: Joi.string().uri().optional(),
      twitter: Joi.string().uri().optional()
    }).optional()
  }).optional(),

  portfolio: Joi.array()
    .items(Joi.object({
      imageUrl: Joi.string().uri().required(),
      title: Joi.string().max(100).optional(),
      description: Joi.string().max(500).optional()
    }))
    .max(20)
    .optional(),

  availability: Joi.object({
    schedule: Joi.object().optional(),
    blackoutDates: Joi.array().items(Joi.date()).optional()
  }).optional(),

  certifications: Joi.array()
    .items(Joi.object({
      name: Joi.string().max(200).required(),
      issuer: Joi.string().max(200).optional(),
      date: Joi.date().optional(),
      expiryDate: Joi.date().optional()
    }))
    .optional(),

  isActive: Joi.boolean().optional()
});