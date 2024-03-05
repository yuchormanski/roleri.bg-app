import { Schema, model, Types } from 'mongoose';

const unregisteredUser = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is require']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is require']
    },
    email: {
        type: String,
        required: [true, 'Email is require']
    },
    phone: {
        type: String,
        required: [true, 'Phone is require']
    },
    // gender: {
    //     type: String,
    //     required: [true, "Gender is require"],
    // },
    additionalRequirements: {
        type: String,
        default: null,
    },
    groupAge: {
        type: Types.ObjectId,
        ref: "GroupAge",
    },
    skatesSize: {
        type: Types.ObjectId,
        ref: "Skates",
    },
    protection: {
        type: Types.ObjectId,
        ref: "Protection",
    },
    subscriptionType: {
        type: Types.ObjectId,
        ref: "SubscriptionType",
    },
    groupLevel: {
        type: Types.ObjectId,
        ref: "GroupLevel",
    },
}, { timestamps: true });

unregisteredUser.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const UnregisteredUser = model('UnregisteredUser', unregisteredUser);

export { UnregisteredUser };