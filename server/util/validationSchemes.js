import joi from "joi";
import { Types } from "mongoose";

import { userRole } from "../environments/constants.js";

// Common validations
// MongoDB ObjectId validation
const objectIdSchema = joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "MongoDB ObjectId");

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
const passwordSchema = joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/).required().trim().messages(commonPasswordMessages);

// Regular validation
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
  phone: joi.string().required().regex(/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/),
  role: joi.string().allow("").optional().valid(userRole.admin, userRole.user, userRole.instructor).trim().lowercase(),
});

// User update role
const updateUserRoleSchema = joi.object({
  _id: objectIdSchema,
  role: joi.string().allow("").optional().valid(userRole.admin, userRole.user, userRole.instructor).trim().lowercase(),
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
  _id: joi.string().allow("").allow(null).optional(),
  imageUrl: joi.string().trim().regex(/^https?:\/\/.+/).allow("").allow(null).optional(),
  title: joi.string().max(110).trim().required(),
  age: objectIdSchema,
  skills: joi.string().max(410).trim().required(),
  participants: joi.number().max(20).required(),
  isIndividual: joi.boolean().optional(),
  type: objectIdSchema,
  location: joi.string().max(410).trim().required(),
  price: joi.number().max(10000).required(),
  geoLocation: joi.object({
    lat: joi.string().trim().allow("").allow(null).default(null).optional(),
    lon: joi.string().trim().allow("").allow(null).default(null).optional(),
  }),
  description: joi.string().max(510).trim().required(),
  time: joi.string().trim().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  validTo: joi.date().custom((value, helpers) => {
    if (new Date > new Date(value)) {
      throw new Error('Invalid date')
    }
    return value;

  }).allow(null).optional(),
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
const unregisteredBookingUserSchema = joi.object({
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
const registeredBookingUserSchema = joi.array().items(
  joi.object({
    additionalRequirements: joi.string().trim().max(300).allow("").allow(null).optional(),
    date: joi.date().required(),
    lessonId: objectIdSchema,
    skaterId: objectIdSchema,
    subscriptionType: objectIdSchema,
  })
);

// Booking validation to regular active days
const regularActiveDaysBookingSchema = joi.object({
  _id: objectIdSchema,
  mon: joi.boolean().required(),
  tue: joi.boolean().required(),
  wed: joi.boolean().required(),
  thu: joi.boolean().required(),
  fri: joi.boolean().required(),
  sat: joi.boolean().required(),
  sun: joi.boolean().required(),
});

// Booking validation to individual active days
const individualActiveDaysBookingSchema = joi.object({
  _id: objectIdSchema,
  mon: joi.boolean().required(),
  tue: joi.boolean().required(),
  wed: joi.boolean().required(),
  thu: joi.boolean().required(),
  fri: joi.boolean().required(),
  sat: joi.boolean().required(),
  sun: joi.boolean().required(),
  start: joi.string().trim().required(),
  end: joi.string().trim().required(),
});

// Add instructor notes validation
const instructorCreateSchema = joi.object({
  instructor: objectIdSchema,
  skater: objectIdSchema,
  content: joi.string().trim().max(800).allow(null).allow('')
});

export {
  validateRegisterSchema,
  validateLoginSchema,
  validateResetPasswordSchema,
  updateUserSchema,
  lessonCreateSchema,
  skaterCreateSchema,
  unregisteredBookingUserSchema,
  registeredBookingUserSchema,
  individualActiveDaysBookingSchema,
  regularActiveDaysBookingSchema,
  updateUserRoleSchema,
  instructorCreateSchema,
};
