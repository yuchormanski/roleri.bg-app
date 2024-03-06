import { Schema, model, Types } from "mongoose";

const lessonModelSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      match: [
        /^https?:\/\/.+/,
        "Image URL must start with http:// or https://",
      ],
    },
    title: {
      type: String,
      required: true,
    },
    age: {
      type: Types.ObjectId,
      ref: "GroupAge"
    },
    skills: {
      type: String,
      required: true,
    },
    participants: {
      type: Number,
      required: true,
    },
    type: {
      type: Types.ObjectId,
      ref: "SubscriptionType"
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    geoLocation: {
      lat: {
        type: String,
        default: null,
      },
      lon: {
        type: String,
        default: null,
      },
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: props => `${props.value} is not a valid time format!`
      },
      required: true
    },
    validTo: {
      type: Date,
      default: null,
    },
    owner: {
      type: Types.ObjectId,
      ref: "UserParent"
    }
  },
  { timestamps: true }
);

const LessonModel = model("Lesson", lessonModelSchema);

export { LessonModel };
