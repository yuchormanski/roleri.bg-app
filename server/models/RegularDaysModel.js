import { Schema, model } from 'mongoose';

const regularActiveDaysSchema = new Schema({
    mon: {
        type: Boolean,
        required: true,
        default: false,
    },
    tue: {
        type: Boolean,
        required: true,
        default: false,
    },
    wed: {
        type: Boolean,
        required: true,
        default: false,
    },
    thu: {
        type: Boolean,
        required: true,
        default: false,
    },
    fri: {
        type: Boolean,
        required: true,
        default: false,
    },
    sat: {
        type: Boolean,
        required: true,
        default: true,
    },
    sun: {
        type: Boolean,
        required: true,
        default: true,
    }
}, { timestamps: true });

const RegularDaysModel = model('RegularDays', regularActiveDaysSchema);

export { RegularDaysModel };