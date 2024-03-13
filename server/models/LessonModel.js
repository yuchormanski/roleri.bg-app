import { Schema, model, Types } from "mongoose";

const lessonModelSchema = new Schema(
  {
    imageUrl: {
      type: String,
      default: null,
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
      required: true,
    },
    validTo: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 100); // Set to current date + 100 years
        return date;
      },
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
