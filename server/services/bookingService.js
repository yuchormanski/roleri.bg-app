import { BookingModel } from "../models/BookingModel.js";
import { IndividualDaysModel } from "../models/IndividualDaysModel.js";
import { SubscriptionTypeModel } from "../models/SubscriptionTypeModel.js";
import { UnregisteredUser } from "../models/UnregisteredUser.js";
import { RegularDaysModel } from "../models/RegularDaysModel.js";
import { bookUserHelper } from "../util/bookUserHelper.js";
import { CalendarExcludedOptions } from "../models/CalendarExcludedOptions.js";
import { emailTemplate } from "../util/emailTemplate.js";
import { sendMail } from "../util/sendMail.js";
import { UserParent } from "../models/UserParent.js";
import { userRole } from "../environments/constants.js";

// Get all booking
const getAllBooking = async (userId) => {
  const today = new Date();

  const bookings = await populateBookingData(
    BookingModel.find({
      owner: userId,
      date: { $gte: today }, // Date greater than or equal to today
      isRejected: false,
    })
  ).sort({ date: 1 });

  return bookings;
};

// Get one booking
const getBookingById = async (bookingId) =>
  populateBookingData(BookingModel.findById(bookingId));

// Reject booking
const rejectBooking = async (bookingId, ownerId) => {
  const [currentBooking, currentUserParent, adminUserData] = await Promise.all([
    populateBookingData(
      BookingModel.findByIdAndUpdate(
        bookingId,
        { isRejected: true },
        { runValidators: true, new: true }
      )
    ),
    UserParent.findById(ownerId),
    UserParent.find({ role: userRole.admin }, { email: 1, _id: 0 }),
  ]);

  // Get all emails for all admins to be sent at once
  const onlyAminEmails = [...adminUserData.map((e) => e.email)].join(", ");

  // Get common details content for admins and user
  const emailCommonContent = [
    `
      ${currentBooking.skaterId.firstName} ${
      currentBooking.skaterId.lastName
    } canceled the
      ${currentBooking.lessonId.title
        .split("&/&")
        .at(1)} skating lesson scheduled for 
      ${new Date(currentBooking.date).toLocaleDateString("fr-CH")} at 
      ${currentBooking.lessonId.time}h
    `,
  ];

  // Add html template to be sent by email only for client
  const htmlTemplateUser = emailTemplate({
    title: "Reject Booking",
    header: "Your skating lesson has been canceled",
    content: [
      ...emailCommonContent,
      "We look forward to seeing you again soon!",
    ],
  });

  // Send mail to client
  sendMail(currentUserParent.email, htmlTemplateUser);

  // Add html template to be sent by email for all admins
  const htmlTemplateAdmin = emailTemplate({
    title: "Reject Booking",
    header: `${currentBooking.skaterId.firstName} ${currentBooking.skaterId.lastName} canceled the lesson`,
    content: emailCommonContent,
  });
  // Send mail to all admins
  sendMail(onlyAminEmails, htmlTemplateAdmin);

  return currentBooking;
};

// Unregistered user booking
const unregisteredUser = async ({ date, lessonId, ...userData }) => {
  let currentUser;

  const [foundUnregisterUser, foundRegisterUser, adminEmails] =
    await Promise.all([
      UnregisteredUser.findOne({ email: userData.email }),
      UserParent.findOne({ email: userData.email }),
      UserParent.find({ role: userRole.admin }, { email: 1, _id: 0 }),
    ]);

  // Get all emails for all admins to be sent at once
  const onlyAminEmails = [...adminEmails.map((e) => e.email)].join(", ");

  if (foundUnregisterUser || foundRegisterUser) {
    currentUser = foundUnregisterUser || foundRegisterUser;
  } else {
    currentUser = await UnregisteredUser.create(userData);
  }

  const subscriptionData = await SubscriptionTypeModel.findById(
    userData.subscriptionType
  );

  const bookingWithDate = bookUserHelper(
    date,
    subscriptionData.subscriptionCount,
    lessonId,
    currentUser._id,
    userData.additionalRequirements,
    subscriptionData._id
  );

  const bookingData = bookingWithDate.at(0);
  const newLessonBooked = await BookingModel.create(bookingData);
  const currentBook = await BookingModel.findById(newLessonBooked._id).populate(
    "lessonId"
  );

  // Add a reset template to be sent by email
  const adminTemplate = emailTemplate({
    title: "New Booking",
    header: `${currentUser.firstName} ${currentUser.lastName} signed for a lesson`,
    content: [
      `${currentUser.firstName} ${
        currentUser.lastName
      } for skate lesson in group 
      ${currentBook.lessonId.title.split("&/&").at(1)} on 
      ${new Date(currentBook.date).toLocaleDateString("fr-CH")} from 
      ${currentBook.lessonId.time}h`,
      `Email for contact to confirm the lesson: ${currentUser.email}`,
    ],
  });

  // const htmlTemplate = emailTemplate({
  //   title: "New Booking",
  //   header: "You signed up for a skate lesson",
  //   content: [
  //     `You are signed for skate lesson in group
  //     ${currentBook.lessonId.title.split("&/&").at(1)} on
  //     ${new Date(currentBook.date).toLocaleDateString("fr-CH")} from
  //     ${currentBook.lessonId.time}h`,
  //     "Please ensure that you arrive at least 15 minutes before the lesson.",
  //     "Enjoy the ride!",
  //   ],
  // });

  // Send mail to client
  // sendMail(currentUser.email, htmlTemplate);

  // Send mail to all admins
  sendMail(onlyAminEmails, adminTemplate);

  return newLessonBooked;
};

// Registered user booking
const registeredUser = async (bookingDataArray, ownerId) => {
  const newBookings = [];

  // Iterate over each booking data
  for (const bookingData of bookingDataArray) {
    // Check if the user has a previous booking for the same lesson on the specific date
    const existingBooking = await BookingModel.findOne({
      skaterId: bookingData.skaterId,
      date: new Date(bookingData.date),
    });

    // If user has a previous booking, throw an error
    if (existingBooking) {
      throw new Error("User already has a booking for the specified date.");
    }

    // If no previous booking found, proceed to create a new booking
    const subscriptionData = await SubscriptionTypeModel.findById(
      bookingData.subscriptionType
    );
    const bookingWithDate = bookUserHelper(
      bookingData.date,
      subscriptionData.subscriptionCount,
      bookingData.lessonId,
      bookingData.skaterId,
      bookingData.additionalRequirements,
      bookingData.subscriptionType,
      ownerId
    );
    newBookings.push(...bookingWithDate);
  }

  // Insert new bookings into the database
  const newLessonsBooked = await BookingModel.insertMany(newBookings);

  const userDataArray = [];
  // Iterate over each booking to gather user data
  for (const booking of newLessonsBooked) {
    const currentBook = await BookingModel.findById(booking._id).populate([
      "lessonId",
      "skaterId",
    ]);

    // Compose data for the current user
    const currentUserData = `
    ${currentBook.skaterId.firstName} ${
      currentBook.skaterId.lastName
    } is signed up for a skate lesson
    ${currentBook.lessonId.title.split("&/&").at(1)} on 
    ${new Date(currentBook.date).toLocaleDateString("fr-CH")} from 
    ${currentBook.lessonId.time} h
    `;

    userDataArray.push(currentUserData);
  }

  const [currentUserParent, adminEmails] = await Promise.all([
    UserParent.findById(ownerId),
    UserParent.find({ role: userRole.admin }, { email: 1, _id: 0 }),
  ]);

  // Get all emails for all admins to be sent at once
  const onlyAminEmails = [...adminEmails.map((e) => e.email)].join(", ");

  // // Add html template to be sent by email
  // const htmlTemplate = emailTemplate({
  //   title: "New Booking",
  //   header: "You signed up for a skate lesson",
  //   content: [
  //     ...userDataArray,
  //     "Please ensure that you arrive at least 15 minutes before the lesson.",
  //     "Enjoy the ride!",
  //   ],
  // });

  // // Send mail to client
  // sendMail(currentUserParent.email, htmlTemplate);

  const adminTemplate = emailTemplate({
    title: "New Booking",
    header: `You have new signed lessons`,
    content: [
      ...userDataArray,
      `Email for contact to confirm the lesson: ${currentUserParent.email}`,
    ],
  });
  // Send mail to all admins
  sendMail(onlyAminEmails, adminTemplate);

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
  if (
    excludedData.excludedUserDates.some(
      (dateObj) => new Date(dateObj.date) < currentDate
    )
  ) {
    const wrongDates = excludedData.excludedUserDates
      .filter((dateObj) => new Date(dateObj.date) < currentDate)
      .map((dateObj) => new Date(dateObj.date).toLocaleDateString())
      .join(", ");
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
    foundDates.excludedUserDates = foundDates.excludedUserDates.filter(
      (dateObj) => {
        return dateObj.date && new Date(dateObj.date) > currentDate;
      }
    );

    // Sort the excludedUserDates array by date in ascending order
    foundDates.excludedUserDates.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

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
