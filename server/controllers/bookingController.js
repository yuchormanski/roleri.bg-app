import { Router } from "express";

import { endpoints } from "../environments/endPoints.js";
import { isUserGuest } from "../middlewares/guards.js";
import { unregisteredUSerCreateSchema } from "../util/validationSchemes.js";
import { unregisteredUser } from "../services/bookingService.js";

const bookingController = Router();

// Unregistered user data
bookingController.post(endpoints.unregistered_booking_user, isUserGuest, async (req, res, next) => {
  try {
    const userData = req.body;

    await unregisteredUSerCreateSchema.validateAsync(userData);
    const userMessage = await unregisteredUser(userData);

    res.status(200).json(userMessage);
  } catch (error) {
    next(error);
  }
});

export { bookingController };
