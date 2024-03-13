import { Router } from "express";

import { endpoints } from "../environments/endPoints.js";
import { isOwner, isUserGuest, isUserLogged } from "../middlewares/guards.js";
import { registeredBookingUserSchema, unregisteredBookingUserSchema } from "../util/validationSchemes.js";
import preloader from "../middlewares/preloader.js";
import { preloadOptions } from "../environments/constants.js";
import { getSkaterById } from "../services/skaterService.js";
import { registeredUser, unregisteredUser } from "../services/bookingService.js";

const bookingController = Router();

// Unregistered user booking
bookingController.post(endpoints.unregistered_booking_user, isUserGuest, async (req, res, next) => {
  try {
    const userData = req.body;

    await unregisteredBookingUserSchema.validateAsync(userData);
    const newLessonBooked = await unregisteredUser(userData);

    res.status(200).json(newLessonBooked);
  } catch (error) {
    next(error);
  }
});

// Registered user booking
bookingController.post(endpoints.registered_booking_user, isUserLogged, preloader(getSkaterById, preloadOptions.checkSkater), isOwner, async (req, res, next) => {
  try {
    const bookingData = req.body;
    const ownerId = req.user._id;

    await registeredBookingUserSchema.validateAsync(bookingData);
    const newLessonsBooked = await registeredUser(bookingData, ownerId);

    res.status(200).json(newLessonsBooked);
  } catch (error) {
    next(error);
  }
});

export { bookingController };
