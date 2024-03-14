import { BookingModel } from "../models/BookingModel.js";
import { IndividualDaysModel } from "../models/IndividualDaysModel.js";
import { SubscriptionTypeModel } from "../models/SubscriptionTypeModel.js";
import { UnregisteredUser } from "../models/UnregisteredUser.js";
import { RegularDaysModel } from "../models/RegularDaysModel.js";
import { bookUserHelper } from "../util/bookUserHelper.js";

// Unregistered user booking
const unregisteredUser = async ({ date, lessonId, ...userData }) => {
    const [unregisteredUserData, subscriptionData] = await Promise.all([
        UnregisteredUser.create(userData),
        SubscriptionTypeModel.findById(userData.subscriptionType),
    ]);

    const bookingWithDate = bookUserHelper(
        date,
        subscriptionData.subscriptionCount,
        lessonId,
        unregisteredUserData._id,
        userData.additionalRequirements,
        subscriptionData._id,
    );

    const newLessonBooked = await BookingModel.insertMany(bookingWithDate);

    return newLessonBooked;
};

// Registered user booking
const registeredUser = async (bookingDataArray, ownerId) => {
    const bookingData = await Promise.all(bookingDataArray.map(async (b) => {
        const subscriptionData = await SubscriptionTypeModel.findById(b.subscriptionType);
        const bookingWithDate = bookUserHelper(
            b.date,
            subscriptionData.subscriptionCount,
            b.lessonId,
            b.skaterId,
            b.additionalRequirements,
            b.subscriptionType,
            ownerId,
        );
        return bookingWithDate;
    }));

    const flattenedBookingDataArray = bookingData.flatMap(arr => arr);

    const newLessonsBooked = await BookingModel.insertMany(flattenedBookingDataArray);
    return newLessonsBooked;
};

// Get regular active days
const getRegularActiveDays = async () => {
    const availableDays = await RegularDaysModel.findOne().select('-__v -createdAt -updatedAt');
    return availableDays ? availableDays : getDefaultValuesFromActiveDays();
};

// Edit regular active days
const updateRegularActiveDays = async (regularActiveDaysDays) => {
    let daysData = await RegularDaysModel.findOne().select('-__v -createdAt -updatedAt');

    if (daysData) {
        daysData.set(regularActiveDaysDays);
        daysData.save();
    } else {
        await RegularDaysModel.create(regularActiveDaysDays);
        daysData = await RegularDaysModel.findOne().select('-__v -createdAt -updatedAt');
    }

    return daysData;
};

// Get individual active days
const getIndividualActiveDays = async () => {
    const availableDays = await IndividualDaysModel.findOne().select('-__v -createdAt -updatedAt');
    return availableDays ? availableDays : getDefaultValuesFromActiveDays('individual');
};

// Edit individual active days
const updateIndividualActiveDays = async (individualActiveDaysData) => {
    let daysData = await IndividualDaysModel.findOne().select('-__v -createdAt -updatedAt');

    if (daysData) {
        daysData.set(individualActiveDaysData);
        daysData.save();
    } else {
        await IndividualDaysModel.create(individualActiveDaysData);
        daysData = await IndividualDaysModel.findOne().select('-__v -createdAt -updatedAt');
    }

    return daysData;
};

// Get individual active days
const getRegularAndIndividualDays = async () => {
    const [regularDays, individualDays] = await Promise.all([
        await RegularDaysModel.findOne().select('-__v -createdAt -updatedAt'),
        await IndividualDaysModel.findOne().select('-__v -createdAt -updatedAt')
    ]);



    const combinedActiveDays = {
        regularDays: regularDays ? regularDays : getDefaultValuesFromActiveDays(),
        individualDays: individualDays ? individualDays : getDefaultValuesFromActiveDays('individual'),
    };

    return combinedActiveDays;
};

// Helper function
function getDefaultValuesFromActiveDays(option) {
    return {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: true,
        sun: true,
        ...(option === 'individual' && { start: "08:00", end: "20:00" }),
    };
}


export {
    unregisteredUser,
    registeredUser,
    getIndividualActiveDays,
    updateIndividualActiveDays,
    getRegularActiveDays,
    updateRegularActiveDays,
    getRegularAndIndividualDays,
}