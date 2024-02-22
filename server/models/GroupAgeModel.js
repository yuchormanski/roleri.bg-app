import { Schema, model } from 'mongoose';

const groupAgeModelSchema = new Schema({
    typeGroup: {
        type: String,
        required: [true, 'Type group is require'],
    },
}, { timestamps: true });

const GroupAgeModel = model('GroupAge', groupAgeModelSchema);

export { GroupAgeModel };