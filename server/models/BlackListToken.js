import { Schema, model } from 'mongoose';

const blackListTokenSchema = new Schema({
    token: String,

}, { timestamps: true });

const BlackListToken = model('TokenBlackList', blackListTokenSchema);

export { BlackListToken };