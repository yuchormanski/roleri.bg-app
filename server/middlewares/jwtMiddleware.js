import verifyJwtToken from "../util/verifyJwtToken.js";
import { cookieName } from "../environments/constants.js";

const jwtMiddleware = () => (req, res, next) => {
    const token = req.cookies[cookieName];

    if (token) {
        try {
            const decodedToken = verifyJwtToken(token);

            req.user = decodedToken;
            req.userToken = token;
        } catch (error) {
            error.statusCode = 401;
            return next(error);
        }
    }

    next();
};

export default jwtMiddleware;