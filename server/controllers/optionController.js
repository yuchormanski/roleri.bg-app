import { Router } from 'express';

import { isUserLogged, isUserRole } from '../middlewares/guards.js';
import preloader from '../middlewares/preloader.js';
import { endpoints } from '../environments/endPoints.js';
import { preloadOptions, userRole } from '../environments/constants.js';

import { getUserById } from '../services/userService.js';
import { createOption, getAllOptionsSkatesData } from '../services/optionService.js';

const optionController = Router();

// Get all options for skates
optionController.get(endpoints.get_all_options, isUserLogged, async (req, res, next) => {
    try {
        const optionSkaterData = await getAllOptionsSkatesData();

        res.status(200).json(optionSkaterData);
    } catch (error) {
        next(error);
    }
});

// Create options for skates
optionController.post(endpoints.add_options, isUserLogged, preloader(getUserById, preloadOptions.getUserById), isUserRole(userRole.admin), async (req, res, next) => {
    try {
        const { optionNameData, ...data } = req.body;

        const newOption = await createOption(optionNameData, data);
        const optionData = newOption.toObject();

        res.status(201).json({ ...optionData, optionNameData });
    } catch (error) {
        next(error);
    }
});

export { optionController };