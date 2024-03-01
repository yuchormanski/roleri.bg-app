import { Schema, model } from 'mongoose';

const skatesModelSchema = new Schema({
    size: {
        type: Number,
        required: [true, 'Skates size is require'],
        unique: [true, 'Skate already exists'],
    },
    quantity: {
        type: Number,
        required: [true, 'Skates quantity is require'],
    }
}, { timestamps: true });

const SkatesModel = model('Skates', skatesModelSchema);

export { SkatesModel };