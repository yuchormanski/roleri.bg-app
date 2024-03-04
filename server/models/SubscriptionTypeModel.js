import { Schema, model } from "mongoose";

const subscriptionTypeModelSchema = new Schema(
  {
    typePayment: {
      type: String,
      required: [true, "Type payment is require"],
      unique: [true, "Type payment already exists"],
    },
    price: {
      type: Number,
      required: [true, "Price is require"],
      min: [0, "Price can't be a negative number"],
    },
    subscriptionCount: {
      type: Number,
      required: [true, "Subscription count is required"],
      min: [0, "Subscription count can't be a negative number"],
    },
  },
  { timestamps: true }
);

const SubscriptionTypeModel = model(
  "SubscriptionType",
  subscriptionTypeModelSchema
);

export { SubscriptionTypeModel };
