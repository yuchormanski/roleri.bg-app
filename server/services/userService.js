import bcrypt from 'bcrypt';

import { UserParent } from "../models/UserParent.js";
import { BlackListToken } from '../models/BlackListToken.js';

import { userRole } from '../environments/constants.js';
import { generateUserToken } from '../util/signJwtToken.js';

// Register
const userRegister = async ({ name, email, phone, role, password }) => {
    let currentUserRole = role || userRole.user;

    // Check if the user has already exist
    const userExistenceCheck = await UserParent.aggregate([
        {
            $facet: {
                count: [{ $count: "total" }],
                user: [{ $match: { email: email } }]
            }
        },
        {
            $project: {
                total: { $arrayElemAt: ["$count.total", 0] },
                user: { $arrayElemAt: ["$user", 0] }
            }
        }
    ]);

    const isFirstUserInDB = userExistenceCheck[0].total ? false : true;  // If total is undefined isFirstUserInDB - true otherwise is false
    const isUserExist = userExistenceCheck[0].user ? true : false;       // If user exists isUserExist is true otherwise is false

    if (isFirstUserInDB) {
        // No users exist, register the first user with admin role
        currentUserRole = userRole.admin;

    } else if (isUserExist) {
        // User already exists
        throw new Error('Email is already taken');
    }

    // Hash password
    const roundsBcrypt = Number(process.env.ROUNDS_BCRYPT);
    const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

    // Create user
    const user = await UserParent.create({
        name,
        email,
        phone,
        role: currentUserRole,
        password: hashedPassword
    });

    // Create token
    const userToken = await generateUserToken(user);

    // Create cookie options
    const cookieOptions = process.env.NODE_ENV === 'production'
        ? { httpOnly: true, secure: true, sameSite: 'strict', maxAge: calculateExpirePeriodCookieInDay() }
        : { httpOnly: true, maxAge: calculateExpirePeriodCookieInDay() };

    return { userToken, cookieOptions, user: createUserDetailsObject(user) };
};

// Login
const userLogin = async ({ email, password }) => {
    // Check if the user with this email exists
    const user = await UserParent.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Validate password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error('Invalid email or password');
    }

    // Create token
    const userToken = await generateUserToken(user);

    // Create cookie options
    const cookieOptions = process.env.NODE_ENV === 'production'
        ? { httpOnly: true, secure: true, sameSite: 'strict', maxAge: calculateExpirePeriodCookieInDay() }
        : { httpOnly: true, maxAge: calculateExpirePeriodCookieInDay() };

    return { userToken, cookieOptions, user: createUserDetailsObject(user) };
};

// Logout
const userLogout = async (userToken) => {
    await BlackListToken.create({ token: userToken });

    return { message: 'Successful logout' };
};



// Helper functions

// Calculate the cookie expiration period
function calculateExpirePeriodCookieInDay(day = 30) {
    const expirePeriodCookie = Number(day) * 24 * 60 * 60 * 1000; // days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    return expirePeriodCookie;
}

// Data to return to front-end
function createUserDetailsObject(user) {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
    };
}

export {
    userRegister,
    userLogin,
    userLogout,
};