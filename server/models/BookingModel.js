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
    skaterId: {
        type: Types.ObjectId,
        ref: 'Skater'
    },
    additionalRequirements: {
        type: String,
        default: null,
    },
    owner: {
        type: Types.ObjectId,
        ref: "UserParent",
        default: null
    },
}, { timestamps: true });

const BookingModel = model('Booking', bookingSchema);

export { BookingModel };