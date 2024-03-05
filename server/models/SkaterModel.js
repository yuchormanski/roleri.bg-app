import { Schema, Types, model } from "mongoose";

const skaterModelSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is require"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is require"],
    },
    age: {
      type: Number,
      required: [true, "Age is require"],
    },
    additionalRequirements: {
      type: String,
      default: null,
    },
    skatesSize: {
      type: Types.ObjectId,
      ref: "Skates",
    },
    protection: {
      type: Types.ObjectId,
      ref: "Protection",
    },
    owner: {
      type: Types.ObjectId,
      ref: "UserParent",
    },
    imageURL: {
      type: String,
      match: [/^https?:\/\//, "Image URL must start with http or https"],
      default: null,
    },
    imageId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const SkaterModel = model("Skater", skaterModelSchema);

export { SkaterModel };
