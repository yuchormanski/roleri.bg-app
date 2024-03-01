import { Schema, model } from 'mongoose';

const groupLevelModelSchema = new Schema(
  {
    typeGroup: {
      type: String,
      required: [true, 'Type group is require'],
      unique: [true, 'Type group already exists'],
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const GroupLevelModel = model('GroupLevel', groupLevelModelSchema);

export { GroupLevelModel };
