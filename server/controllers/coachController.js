import { Router } from 'express';
import { endpoints } from '../environments/endPoints.js';
import { isUserLogged, isUserRole } from '../middlewares/guards.js';
import preloader from '../middlewares/preloader.js';
import { getUserById } from '../services/userService.js';
import { preloadOptions, userRole } from '../environments/constants.js';
import { instructorCreateSchema } from '../util/validationSchemes.js';
import {
    addNote,
    getEquipmentForDate,
    getNearestLessonsDate,
    setIsPaidForSubscriptions,
    setIsPaidToFalse,
    setIsPaidToTrue,
    setIsPresentToFalse,
    setIsPresentToTrue,
    updateNote
} from '../services/coachService.js';

const coachController = Router();

// Get the nearest day from instructor
coachController.get(endpoints.get_coach_lessons,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const allCurrentLessons = await getNearestLessonsDate();

            res.status(200).json(allCurrentLessons);
        } catch (error) {
            next(error);
        }
    });

// Get equipment for date
coachController.get(endpoints.get_coach_lessons_equipment,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const allCurrentLessons = await getEquipmentForDate();

            res.status(200).json(allCurrentLessons);
        } catch (error) {
            next(error);
        }
    });

// Update status is present to true
coachController.put(endpoints.edit_coach_is_present,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const { bookingId } = req.body;
            const updatedBooking = await setIsPresentToTrue(bookingId);

            res.status(200).json({ message: 'Success!' });
        } catch (error) {
            next(error);
        }
    });

// Update status is present to false
coachController.put(endpoints.edit_coach_is_not_present,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const { bookingId } = req.body;
            const updatedBooking = await setIsPresentToFalse(bookingId);

            res.status(200).json({ message: 'Success!' });
        } catch (error) {
            next(error);
        }
    });

// Update status is paid to true
coachController.put(endpoints.edit_coach_is_paid,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const { bookingId, subscriptionCodeId } = req.body;

            if (subscriptionCodeId) {
                // Set true to all subscription (property isPaid: true)
                const booleanForIsPaidToBeSet = true;
                await setIsPaidForSubscriptions(subscriptionCodeId, booleanForIsPaidToBeSet);
                
            } else {
                // Set true only for single lesson (property isPaid: true)
                await setIsPaidToTrue(bookingId);
            }

            res.status(200).json({ message: 'Success!' });
        } catch (error) {
            next(error);
        }
    });

// Update status is paid to false
coachController.put(endpoints.edit_coach_is_not_paid,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const { bookingId, subscriptionCodeId } = req.body;

            if (subscriptionCodeId) {
                // Set false to all subscription (property isPaid: false)
                const booleanForIsPaidToBeSet = false;
                await setIsPaidForSubscriptions(subscriptionCodeId, booleanForIsPaidToBeSet);

            } else {
                // Set false only for single lesson (property isPaid: false)
                await setIsPaidToFalse(bookingId);
            }
            
            res.status(200).json({ message: 'Success!' });
        } catch (error) {
            next(error);
        }
    });

// Add coach note for skater
coachController.post(endpoints.add_coach_note,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const noteData = req.body;

            await instructorCreateSchema.validateAsync(noteData);
            const newNote = await addNote(noteData);

            res.status(200).json(newNote);
        } catch (error) {
            next(error);
        }
    });

// Update coach note for skater
coachController.put(endpoints.edit_coach_note,
    isUserLogged,
    preloader(getUserById, preloadOptions.getUserById),
    isUserRole([userRole.admin, userRole.instructor]),
    async (req, res, next) => {
        try {
            const noteData = req.body;

            await instructorCreateSchema.validateAsync(noteData);
            const updatedNote = await updateNote(noteData);

            res.status(200).json(updatedNote);
        } catch (error) {
            next(error);
        }
    });

export { coachController };