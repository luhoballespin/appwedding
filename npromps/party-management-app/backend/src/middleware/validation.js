import Joi from 'joi';

/**
 * Middleware para validar datos usando Joi
 * @param {Object} schema - Esquema de Joi para validar
 * @param {string} property - Propiedad del request a validar (body, query, params)
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Mostrar todos los errores
      stripUnknown: true, // Eliminar propiedades no definidas en el esquema
      convert: true // Convertir tipos cuando sea posible
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errorDetails
      });
    }

    // Reemplazar la propiedad validada con los datos limpios
    req[property] = value;
    next();
  };
};

/**
 * Middleware para validar múltiples propiedades del request
 * @param {Object} schemas - Objeto con esquemas para diferentes propiedades
 */
export const validateMultiple = (schemas) => {
  return (req, res, next) => {
    const errors = [];

    Object.keys(schemas).forEach(property => {
      const schema = schemas[property];
      const { error, value } = schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
        convert: true
      });

      if (error) {
        const errorDetails = error.details.map(detail => ({
          field: `${property}.${detail.path.join('.')}`,
          message: detail.message,
          value: detail.context?.value
        }));
        errors.push(...errorDetails);
      } else {
        req[property] = value;
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors
      });
    }

    next();
  };
};

/**
 * Middleware para validar parámetros de consulta con paginación
 */
export const validatePagination = validate(
  Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .optional(),
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(10)
      .optional(),
    sortBy: Joi.string()
      .optional(),
    sortOrder: Joi.string()
      .valid('asc', 'desc')
      .default('desc')
      .optional()
  }),
  'query'
);

/**
 * Middleware para validar búsquedas
 */
export const validateSearch = validate(
  Joi.object({
    q: Joi.string()
      .min(1)
      .max(100)
      .optional(),
    category: Joi.string()
      .optional(),
    location: Joi.string()
      .optional(),
    minPrice: Joi.number()
      .min(0)
      .optional(),
    maxPrice: Joi.number()
      .min(0)
      .optional(),
    date: Joi.date()
      .optional(),
    status: Joi.string()
      .optional()
  }),
  'query'
);

/**
 * Middleware para validar IDs de MongoDB
 */
export const validateObjectId = (paramName = 'id') => {
  return validate(
    Joi.object({
      [paramName]: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'string.pattern.base': 'ID inválido'
        })
    }),
    'params'
  );
};

/**
 * Middleware para validar archivos
 */
export const validateFile = (options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB por defecto
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    required = false
  } = options;

  return (req, res, next) => {
    const file = req.file;

    if (required && !file) {
      return res.status(400).json({
        success: false,
        message: 'Archivo requerido'
      });
    }

    if (file) {
      // Validar tamaño
      if (file.size > maxSize) {
        return res.status(400).json({
          success: false,
          message: `El archivo es demasiado grande. Máximo permitido: ${maxSize / (1024 * 1024)}MB`
        });
      }

      // Validar tipo
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: `Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`
        });
      }
    }

    next();
  };
};

/**
 * Middleware para validar fechas
 */
export const validateDateRange = (startDateField = 'startDate', endDateField = 'endDate') => {
  return validate(
    Joi.object({
      [startDateField]: Joi.date()
        .optional(),
      [endDateField]: Joi.date()
        .min(Joi.ref(startDateField))
        .optional()
        .messages({
          'date.min': 'La fecha de fin debe ser posterior a la fecha de inicio'
        })
    }),
    'body'
  );
};