import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res, next) => {
    try {
        const user = req.user;
        console.log('TEST ENDPOINT')
        console.log(user);

        res.status(200).json('TEST ENDPOINT');
    } catch (error) {
        next(error);
    }
});

export { homeController };