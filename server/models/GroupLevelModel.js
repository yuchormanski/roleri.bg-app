import { Schema, model } from 'mongoose';

const groupLevelModelSchema = new Schema({
    typeGroup: {
        type: String,
        required: [true, 'Type group is require'],
    },
    description: {
        type: String,
        required: [true, 'Description is require'],
    },
}, { timestamps: true });

const GroupLevelModel = model('GroupLevel', groupLevelModelSchema);

export { GroupLevelModel };