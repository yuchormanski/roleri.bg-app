import displayRequest from "../middlewares/displayRequest.js";

import { mainRoutes } from "../environments/endPoints.js";

import { homeController } from "../controllers/homeController.js";
import { userController } from "../controllers/userController.js";
import { lessonController } from "../controllers/lessonController.js";
import { skaterController } from "../controllers/skater.controller.js";
import { optionController } from "../controllers/optionController.js";
import { bookingController } from "../controllers/bookingController.js";
import { coachController } from "../controllers/coachController.js";

const routesConfig = (app) => {
    // Middleware for displaying request information
    app.use(displayRequest());

    // Routes
    app.use(mainRoutes.home, homeController);
    app.use(mainRoutes.users, userController);
    app.use(mainRoutes.lessons, lessonController);
    app.use(mainRoutes.skaters, skaterController);
    app.use(mainRoutes.options, optionController);
    app.use(mainRoutes.bookings, bookingController);
    app.use(mainRoutes.coach, coachController);

    // Handle 404 errors
    app.all(mainRoutes.allRoute, (req, res, next) => {
        const error = new Error(`Method '${req.method}' on path '${req.path}' is not found`);
        error.statusCode = 404;
        next(error);
    });
};

export default routesConfig;