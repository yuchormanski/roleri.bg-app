import { json, urlencoded } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import checkBlackListToken from '../middlewares/checkBlackListToken.js';

const expressConfig = async (app, config) => {

    app.use(cors({
        origin: config.origin,
        credentials: true,
    }));

    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(await checkBlackListToken());
    app.use(jwtMiddleware());

};

export default expressConfig;