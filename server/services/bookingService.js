import { UnregisteredUser } from "../models/UnregisteredUser.js";

// Handler of unregistered user data
const unregisteredUser = async ({ date, lessonId, ...userData }) => {
    const unregisteredUserData = await UnregisteredUser.create(userData);

    return { message: "Booking added successfully" };
};

export {
    unregisteredUser,
}