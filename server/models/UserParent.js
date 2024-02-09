import mongoose from 'mongoose';
import { userRole } from '../environments/constants.js';

const userParentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is require']
    },
    email: {
        type: String,
        required: [true, 'Email is require']
    },
    phone: {
        type: Number,
        required: [true, 'Phone is require']
    },
    role: {
        type: String,
        default: userRole.user
    },
    password: {
        type: String,
        require: [true, 'Password is require']
    }
});

userParentSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }

}, { timestamps: true });

const UserParent = mongoose.model('UserParent', userParentSchema);

export { UserParent };