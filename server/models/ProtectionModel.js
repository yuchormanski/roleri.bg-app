import { Schema, model } from 'mongoose';

const protectionModelSchema = new Schema({
    size: {
        type: String,
        required: [true, 'Protection size is require'],
        unique: [true, 'Protection already exists'],
    },
    quantity: {
        type: Number,
        required: [true, 'Protection quantity is require'],
    }
}, { timestamps: true });

const ProtectionModel = model('Protection', protectionModelSchema);

export { ProtectionModel };