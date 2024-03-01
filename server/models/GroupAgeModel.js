import { Schema, model } from 'mongoose';

const groupAgeModelSchema = new Schema({
    typeGroup: {
        type: String,
        required: [true, 'Type group is require'],
        unique: [true, 'Type group already exists'],
    },
}, { timestamps: true });

const GroupAgeModel = model('GroupAge', groupAgeModelSchema);

export { GroupAgeModel };