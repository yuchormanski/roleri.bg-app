import joi from "joi";
import { Types } from "mongoose";

import { userRole } from "../environments/constants.js";

// User Password messages
const commonPasswordMessages = {
  "string.base": "Password must be a string",
  "string.pattern.base":
    "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
  "string.empty": "Password is required",
  "string.trim": "Password cannot contain leading or trailing spaces",
  "string.max": "Password cannot be longer than {#limit} characters",
};

// User Password validation
const passwordSchema = joi
  .string()
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/)
  .required()
  .trim()
  .messages(commonPasswordMessages);

// MongoDB ObjectId validation
const objectIdSchema = joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "MongoDB ObjectId");

// User register validation
const validateRegisterSchema = joi.object({
  firstName: joi.string().required().trim().max(20),
  lastName: joi.string().required().trim().max(20),
  email: joi.string().required().trim().email().lowercase(),
  phone: joi
    .string()
    .required()
    .regex(
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
    ),
  role: joi
    .string()
    .allow("")
    .optional()
    .valid(userRole.admin, userRole.user, userRole.instructor)
    .trim()
    .lowercase(),
  password: passwordSchema,
});

// User update validation
const updateUserSchema = joi.object({
  firstName: joi.string().required().trim().max(20),
  lastName: joi.string().required().trim().max(20),
  email: joi.string().required().trim().email().lowercase(),
  phone: joi
    .string()
    .required()
    .regex(
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
    ),
  role: joi
    .string()
    .allow("")
    .optional()
    .valid(userRole.admin, userRole.user, userRole.instructor)
    .trim()
    .lowercase(),
});

// User login validation
const validateLoginSchema = joi.object({
  email: joi.string().required().trim().email().lowercase(),
  password: passwordSchema,
});

// User reset password validation
const validateResetPasswordSchema = joi.object({
  password: passwordSchema,
  resetToken: joi.string().required().trim(),
});

// Lesson validation
const lessonCreateSchema = joi.object({
  imageUrl: joi
    .string()
    .required()
    .regex(/^https?:\/\/.+/),
  title: joi.string().required(),
  titleBG: joi.string().required(),
  age: joi.string().required(),
  skills: joi.string().required(),
  participants: joi.string().required(),
  type: joi.string().required(),
  count: joi.string().required(),
  location: joi.string().required(),
  price: joi.string().required(),
  geoLocation: joi.object({
    lat: joi.string().allow(null).default(null),
    lon: joi.string().allow(null).default(null),
  }),
  description: joi.string().required(),
});

// Skater validation
const skaterCreateSchema = joi.object({
  firstName: joi.string().required().max(20),
  lastName: joi.string().required().max(20),
  age: joi.number().required(),
  skatesSize: joi.string().optional(),
  protection: joi.string().optional(),
  additionalRequirements: joi.string().allow("").allow(null).optional(),
});

// Unregistered booking user validation
const unregisteredUSerCreateSchema = joi.object({
  firstName: joi.string().trim().required().max(20),
  lastName: joi.string().trim().required().max(20),
  email: joi.string().trim().required().trim().email().lowercase(),
  // gender: joi.string().trim().required(),
  phone: joi
    .string()
    .trim()
    .required()
    .regex(
      /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
    ),
  additionalRequirements: joi.string().trim().allow("").allow(null).optional(),
  groupAge: objectIdSchema,
  skatesSize: objectIdSchema,
  protection: objectIdSchema,
  subscriptionType: objectIdSchema,
  lessonId: objectIdSchema,
  date: joi.date().required(),
});

// Registered user booking validation
const registeredUserCreateSchema = joi.array().items(
  joi.object({
    additionalRequirements: joi.string().trim().required().max(300),
    date: joi.date().required(),
    lessonId: objectIdSchema,
    skaterId: objectIdSchema,
    subscriptionType: objectIdSchema,
  })
);

export {
  validateRegisterSchema,
  validateLoginSchema,
  validateResetPasswordSchema,
  updateUserSchema,
  lessonCreateSchema,
  skaterCreateSchema,
  unregisteredUSerCreateSchema,
  registeredUserCreateSchema,
};
