import { Router } from "express";

import { endpoints } from "../environments/endPoints.js";
import { isUserGuest, isUserLogged } from "../middlewares/guards.js";
import { validateLoginSchema, validateRegisterSchema } from "../util/validationSchemes.js";

import {
    userLogin,
    userLogout,
    userRegister,
} from "../services/userService.js";

const userController = Router();

// Register
userController.post(endpoints.register, isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateRegisterSchema.validateAsync(userData);
        const data = await userRegister(userData);

        res.cookie(process.env.COOKIE_NAME, data.userToken, data.cookieOptions)
            .status(201)
            .json(data.user);
    } catch (error) {
        next(error);
    }
});

// Login
userController.post(endpoints.login, isUserGuest, async (req, res, next) => {
    try {
        const userData = req.body;

        await validateLoginSchema.validateAsync(userData);
        const data = await userLogin(userData);

        res.cookie(process.env.COOKIE_NAME, data.userToken, data.cookieOptions)
            .status(201)
            .json(data.user);
    } catch (error) {
        next(error);
    }
});

// Logout
userController.get(endpoints.logout, isUserLogged, async (req, res, next) => {
    try {
        const userToken = req.userToken;

        const logoutMsg = await userLogout(userToken);

        res.clearCookie(process.env.COOKIE_NAME)
            .status(200)
            .json(logoutMsg);
    } catch (error) {
        next(error);
    }
});

export { userController };