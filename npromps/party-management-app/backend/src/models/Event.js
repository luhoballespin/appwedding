import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    guests: [{
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['confirmed', 'pending', 'declined'],
            default: 'pending'
        }
    }],
    providers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;