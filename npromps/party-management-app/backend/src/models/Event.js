import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del invitado es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    phone: {
        type: String,
        trim: true,
        match: [/^[+]?[\d\s\-\(\)]+$/, 'Formato de teléfono inválido']
    },
    status: {
        type: String,
        enum: {
            values: ['invited', 'confirmed', 'declined', 'pending'],
            message: 'Estado de invitado inválido'
        },
        default: 'pending'
    },
    dietaryRestrictions: {
        type: String,
        maxlength: [200, 'Las restricciones dietéticas no pueden tener más de 200 caracteres']
    },
    plusOne: {
        type: Boolean,
        default: false
    },
    plusOneName: {
        type: String,
        trim: true,
        maxlength: [100, 'El nombre del acompañante no puede tener más de 100 caracteres']
    },
    tableNumber: {
        type: Number,
        min: [1, 'El número de mesa debe ser mayor a 0']
    },
    notes: {
        type: String,
        maxlength: [300, 'Las notas no pueden tener más de 300 caracteres']
    },
    rsvpDate: {
        type: Date,
        default: null
    }
}, { _id: true });

const timelineSchema = new mongoose.Schema({
    time: {
        type: String,
        required: [true, 'La hora es obligatoria'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)']
    },
    activity: {
        type: String,
        required: [true, 'La actividad es obligatoria'],
        trim: true,
        maxlength: [200, 'La actividad no puede tener más de 200 caracteres']
    },
    description: {
        type: String,
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
    },
    responsible: {
        type: String,
        trim: true,
        maxlength: [100, 'El responsable no puede tener más de 100 caracteres']
    },
    location: {
        type: String,
        trim: true,
        maxlength: [100, 'La ubicación no puede tener más de 100 caracteres']
    },
    duration: {
        type: Number,
        min: [0, 'La duración no puede ser negativa'],
        default: 60 // minutos
    },
    isImportant: {
        type: Boolean,
        default: false
    }
}, { _id: true });

const checklistItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'La tarea es obligatoria'],
        trim: true,
        maxlength: [200, 'La tarea no puede tener más de 200 caracteres']
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    },
    assignedTo: {
        type: String,
        trim: true,
        maxlength: [100, 'El asignado no puede tener más de 100 caracteres']
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high', 'urgent'],
            message: 'Prioridad inválida'
        },
        default: 'medium'
    },
    category: {
        type: String,
        trim: true,
        maxlength: [50, 'La categoría no puede tener más de 50 caracteres']
    },
    notes: {
        type: String,
        maxlength: [300, 'Las notas no pueden tener más de 300 caracteres']
    },
    completedDate: {
        type: Date,
        default: null
    }
}, { _id: true });

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [100, 'El título no puede tener más de 100 caracteres']
    },

    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'La descripción no puede tener más de 1000 caracteres']
    },

    eventType: {
        type: String,
        enum: {
            values: ['boda', 'cumpleanos', 'corporativo', 'social', 'religioso', 'otro'],
            message: 'Tipo de evento inválido'
        },
        required: [true, 'El tipo de evento es obligatorio']
    },

    date: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        min: [Date.now, 'La fecha del evento debe ser futura']
    },

    endDate: {
        type: Date,
        validate: {
            validator: function (endDate) {
                return !endDate || endDate > this.date;
            },
            message: 'La fecha de finalización debe ser posterior a la fecha de inicio'
        }
    },

    location: {
        name: {
            type: String,
            required: [true, 'El nombre del lugar es obligatorio'],
            trim: true,
            maxlength: [100, 'El nombre del lugar no puede tener más de 100 caracteres']
        },
        address: {
            type: String,
            required: [true, 'La dirección es obligatoria'],
            trim: true,
            maxlength: [200, 'La dirección no puede tener más de 200 caracteres']
        },
        city: {
            type: String,
            required: [true, 'La ciudad es obligatoria'],
            trim: true,
            maxlength: [50, 'La ciudad no puede tener más de 50 caracteres']
        },
        state: {
            type: String,
            trim: true,
            maxlength: [50, 'El estado no puede tener más de 50 caracteres']
        },
        coordinates: {
            lat: {
                type: Number,
                min: [-90, 'Latitud inválida'],
                max: [90, 'Latitud inválida']
            },
            lng: {
                type: Number,
                min: [-180, 'Longitud inválida'],
                max: [180, 'Longitud inválida']
            }
        },
        capacity: {
            type: Number,
            min: [1, 'La capacidad debe ser mayor a 0']
        }
    },

    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El organizador es obligatorio']
    },

    budget: {
        total: {
            type: Number,
            min: [0, 'El presupuesto no puede ser negativo']
        },
        spent: {
            type: Number,
            min: [0, 'Lo gastado no puede ser negativo'],
            default: 0
        },
        currency: {
            type: String,
            default: 'MXN',
            length: [3, 'Código de moneda inválido']
        }
    },

    guestCount: {
        expected: {
            type: Number,
            min: [1, 'Debe haber al menos 1 invitado esperado'],
            default: 1
        },
        confirmed: {
            type: Number,
            min: [0, 'Los invitados confirmados no pueden ser negativos'],
            default: 0
        }
    },

    guests: [guestSchema],

    timeline: [timelineSchema],

    checklist: [checklistItemSchema],

    providers: [{
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Provider',
            required: true
        },
        service: {
            type: String,
            required: [true, 'El servicio es obligatorio'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo']
        },
        status: {
            type: String,
            enum: {
                values: ['requested', 'quoted', 'confirmed', 'completed', 'cancelled'],
                message: 'Estado del proveedor inválido'
            },
            default: 'requested'
        },
        notes: {
            type: String,
            maxlength: [300, 'Las notas no pueden tener más de 300 caracteres']
        },
        contractUrl: {
            type: String
        }
    }],

    status: {
        type: String,
        enum: {
            values: ['planning', 'confirmed', 'in_progress', 'completed', 'cancelled'],
            message: 'Estado del evento inválido'
        },
        default: 'planning'
    },

    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high', 'urgent'],
            message: 'Prioridad inválida'
        },
        default: 'medium'
    },

    tags: [{
        type: String,
        trim: true,
        maxlength: [30, 'Cada etiqueta no puede tener más de 30 caracteres']
    }],

    // Metadatos
    isPrivate: {
        type: Boolean,
        default: false
    },

    weatherBackup: {
        type: String,
        trim: true
    },

    specialRequirements: {
        type: String,
        maxlength: [500, 'Los requisitos especiales no pueden tener más de 500 caracteres']
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Índices para optimización
eventSchema.index({ organizer: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ 'location.city': 1 });
eventSchema.index({ createdAt: -1 });

// Índice compuesto para búsquedas eficientes
eventSchema.index({
    organizer: 1,
    date: 1,
    status: 1
});

// Virtual para calcular días restantes
eventSchema.virtual('daysUntilEvent').get(function () {
    if (!this.date) return null;
    const now = new Date();
    const eventDate = new Date(this.date);
    const diffTime = eventDate - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual para calcular progreso del presupuesto
eventSchema.virtual('budgetProgress').get(function () {
    if (!this.budget?.total) return 0;
    return (this.budget.spent / this.budget.total) * 100;
});

// Virtual para calcular progreso del checklist
eventSchema.virtual('checklistProgress').get(function () {
    if (!this.checklist || this.checklist.length === 0) return 0;
    const completed = this.checklist.filter(item => item.completed).length;
    return (completed / this.checklist.length) * 100;
});

// Middleware para actualizar contadores
eventSchema.pre('save', function (next) {
    // Actualizar contador de invitados confirmados
    if (this.guests && this.guests.length > 0) {
        this.guestCount.confirmed = this.guests.filter(
            guest => guest.status === 'confirmed'
        ).length;
    }

    next();
});

// Método para agregar invitado
eventSchema.methods.addGuest = function (guestData) {
    this.guests.push(guestData);
    return this.save();
};

// Método para actualizar estado de invitado
eventSchema.methods.updateGuestStatus = function (guestId, status) {
    const guest = this.guests.id(guestId);
    if (guest) {
        guest.status = status;
        guest.rsvpDate = new Date();
        return this.save();
    }
    throw new Error('Invitado no encontrado');
};

// Método para agregar tarea al checklist
eventSchema.methods.addChecklistItem = function (taskData) {
    this.checklist.push(taskData);
    return this.save();
};

// Método para completar tarea
eventSchema.methods.completeChecklistItem = function (taskId) {
    const task = this.checklist.id(taskId);
    if (task) {
        task.completed = true;
        task.completedDate = new Date();
        return this.save();
    }
    throw new Error('Tarea no encontrada');
};

const Event = mongoose.model('Event', eventSchema);

export default Event;