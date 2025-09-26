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
    price: {
        type: Number,
        min: 0
    },
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
        default: 'MXN',
        enum: ['MXN', 'USD', 'EUR']
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
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: String,
        isMain: {
            type: Boolean,
            default: false
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
    }
}, {
    timestamps: true
});

// Middleware para calcular rating promedio
providerSchema.pre('save', function (next) {
    if (this.reviews && this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRating / this.reviews.length;
        this.totalReviews = this.reviews.length;
    }
    next();
});

const Provider = mongoose.model('Provider', providerSchema);

export default Provider;