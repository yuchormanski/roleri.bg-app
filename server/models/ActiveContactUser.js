import { Schema, Types, model } from 'mongoose';

const activeContactUserSchema = new Schema({
    contactUser: {
        type: Types.ObjectId,
        ref: "UserParent",
        default: null,
    }
}, { timestamps: true });

const ActiveContactUser = model('ActiveContactUser', activeContactUserSchema);

export { ActiveContactUser };