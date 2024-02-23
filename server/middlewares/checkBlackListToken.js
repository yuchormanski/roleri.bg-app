import { BlackListToken } from "../models/BlackListToken.js";
import { cookieName } from "../environments/constants.js";

const checkBlackListToken = async () => async (req, res, next) => {
    const token = req.cookies[cookieName];

    if (token) {
        try {
            const isExistToken = await BlackListToken.findOne({ token });
            if (isExistToken) {
                throw new Error('Token is already used');
            }

        } catch (error) {
            error.statusCode = 401;
            return next(error);
        }
    }

    next();
};

export default checkBlackListToken;