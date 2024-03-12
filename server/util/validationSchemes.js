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
  imageUrl: joi.string().required().trim().regex(/^https?:\/\/.+/),
  title: joi.string().max(110).trim().required(),
  age: objectIdSchema,
  skills: joi.string().max(410).trim().required(),
  participants: joi.number().max(20).required(),
  type: objectIdSchema,
  location: joi.string().max(410).trim().required(),
  price: joi.number().max(10000).required(),
  geoLocation: joi.object({
    lat: joi.string().trim().allow(null).default(null),
    lon: joi.string().trim().allow(null).default(null),
  }),
  description: joi.string().max(510).trim().required(),
  time: joi.string().trim().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  validTo: joi.date().required(),
});

// Skater validation
const skaterCreateSchema = joi.object({
  firstName: joi.string().required().max(20),
  lastName: joi.string().required().max(20),
  age: joi.number().required(),
  skatesSize: objectIdSchema,
  protection: objectIdSchema,
  additionalRequirements: joi.string().trim().allow("").allow(null).optional(),
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
  additionalRequirements: joi.string().trim().max(300).allow("").allow(null).optional(),
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
    additionalRequirements: joi.string().trim().max(300).allow("").allow(null).optional(),
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
