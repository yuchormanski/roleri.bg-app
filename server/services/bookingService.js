import { BookingModel } from "../models/BookingModel.js";
import { SubscriptionTypeModel } from "../models/SubscriptionTypeModel.js";
import { UnregisteredUser } from "../models/UnregisteredUser.js";
import { bookUserHelper } from "../util/bookUserHelper.js";

// Unregistered user booking
const unregisteredUser = async ({ date, lessonId, ...userData }) => {
    const [unregisteredUserData, subscriptionData] = await Promise.all([
        UnregisteredUser.create(userData),
        SubscriptionTypeModel.findById(userData.subscriptionType),
    ]);

    const bookingWithDate = bookUserHelper(date, lessonId, unregisteredUserData._id, userData.additionalRequirements, subscriptionData.subscriptionCount);
    const newLessonBooked = await BookingModel.insertMany(bookingWithDate);

    return newLessonBooked;
};

// Registered user booking
const registeredUser = async (bookingDataArray, ownerId) => {
    const bookingData = await Promise.all(bookingDataArray.map(async (b) => {
        const subscriptionData = await SubscriptionTypeModel.findById(b.subscriptionType);
        const bookingWithDate = bookUserHelper(b.date, b.lessonId, b.skaterId, b.additionalRequirements, subscriptionData.subscriptionCount, ownerId);
        return bookingWithDate;
    }));

    const flattenedBookingDataArray = bookingData.flatMap(arr => arr);

    const newLessonsBooked = await BookingModel.insertMany(flattenedBookingDataArray);
    return newLessonsBooked;
};

export {
    unregisteredUser,
    registeredUser,
}