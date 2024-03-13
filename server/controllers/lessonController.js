import { Router } from "express";

import preloader from "../middlewares/preloader.js";
import { endpoints } from "../environments/endPoints.js";
import { getUserById } from "../services/userService.js";
import { preloadOptions, userRole } from "../environments/constants.js";
import { isUserLogged, isUserRole } from "../middlewares/guards.js";
import { lessonCreateSchema } from "../util/validationSchemes.js";
import { addLesson, deleteLesson, getAllLessons, updateLesson } from "../services/lessonService.js";

const lessonController = Router();

// Get all lessons
lessonController.get(endpoints.get_all_lessons, async (req, res, next) => {
  try {
    const allLessons = await getAllLessons();

    res.status(200).json(allLessons);
  } catch (error) {
    next(error);
  }
});

// Add new lesson
lessonController.post(
  endpoints.add_lesson,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const lessonData = req.body;
      const userId = req.user._id;

      await lessonCreateSchema.validateAsync(lessonData);
      const newLesson = await addLesson(lessonData, userId);

      res.status(201).json(newLesson);
    } catch (error) {
      next(error);
    }
  });

// Edit lesson
lessonController.put(
  endpoints.edit_lesson,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const lessonData = req.body;

      await lessonCreateSchema.validateAsync(lessonData);
      const updatedLesson = await updateLesson(lessonData);

      res.status(200).json(updatedLesson);
    } catch (error) {
      next(error);
    }
  });

// Delete lesson
lessonController.delete(
  endpoints.delete_lesson,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const lessonId = req.params.lessonId;

      const deletedLesson = await deleteLesson(lessonId);

      res.status(200).json(deletedLesson);
    } catch (error) {
      next(error);
    }
  });

export { lessonController };
