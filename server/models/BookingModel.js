import { Schema, model, Types } from "mongoose";

const bookingSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    isSubscriptionRejectedOnce: {
      type: Boolean,
      default: false,
    },
    additionalRequirements: {
      type: String,
      default: null,
    },
    lessonIndex: {
      type: Number,
      default: 1,
    },
    lessonId: {
      type: Types.ObjectId,
      ref: "Lesson",
    },
    skaterId: {
      type: Types.ObjectId,
      ref: "Skater",
    },
    subscriptionId: {
      type: Types.ObjectId,
      ref: "SubscriptionType",
    },
    owner: {
      type: Types.ObjectId,
      ref: "UserParent",
      default: null,
    },
    instructorId: {
      type: Types.ObjectId,
      ref: "UserParent",
      default: null,
    },
    subscriptionCodeId: {
      type: String,
      require: true,
    },
    cancellationMessage: {
      type: String,
      default: '',
    }
  },
  { timestamps: true }
);

const BookingModel = model("Booking", bookingSchema);

export { BookingModel };
