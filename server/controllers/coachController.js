import { Router } from 'express';
import { endpoints } from '../environments/endPoints.js';
import { isUserLogged, isUserRole } from '../middlewares/guards.js';
import preloader from '../middlewares/preloader.js';
import { getUserById } from '../services/userService.js';
import { preloadOptions, userRole } from '../environments/constants.js';
import { getNearestLessonsDate } from '../services/coachService.js';

const coachController = Router();

// Get the nearest day from instructor
coachController.get(endpoints.get_coach_lessons,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const allCurrentLessons = await getNearestLessonsDate();
            
            // instructorCreateSchema
            res.status(200).json(allCurrentLessons);
        } catch (error) {
            next(error);
        }
    });

export { coachController };

