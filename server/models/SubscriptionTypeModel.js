import { Schema, model } from 'mongoose';

const subscriptionTypeModelSchema = new Schema({
    typePayment: {
        type: String,
        required: [true, 'Type payment is require'],
    },
    price: {
        type: Number,
        required: [true, 'Price is require'],
        min: [0, 'Price cannot be a negative number']
    }
}, { timestamps: true });

const SubscriptionTypeModel = model('SubscriptionType', subscriptionTypeModelSchema);

export { SubscriptionTypeModel };