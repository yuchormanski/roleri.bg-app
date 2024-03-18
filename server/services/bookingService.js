import { BookingModel } from "../models/BookingModel.js";
import { IndividualDaysModel } from "../models/IndividualDaysModel.js";
import { SubscriptionTypeModel } from "../models/SubscriptionTypeModel.js";
import { UnregisteredUser } from "../models/UnregisteredUser.js";
import { RegularDaysModel } from "../models/RegularDaysModel.js";
import { bookUserHelper } from "../util/bookUserHelper.js";
import { CalendarExcludedOptions } from "../models/CalendarExcludedOptions.js";

// Get all booking
const getAllBooking = async (userId) => {
  const today = new Date();
  const bookings = await populateBookingData(
    BookingModel.find({
      owner: userId,
      date: { $gte: today }, // Date greater than or equal to today
      isRejected: false,
    })
  );

  return bookings;
};

// Get one booking
const getBookingById = async (bookingId) =>
  populateBookingData(BookingModel.findById(bookingId));

// Reject booking
const rejectBooking = async (bookingId) =>
  populateBookingData(
    BookingModel.findByIdAndUpdate(
      bookingId,
      { isRejected: true },
      { runValidators: true, new: true }
    )
  );

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
    subscriptionData._id
  );

  const newLessonBooked = await BookingModel.insertMany(bookingWithDate);

  return newLessonBooked;
};

// Registered user booking
const registeredUser = async (bookingDataArray, ownerId) => {
  const bookingData = await Promise.all(
    bookingDataArray.map(async (b) => {
      const subscriptionData = await SubscriptionTypeModel.findById(
        b.subscriptionType
      );
      const bookingWithDate = bookUserHelper(
        b.date,
        subscriptionData.subscriptionCount,
        b.lessonId,
        b.skaterId,
        b.additionalRequirements,
        b.subscriptionType,
        ownerId
      );
      return bookingWithDate;
    })
  );

  const flattenedBookingDataArray = bookingData.flatMap((arr) => arr);

  const newLessonsBooked = await BookingModel.insertMany(
    flattenedBookingDataArray
  );
  return newLessonsBooked;
};

// Get regular active days
const getRegularActiveDays = async () => {
  const availableDays = await RegularDaysModel.findOne().select(
    "-__v -createdAt -updatedAt"
  );
  return availableDays ? availableDays : getDefaultValuesFromActiveDays();
};

// Edit regular active days
const updateRegularActiveDays = async (regularActiveDaysDays) => {
  let daysData = await RegularDaysModel.findOne().select(
    "-__v -createdAt -updatedAt"
  );

  if (daysData) {
    daysData.set(regularActiveDaysDays);
    daysData.save();
  } else {
    await RegularDaysModel.create(regularActiveDaysDays);
    daysData = await RegularDaysModel.findOne().select(
      "-__v -createdAt -updatedAt"
    );
  }

  return daysData;
};

// Get individual active days
const getIndividualActiveDays = async () => {
  const availableDays = await IndividualDaysModel.findOne().select(
    "-__v -createdAt -updatedAt"
  );
  return availableDays
    ? availableDays
    : getDefaultValuesFromActiveDays("individual");
};

// Edit individual active days
const updateIndividualActiveDays = async (individualActiveDaysData) => {
  let daysData = await IndividualDaysModel.findOne().select(
    "-__v -createdAt -updatedAt"
  );

  if (daysData) {
    daysData.set(individualActiveDaysData);
    daysData.save();
  } else {
    await IndividualDaysModel.create(individualActiveDaysData);
    daysData = await IndividualDaysModel.findOne().select(
      "-__v -createdAt -updatedAt"
    );
  }

  return daysData;
};

// Get individual active days
const getRegularAndIndividualDays = async () => {
  const [regularDays, individualDays] = await Promise.all([
    await RegularDaysModel.findOne().select("-__v -createdAt -updatedAt"),
    await IndividualDaysModel.findOne().select("-__v -createdAt -updatedAt"),
  ]);

  const combinedActiveDays = {
    regularDays: regularDays ? regularDays : getDefaultValuesFromActiveDays(),
    individualDays: individualDays
      ? individualDays
      : getDefaultValuesFromActiveDays("individual"),
  };

  return combinedActiveDays;
};

// Add excluded options
const addExcludedOptions = async (excludedData) => {
  const currentDate = new Date();

  // Check if any of the new dates are before today
  if (excludedData.excludedUserDates.some(dateObj => new Date(dateObj.date) < currentDate)) {
    const wrongDates = excludedData.excludedUserDates
      .filter(dateObj => new Date(dateObj.date) < currentDate)
      .map(dateObj => new Date(dateObj.date).toLocaleDateString())
      .join(', ');
    throw new Error(`You are trying to enter an invalid date: ${wrongDates}`);
  }

  const existingDays = await CalendarExcludedOptions.findOne();

  return existingDays
    ? CalendarExcludedOptions.updateOne({}, excludedData)
    : CalendarExcludedOptions.create(excludedData);
};

// Get excluded options
const getExcludedOptions = async () => {
  const currentDate = new Date();
  const defaultValues = { daysBeforeLesson: [1, 2], excludedUserDates: [] };

  const foundDates = await CalendarExcludedOptions.findOne();
  if (foundDates) {
    // Filter out null dates or dates older than the current date
    foundDates.excludedUserDates = foundDates.excludedUserDates.filter(dateObj => {
      return dateObj.date && new Date(dateObj.date) > currentDate;
    });

    // Sort the excludedUserDates array by date in ascending order
    foundDates.excludedUserDates.sort((a, b) => new Date(a.date) - new Date(b.date));

    await foundDates.save();
  }

  return foundDates ? foundDates : defaultValues;
};

// Helper function
// Return default values from active days if the DB is empty
function getDefaultValuesFromActiveDays(option) {
  return {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: true,
    sun: true,
    ...(option === "individual" && { start: "08:00", end: "20:00" }),
  };
}

// Populate booking data helper
function populateBookingData(query) {
  const populatedPropsWithIncludeOrExcludeProps = [
    { path: "lessonId", select: "-__v" }, // Add or remove some property which are needed on frontend
    { path: "skaterId", select: "-__v" }, // Add or remove some property which are needed on frontend
    { path: "subscriptionId", select: "-__v" }, // Add or remove some property which are needed on frontend
  ];

  return query.populate(populatedPropsWithIncludeOrExcludeProps);
}

export {
  getAllBooking,
  unregisteredUser,
  registeredUser,
  getIndividualActiveDays,
  updateIndividualActiveDays,
  getRegularActiveDays,
  updateRegularActiveDays,
  getRegularAndIndividualDays,
  rejectBooking,
  getBookingById,
  addExcludedOptions,
  getExcludedOptions,
};
