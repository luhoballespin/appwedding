import Joi from 'joi';

// Esquema para crear evento
export const createEventSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'El título debe tener al menos 3 caracteres',
      'string.max': 'El título no puede tener más de 100 caracteres',
      'any.required': 'El título es requerido'
    }),

  description: Joi.string()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'La descripción no puede tener más de 1000 caracteres'
    }),

  eventType: Joi.string()
    .valid('boda', 'cumpleanos', 'corporativo', 'social', 'religioso', 'deportivo', 'cultural', 'otro')
    .required()
    .messages({
      'any.only': 'El tipo de evento debe ser uno de: boda, cumpleanos, corporativo, social, religioso, deportivo, cultural, otro',
      'any.required': 'El tipo de evento es requerido'
    }),

  date: Joi.date()
    .min('now')
    .required()
    .messages({
      'date.min': 'La fecha del evento debe ser en el futuro',
      'any.required': 'La fecha del evento es requerida'
    }),

  startTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .messages({
      'string.pattern.base': 'La hora de inicio debe estar en formato HH:MM'
    }),

  endTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional()
    .messages({
      'string.pattern.base': 'La hora de fin debe estar en formato HH:MM'
    }),

  location: Joi.object({
    venue: Joi.string()
      .max(200)
      .optional()
      .messages({
        'string.max': 'El nombre del lugar no puede tener más de 200 caracteres'
      }),

    address: Joi.string()
      .max(300)
      .optional()
      .messages({
        'string.max': 'La dirección no puede tener más de 300 caracteres'
      }),

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

    coordinates: Joi.object({
      latitude: Joi.number()
        .min(-90)
        .max(90)
        .optional(),
      longitude: Joi.number()
        .min(-180)
        .max(180)
        .optional()
    }).optional()
  }).required(),

  guestCount: Joi.object({
    expected: Joi.number()
      .min(1)
      .max(10000)
      .required()
      .messages({
        'number.min': 'El número de invitados esperados debe ser al menos 1',
        'number.max': 'El número de invitados esperados no puede ser más de 10000',
        'any.required': 'El número de invitados esperados es requerido'
      }),

    confirmed: Joi.number()
      .min(0)
      .max(10000)
      .default(0)
      .optional()
  }).required(),

  budget: Joi.object({
    total: Joi.number()
      .min(0)
      .optional(),

    currency: Joi.string()
      .valid('MXN', 'USD', 'EUR')
      .default('MXN')
      .optional(),

    breakdown: Joi.object({
      venue: Joi.number().min(0).optional(),
      catering: Joi.number().min(0).optional(),
      decoration: Joi.number().min(0).optional(),
      music: Joi.number().min(0).optional(),
      photography: Joi.number().min(0).optional(),
      other: Joi.number().min(0).optional()
    }).optional()
  }).optional(),

  status: Joi.string()
    .valid('planning', 'confirmed', 'in_progress', 'completed', 'cancelled')
    .default('planning')
    .optional(),

  isPrivate: Joi.boolean()
    .default(false)
    .optional(),

  tags: Joi.array()
    .items(Joi.string().max(50))
    .max(10)
    .optional()
    .messages({
      'array.max': 'No se pueden tener más de 10 etiquetas'
    })
});

// Esquema para actualizar evento
export const updateEventSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .optional(),

  description: Joi.string()
    .max(1000)
    .optional(),

  eventType: Joi.string()
    .valid('boda', 'cumpleanos', 'corporativo', 'social', 'religioso', 'deportivo', 'cultural', 'otro')
    .optional(),

  date: Joi.date()
    .min('now')
    .optional(),

  startTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),

  endTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),

  location: Joi.object({
    venue: Joi.string().max(200).optional(),
    address: Joi.string().max(300).optional(),
    city: Joi.string().max(100).optional(),
    state: Joi.string().max(100).optional(),
    zipCode: Joi.string().max(20).optional(),
    coordinates: Joi.object({
      latitude: Joi.number().min(-90).max(90).optional(),
      longitude: Joi.number().min(-180).max(180).optional()
    }).optional()
  }).optional(),

  guestCount: Joi.object({
    expected: Joi.number().min(1).max(10000).optional(),
    confirmed: Joi.number().min(0).max(10000).optional()
  }).optional(),

  budget: Joi.object({
    total: Joi.number().min(0).optional(),
    currency: Joi.string().valid('MXN', 'USD', 'EUR').optional(),
    breakdown: Joi.object({
      venue: Joi.number().min(0).optional(),
      catering: Joi.number().min(0).optional(),
      decoration: Joi.number().min(0).optional(),
      music: Joi.number().min(0).optional(),
      photography: Joi.number().min(0).optional(),
      other: Joi.number().min(0).optional()
    }).optional()
  }).optional(),

  status: Joi.string()
    .valid('planning', 'confirmed', 'in_progress', 'completed', 'cancelled')
    .optional(),

  isPrivate: Joi.boolean().optional(),

  tags: Joi.array()
    .items(Joi.string().max(50))
    .max(10)
    .optional()
});

// Esquema para agregar invitado
export const addGuestSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'El nombre del invitado debe tener al menos 2 caracteres',
      'string.max': 'El nombre del invitado no puede tener más de 100 caracteres',
      'any.required': 'El nombre del invitado es requerido'
    }),

  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.email': 'Debe proporcionar un email válido'
    }),

  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional(),

  status: Joi.string()
    .valid('pending', 'confirmed', 'declined', 'maybe')
    .default('pending')
    .optional(),

  plusOne: Joi.boolean()
    .default(false)
    .optional(),

  dietaryRestrictions: Joi.string()
    .max(500)
    .optional(),

  notes: Joi.string()
    .max(1000)
    .optional()
});

// Esquema para agregar tarea al checklist
export const addChecklistItemSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.min': 'El título de la tarea debe tener al menos 3 caracteres',
      'string.max': 'El título de la tarea no puede tener más de 200 caracteres',
      'any.required': 'El título de la tarea es requerido'
    }),

  description: Joi.string()
    .max(1000)
    .optional(),

  category: Joi.string()
    .valid('planning', 'logistics', 'decoration', 'catering', 'music', 'photography', 'other')
    .default('planning')
    .optional(),

  priority: Joi.string()
    .valid('low', 'medium', 'high', 'urgent')
    .default('medium')
    .optional(),

  dueDate: Joi.date()
    .min('now')
    .optional(),

  assignedTo: Joi.string()
    .optional()
});

// Esquema para agregar proveedor
export const addProviderSchema = Joi.object({
  providerId: Joi.string()
    .required()
    .messages({
      'any.required': 'El ID del proveedor es requerido'
    }),

  service: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'El nombre del servicio debe tener al menos 3 caracteres',
      'string.max': 'El nombre del servicio no puede tener más de 100 caracteres',
      'any.required': 'El nombre del servicio es requerido'
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.min': 'El precio debe ser mayor o igual a 0',
      'any.required': 'El precio es requerido'
    }),

  notes: Joi.string()
    .max(1000)
    .optional()
});