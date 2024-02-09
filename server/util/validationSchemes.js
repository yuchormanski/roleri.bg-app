import joi from 'joi';

import { userRole } from '../environments/constants.js';

const validateRegisterSchema = joi.object({
	name: joi.string().required().trim().max(100),
	email: joi.string().required().trim().email().lowercase(),
	phone: joi.number().required(),
	role: joi.string().allow('').optional().valid(userRole.admin, userRole.user, userRole.instructor).trim().lowercase(),
	password: joi.string().required().trim().min(6).max(20),
});

const validateLoginSchema = joi.object({
	email: joi.string().required().trim().email().lowercase(),
	password: joi.string().required().trim().min(6).max(20),
});

export {
	validateRegisterSchema,
	validateLoginSchema,
};

