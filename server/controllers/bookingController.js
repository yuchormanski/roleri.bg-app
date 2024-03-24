import { Router } from "express";

import { endpoints } from "../environments/endPoints.js";
import {
  isOwner,
  isUserGuest,
  isUserLogged,
  isUserRole,
} from "../middlewares/guards.js";
import preloader from "../middlewares/preloader.js";
import { preloadOptions, userRole } from "../environments/constants.js";
import { getSkaterById } from "../services/skaterService.js";
import { getUserById } from "../services/userService.js";
import {
  individualActiveDaysBookingSchema,
  registeredBookingUserSchema,
  regularActiveDaysBookingSchema,
  unregisteredBookingUserSchema,
} from "../util/validationSchemes.js";
import {
  addExcludedOptions,
  getAllBooking,
  getBookingById,
  getExcludedOptions,
  getIndividualActiveDays,
  getRegularActiveDays,
  getRegularAndIndividualDays,
  registeredUser,
  rejectBooking,
  unregisteredUser,
  updateIndividualActiveDays,
  updateRegularActiveDays,
} from "../services/bookingService.js";

const bookingController = Router();

// Get all booking
bookingController.get(
  endpoints.get_all_booking,
  isUserLogged,
  async (req, res, next) => {
    try {
      const userId = req.user._id;

      const allBooking = await getAllBooking(userId);

      res.status(200).json(allBooking);
    } catch (error) {
      next(error);
    }
  }
);

// Rejecting available booking
bookingController.put(
  endpoints.reject_booking,
  isUserLogged,
  preloader(getBookingById, preloadOptions.editSkater),
  isOwner,
  async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { _id: bookingId } = req.body;

      const rejectedBooking = await rejectBooking(bookingId, userId);

      res.status(200).json(rejectedBooking);
    } catch (error) {
      next(error);
    }
  }
);

// Unregistered user booking
bookingController.post(
  endpoints.unregistered_booking_user,
  isUserGuest,
  async (req, res, next) => {
    try {
      const userData = req.body;

      await unregisteredBookingUserSchema.validateAsync(userData);
      const newLessonBooked = await unregisteredUser(userData);

      res.status(200).json(newLessonBooked);
    } catch (error) {
      next(error);
    }
  }
);

// Registered user booking
bookingController.post(
  endpoints.registered_booking_user,
  isUserLogged,
  preloader(getSkaterById, preloadOptions.checkSkater),
  isOwner,
  async (req, res, next) => {
    try {
      const bookingData = req.body;
      const ownerId = req.user._id;

      await registeredBookingUserSchema.validateAsync(bookingData);
      const newLessonsBooked = await registeredUser(bookingData, ownerId);

      res.status(200).json(newLessonsBooked);
    } catch (error) {
      next(error);
    }
  }
);

// Get regular active days
bookingController.get(
  endpoints.get_active_days_regular,
  async (req, res, next) => {
    try {
      const activeDaysData = await getRegularActiveDays();

      res.status(200).json(activeDaysData);
    } catch (error) {
      next(error);
    }
  }
);

// Update regular active days
bookingController.put(
  endpoints.edit_active_days_regular,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const regularDaysData = req.body;

      await regularActiveDaysBookingSchema.validateAsync(regularDaysData);
      const editedActiveDaysData = await updateRegularActiveDays(
        regularDaysData
      );

      res.status(200).json(editedActiveDaysData);
    } catch (error) {
      next(error);
    }
  }
);

// Get individual active days
bookingController.get(
  endpoints.get_active_days_individual,
  async (req, res, next) => {
    try {
      const activeDaysData = await getIndividualActiveDays();

      res.status(200).json(activeDaysData);
    } catch (error) {
      next(error);
    }
  }
);

// Update individual active days
bookingController.put(
  endpoints.edit_active_days_individual,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const individualDaysData = req.body;

      await individualActiveDaysBookingSchema.validateAsync(individualDaysData);
      const editedActiveDaysData = await updateIndividualActiveDays(
        individualDaysData
      );

      res.status(200).json(editedActiveDaysData);
    } catch (error) {
      next(error);
    }
  }
);

// Get both active days regular and individual only for admin
bookingController.get(
  endpoints.get_active_days_admin,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const allActiveDaysData = await getRegularAndIndividualDays();

      res.status(200).json(allActiveDaysData);
    } catch (error) {
      next(error);
    }
  }
);

// get excluded options
bookingController.get(
  endpoints.get_excluded_options,

  async (req, res, next) => {
    try {
      const excludedOptions = await getExcludedOptions();
      res.status(200).json(excludedOptions);
    } catch (error) {
      next(error);
    }
  }
);
// add excluded options
bookingController.post(
  endpoints.add_excluded_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const excludedData = req.body;

      const excludedOptions = await addExcludedOptions(excludedData);

      res.status(200).json(excludedOptions);
    } catch (error) {
      next(error);
    }
  }
);

export { bookingController };
