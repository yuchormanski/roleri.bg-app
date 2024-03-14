import { Schema, model } from 'mongoose';

const individualActiveDaysSchema = new Schema({
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
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
}, { timestamps: true });

const IndividualDaysModel = model('IndividualDays', individualActiveDaysSchema);

export { IndividualDaysModel };