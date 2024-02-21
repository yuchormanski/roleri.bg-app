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
  skatesSize: {
    type: Number,
    required: [true, 'Skates is require'],
  },
  protection: {
    type: String,
    required: [true, 'Protection is require'],
  },
  level: {
    type: String,
    required: [true, 'Level is require'],
  },
  owner: {
    type: Types.ObjectId,
    ref: 'UserParent',
  }
}, { timestamps: true });

const SkaterModel = model('Skater', skaterModelSchema);

export { SkaterModel };
