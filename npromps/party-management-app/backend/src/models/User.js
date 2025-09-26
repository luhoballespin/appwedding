import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true,
        minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
        maxlength: [30, 'El nombre de usuario no puede tener más de 30 caracteres'],
        match: [/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos']
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        select: false // No incluir en consultas por defecto
    },

    firstName: {
        type: String,
        trim: true,
        maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
        default: ''
    },

    lastName: {
        type: String,
        trim: true,
        maxlength: [50, 'El apellido no puede tener más de 50 caracteres'],
        default: ''
    },

    role: {
        type: String,
        enum: {
            values: ['cumpleañero', 'planeador_bodas', 'organizador', 'proveedor', 'admin'],
            message: 'Rol inválido'
        },
        required: [true, 'El rol es obligatorio'],
        default: 'cumpleañero'
    },

    phone: {
        type: String,
        trim: true,
        match: [/^[+]?[\d\s\-\(\)]+$/, 'Formato de teléfono inválido']
    },

    avatar: {
        type: String,
        default: null
    },

    bio: {
        type: String,
        maxlength: [500, 'La biografía no puede tener más de 500 caracteres']
    },

    location: {
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true, default: 'México' }
    },

    preferences: {
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
            sms: { type: Boolean, default: false }
        },
        language: { type: String, default: 'es' },
        timezone: { type: String, default: 'America/Mexico_City' }
    },

    // Para proveedores
    businessInfo: {
        businessName: { type: String, trim: true },
        businessType: { type: String },
        licenseNumber: { type: String },
        taxId: { type: String },
        website: { type: String },
        socialMedia: {
            instagram: { type: String },
            facebook: { type: String },
            twitter: { type: String }
        }
    },

    // Para organizadores
    eventPreferences: {
        preferredEventTypes: [{ type: String }],
        maxGuestCount: { type: Number, default: 100 },
        budgetRange: {
            min: { type: Number },
            max: { type: Number }
        }
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    },

    emailVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationToken: String,
    emailVerificationExpires: Date,

    passwordResetToken: String,
    passwordResetExpires: Date,

    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Índices para optimización
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'location.city': 1 });
userSchema.index({ isActive: 1 });

// Virtual para nombre completo
userSchema.virtual('fullName').get(function () {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim() || this.username;
});

// Virtual para cuenta bloqueada
userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware para hash de contraseña
userSchema.pre('save', async function (next) {
    // Solo hashear si la contraseña ha sido modificada
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

// Método para incrementar intentos de login
userSchema.methods.incLoginAttempts = function () {
    // Si tenemos un lock previo y ya expiró
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: { loginAttempts: 1 }
        });
    }

    const updates = { $inc: { loginAttempts: 1 } };

    // Bloquear cuenta después de 5 intentos fallidos por 2 horas
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 horas
    }

    return this.updateOne(updates);
};

// Método para resetear intentos de login
userSchema.methods.resetLoginAttempts = function () {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 }
    });
};

// Método para obtener datos públicos del usuario
userSchema.methods.getPublicProfile = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.emailVerificationToken;
    delete userObject.emailVerificationExpires;
    delete userObject.passwordResetToken;
    delete userObject.passwordResetExpires;
    delete userObject.loginAttempts;
    delete userObject.lockUntil;
    return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;