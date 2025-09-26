import Joi from 'joi';

// Esquema para registro de usuario (simplificado para desarrollo)
export const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
      'string.max': 'El nombre de usuario no puede tener más de 30 caracteres',
      'any.required': 'El nombre de usuario es requerido'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Debe proporcionar un email válido',
      'any.required': 'El email es requerido'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'La contraseña es requerida'
    }),

  firstName: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede tener más de 50 caracteres'
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'El apellido debe tener al menos 2 caracteres',
      'string.max': 'El apellido no puede tener más de 50 caracteres'
    }),

  phone: Joi.string()
    .optional()
    .messages({
      'string.base': 'El teléfono debe ser una cadena de texto'
    }),

  role: Joi.string()
    .valid('cumpleañero', 'planeador_bodas', 'organizador', 'proveedor', 'admin')
    .default('cumpleañero')
    .messages({
      'any.only': 'El rol debe ser uno de: cumpleañero, planeador_bodas, organizador, proveedor, admin'
    }),

  birthDate: Joi.date()
    .max('now')
    .optional()
    .messages({
      'date.max': 'La fecha de nacimiento no puede ser en el futuro'
    }),

  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional(),

  preferences: Joi.object({
    language: Joi.string().valid('es', 'en').default('es'),
    notifications: Joi.boolean().default(true),
    theme: Joi.string().valid('light', 'dark').default('light')
  }).optional()
});

// Esquema para login
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Debe proporcionar un email válido',
      'any.required': 'El email es requerido'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'La contraseña es requerida'
    })
});

// Esquema para actualizar usuario
export const updateUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email()
    .optional(),

  firstName: Joi.string()
    .min(2)
    .max(50)
    .optional(),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .optional(),

  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional(),

  birthDate: Joi.date()
    .max('now')
    .optional(),

  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional(),

  preferences: Joi.object({
    language: Joi.string().valid('es', 'en'),
    notifications: Joi.boolean(),
    theme: Joi.string().valid('light', 'dark')
  }).optional(),

  bio: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.max': 'La biografía no puede tener más de 500 caracteres'
    }),

  avatar: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'El avatar debe ser una URL válida'
    })
});

// Esquema para cambio de contraseña
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'La contraseña actual es requerida'
    }),

  newPassword: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
    .required()
    .messages({
      'string.min': 'La nueva contraseña debe tener al menos 8 caracteres',
      'string.pattern.base': 'La nueva contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial',
      'any.required': 'La nueva contraseña es requerida'
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Las contraseñas no coinciden',
      'any.required': 'Debe confirmar la nueva contraseña'
    })
});

// Esquema para recuperar contraseña
export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Debe proporcionar un email válido',
      'any.required': 'El email es requerido'
    })
});

// Esquema para resetear contraseña
export const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'any.required': 'El token es requerido'
    }),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'string.pattern.base': 'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial',
      'any.required': 'La contraseña es requerida'
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Las contraseñas no coinciden',
      'any.required': 'Debe confirmar la contraseña'
    })
});