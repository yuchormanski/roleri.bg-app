import joi from 'joi';

import { userRole } from '../environments/constants.js';

const validateRegisterSchema = joi.object({
	name: joi.string().required().trim().max(100),
	email: joi.string().required().trim().email().lowercase(),
	phone: joi.number().required(),
	role: joi.string().allow('').optional().valid(userRole.admin, userRole.user, userRole.instructor).trim().lowercase(),
	password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/).required().trim().max(20).messages({
		'string.base': 'Password must be a string',
		'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
		'string.empty': 'Password is required',
		'string.trim': 'Password cannot contain leading or trailing spaces',
		'string.max': 'Password cannot be longer than {#limit} characters'
	}),
});

const validateLoginSchema = joi.object({
	email: joi.string().required().trim().email().lowercase(),
	password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/).required().trim().max(20).messages({
		'string.base': 'Password must be a string',
		'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
		'string.empty': 'Password is required',
		'string.trim': 'Password cannot contain leading or trailing spaces',
		'string.max': 'Password cannot be longer than {#limit} characters'
	}),
});

export {
	validateRegisterSchema,
	validateLoginSchema,
};

