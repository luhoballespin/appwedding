import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    basePrice: {
        type: Number,
        min: 0
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'ARS', 'MXN'],
        default: 'USD'
    },
    pricingType: {
        type: String,
        enum: ['fixed', 'hourly', 'per_person', 'per_item'],
        default: 'fixed'
    },
    hourlyRate: {
        type: Number,
        min: 0
    },
    minimumHours: {
        type: Number,
        min: 0,
        default: 0
    },
    maximumHours: {
        type: Number,
        min: 0
    },
    // Imágenes específicas del servicio
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: String,
        isMain: {
            type: Boolean,
            default: false
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
});

const pricingSchema = new mongoose.Schema({
    basePrice: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD',
        enum: ['USD', 'EUR', 'ARS', 'MXN']
    },
    pricePerPerson: {
        type: Number,
        min: 0
    },
    minimumOrder: {
        type: Number,
        min: 0
    },
    discounts: [{
        type: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: true
        },
        value: {
            type: Number,
            required: true,
            min: 0
        },
        minimumQuantity: {
            type: Number,
            min: 1
        },
        validUntil: {
            type: Date
        }
    }]
});

const locationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    }
});

const contactSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    socialMedia: {
        facebook: String,
        instagram: String,
        twitter: String
    }
});

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const providerSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['catering', 'decoracion', 'musica', 'fotografia', 'video', 'flores', 'transportacion', 'alojamiento', 'entretenimiento', 'seguridad', 'limpieza', 'planificacion', 'otros']
    },
    services: [serviceSchema],
    pricing: pricingSchema,
    location: locationSchema,
    contact: contactSchema,
    // Imágenes principales del proveedor (para galería principal)
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: String,
        isMain: {
            type: Boolean,
            default: false
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    // Portfolio extendido del proveedor
    portfolio: [{
        imageUrl: {
            type: String,
            required: true
        },
        title: String,
        description: String,
        category: {
            type: String,
            enum: ['work', 'setup', 'event', 'product', 'team', 'other'],
            default: 'work'
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    reviews: [reviewSchema],
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }],
    availability: {
        monday: { start: String, end: String, isAvailable: { type: Boolean, default: true } },
        tuesday: { start: String, end: String, isAvailable: { type: Boolean, default: true } },
        wednesday: { start: String, end: String, isAvailable: { type: Boolean, default: true } },
        thursday: { start: String, end: String, isAvailable: { type: Boolean, default: true } },
        friday: { start: String, end: String, isAvailable: { type: Boolean, default: true } },
        saturday: { start: String, end: String, isAvailable: { type: Boolean, default: true } },
        sunday: { start: String, end: String, isAvailable: { type: Boolean, default: true } }
    },
    // Información de eventos relacionados
    events: [{
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        service: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ['requested', 'quoted', 'confirmed', 'in_progress', 'completed', 'cancelled'],
            default: 'requested'
        },
        startDate: Date,
        endDate: Date,
        price: {
            type: Number,
            min: 0
        },
        notes: String,
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    // Estadísticas del proveedor
    stats: {
        totalEvents: {
            type: Number,
            default: 0
        },
        completedEvents: {
            type: Number,
            default: 0
        },
        cancelledEvents: {
            type: Number,
            default: 0
        },
        totalRevenue: {
            type: Number,
            default: 0
        },
        averageRating: {
            type: Number,
            default: 0
        },
        responseTime: {
            type: Number, // en horas
            default: 0
        }
    },
    // Configuración de notificaciones
    notifications: {
        newEventRequest: {
            type: Boolean,
            default: true
        },
        eventUpdates: {
            type: Boolean,
            default: true
        },
        paymentReminders: {
            type: Boolean,
            default: true
        },
        reviewRequests: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});

// Middleware para calcular rating promedio y estadísticas
providerSchema.pre('save', function (next) {
    if (this.reviews && this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRating / this.reviews.length;
        this.totalReviews = this.reviews.length;
        this.stats.averageRating = this.averageRating;
    }

    // Actualizar estadísticas de eventos
    if (this.events && this.events.length > 0) {
        this.stats.totalEvents = this.events.length;
        this.stats.completedEvents = this.events.filter(e => e.status === 'completed').length;
        this.stats.cancelledEvents = this.events.filter(e => e.status === 'cancelled').length;
        this.stats.totalRevenue = this.events.reduce((sum, event) => sum + (event.price || 0), 0);
    }

    next();
});

// Método para agregar evento al proveedor
providerSchema.methods.addEvent = function (eventData) {
    this.events.push(eventData);
    return this.save();
};

// Método para actualizar estado de evento
providerSchema.methods.updateEventStatus = function (eventId, status) {
    const event = this.events.id(eventId);
    if (event) {
        event.status = status;
        return this.save();
    }
    throw new Error('Evento no encontrado');
};

// Método para remover evento del proveedor
providerSchema.methods.removeEvent = function (eventId) {
    const event = this.events.id(eventId);
    if (event) {
        event.remove();
        return this.save();
    }
    throw new Error('Evento no encontrado');
};

// Método para verificar disponibilidad en una fecha
providerSchema.methods.isAvailableOnDate = function (date) {
    const dayOfWeek = date.getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayOfWeek];

    const dayAvailability = this.availability[dayName];
    if (!dayAvailability || !dayAvailability.isAvailable) {
        return false;
    }

    // Verificar si ya tiene eventos en esa fecha
    const hasEventOnDate = this.events.some(event => {
        const eventDate = new Date(event.startDate);
        return eventDate.toDateString() === date.toDateString() &&
            ['confirmed', 'in_progress'].includes(event.status);
    });

    return !hasEventOnDate;
};

// Método para obtener eventos por rango de fechas
providerSchema.methods.getEventsInDateRange = function (startDate, endDate) {
    return this.events.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startDate && eventDate <= endDate;
    });
};

// Método para calcular el precio total basado en el tipo de facturación
providerSchema.methods.calculateServicePrice = function (serviceName, hours = 1, people = 1, items = 1) {
    const service = this.services.find(s => s.name === serviceName);
    if (!service) return 0;

    let totalPrice = 0;

    switch (service.pricingType) {
        case 'hourly':
            totalPrice = service.hourlyRate * hours;
            break;
        case 'per_person':
            totalPrice = service.basePrice * people;
            break;
        case 'per_item':
            totalPrice = service.basePrice * items;
            break;
        case 'fixed':
        default:
            totalPrice = service.basePrice;
            break;
    }

    return totalPrice;
};

const Provider = mongoose.model('Provider', providerSchema);

export default Provider;