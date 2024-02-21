import { Router } from "express";
import { isOwner, isUserLogged } from "../middlewares/guards.js";
import { endpoints } from "../environments/endPoints.js";
import { skaterCreateSchema } from "../util/validationSchemes.js";
import {
    addSkater,
    deleteSkater,
    getAllSkaters,
    getSkaterById,
    updateSkater
} from "../services/skaterService.js";
import preloader from "../middlewares/preloader.js";
import { preloadOptions } from "../environments/constants.js";

const skaterController = Router();

// Get all skaters
skaterController.get(endpoints.get_all_skaters, isUserLogged, async (req, res, next) => {
    try {
        const allSkaters = await getAllSkaters();

        res.status(200).json(allSkaters);
    } catch (error) {
        next(error);
    }
});

// Create skater
skaterController.post(endpoints.add_skater, isUserLogged, async (req, res, next) => {
    try {
        const parentId = req.user._id;
        const skaterData = req.body;

        await skaterCreateSchema.validateAsync(skaterData);
        const newSkater = await addSkater(parentId, skaterData);

        res.status(201).json(newSkater);
    } catch (error) {
        next(error);
    }
});

// Update skater
skaterController.put(endpoints.edit_skater, isUserLogged, preloader(getSkaterById, preloadOptions.editSkater), isOwner, async (req, res, next) => {
    try {
        const { _id: skaterId, ...skaterData } = req.body;

        const updatedSkater = await updateSkater(skaterId, skaterData);

        res.status(200).json(updatedSkater);
    } catch (error) {
        next(error);
    }
});

// Delete skater
skaterController.delete(endpoints.delete_skater, isUserLogged, preloader(getSkaterById, preloadOptions.deleteSkater), isOwner, async (req, res, next) => {
    try {
        const skaterId = req.params.skaterId;
        
        const deletedSkater = await deleteSkater(skaterId);

        res.status(200).json(deletedSkater);
    } catch (error) {
        next(error);
    }
});

export { skaterController };
