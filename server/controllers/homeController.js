import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res, next) => {
    try {

        console.log('TEST ENDPOINT')

        res.status(200).json('TEST ENDPOINT');
    } catch (error) {
        next(error);
    }
});

export { homeController };