import { Schema, Types, model } from 'mongoose';

const skaterModelSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is require'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is require'],
  },
  age: {
    type: Number,
    required: [true, 'Age is require'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is require'],
  },
  additionalRequirements: {
    type: String,
    default: null,
  },
  skatesSize: {
    type: Types.ObjectId,
    ref: 'Skates',
  },
  protection: {
    type: Types.ObjectId,
    ref: 'Protection',
  },
  groupLevel: {
    type: Types.ObjectId,
    ref: 'GroupLevel',
  },
  courseHistory: [
    {
      courseLevel: String,
      lessonsCompleted: Number,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  owner: {
    type: Types.ObjectId,
    ref: 'UserParent',
  }
}, { timestamps: true });

const SkaterModel = model('Skater', skaterModelSchema);

export { SkaterModel };
