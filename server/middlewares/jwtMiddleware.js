import verifyJwtToken from "../util/verifyJwtToken.js";

const jwtMiddleware = () => (req, res, next) => {
    const token = req.headers['x-authorization'];;

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