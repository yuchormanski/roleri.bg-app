import mongoose from "mongoose";
import { userRole } from "../environments/constants.js";

const skaterSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    required: [true, "Gender is require"],
  },
  skates: {
    type: Number,
    required: [true, "Skates is require"],
  },
  protection: {
    type: String,
    required: [true, "Protection is require"],
  },
  level: {
    type: String,
    required: [true, "Level is require"],
  },
});

skaterSchema.index(
  { email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  },
  { timestamps: true }
);

const Skater = mongoose.model("Skater", skaterSchema);

export { Skater };
