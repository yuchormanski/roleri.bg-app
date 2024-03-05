import { Schema, model, Types } from 'mongoose';

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    present: {
        type: Boolean,
        default: false
    },
    lessonId: {
        type: Types.ObjectId,
        ref: 'Lesson'
    },
    skater: {
        type: Types.ObjectId,
        ref: 'Skater'
    }
}, { timestamps: true });

const BookingModel = model('Booking', bookingSchema);

export { BookingModel };