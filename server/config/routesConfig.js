import displayRequest from "../middlewares/displayRequest.js";

import { mainRoutes } from "../environments/endPoints.js";

import { homeController } from "../controllers/homeController.js";
import { userController } from "../controllers/userController.js";

const routesConfig = (app) => {
    // Middleware for displaying request information
    app.use(displayRequest());

    // Routes
    app.use(mainRoutes.home, homeController);
    app.use(mainRoutes.users, userController);

    // Handle 404 errors
    app.all(mainRoutes.allRoute, (req, res, next) => {
        const error = new Error(`Method '${req.method}' on path '${req.path}' is not found`);
        error.statusCode = 404;
        next(error);
    });
};

export default routesConfig;