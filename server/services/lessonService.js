import { BookingModel } from "../models/BookingModel.js";
import { LessonModel } from "../models/LessonModel.js";
import { emailTemplate } from "../util/emailTemplate.js";
import { sendMail } from "../util/sendMail.js";

const getAllValidLessons = async () => {
  const currentDate = new Date();
  return populateLesson(
    LessonModel.find({ validTo: { $gte: currentDate }, isIndividual: false })
  );
};

const getAllLessons = async () => populateLesson(LessonModel.find());

const getLessonById = async (lessonId) =>
  populateLesson(LessonModel.findById(lessonId));

const addLesson = async (lessonData, userId) => {
  const checkForDateAndTime = checkDate(lessonData);
  const lesson = await LessonModel.create({
    ...checkForDateAndTime,
    owner: userId,
  });
  return populateLesson(LessonModel.findById(lesson._id));
};

const updateLesson = async (lessonData) => {
  const lesson = await LessonModel.findByIdAndUpdate(
    lessonData._id,
    checkDate(lessonData),
    { runValidators: true, new: true }
  );
  return populateLesson(LessonModel.findById(lesson._id));
};

const deleteLesson = async (lessonId) =>
  LessonModel.findByIdAndDelete(lessonId);

// Helper function
// Function to global populate data for lessons
function populateLesson(query) {
  const populateFields = [
    { path: "age", select: "typeGroup" },
    { path: "type", select: "-__v -createdAt -updatedAt" },
    { path: "owner", select: "firstName lastName" },
  ];

  return query.populate(populateFields);
}

// Function to check if date is missing to add default values
function checkDate(lessonObj) {
  const checkedObject = { ...lessonObj };

  if (!checkedObject.validTo) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 100);
    checkedObject.validTo = new Date(date);
  }

  return checkedObject;
}

async function postponeLessonUsers(activeLessonBookedUsersCustomIds, message) {

  return BookingModel.aggregate([
    { $match: { subscriptionCodeId: { $in: activeLessonBookedUsersCustomIds } } }, // Find documents with ids in the given array

    {
      $lookup: {
        from: "userparents", // Name of the collection to join
        let: { ownerId: "$owner" }, // Define a variable to reference the owner field
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$ownerId"] } // Match documents based on equality of _id and ownerId
            }
          },
          {
            // Take only the needed properties 
            $project: {
              firstName: 1,
              lastName: 1,
              email: 1,
              phone: 1
            }
          }
        ],
        as: "populatedOwner" // Output array field where the joined documents will be stored
      }
    },

    // Overwrite populatedOwner property with the single document in the array
    {
      $addFields: {
        populatedOwner: { $arrayElemAt: ["$populatedOwner", 0] } // Extract the single document from the array
      }
    },

    { $group: { _id: "$subscriptionCodeId", count: { $sum: 1 }, documents: { $push: "$$ROOT" } } }, // Group by id and count occurrences

  ]).then(async groups => {

    // Split the single lesson and subscription 
    const { singleLessons, subscriptionBaseLessons } = groups.reduce((acc, value) => {
      if (value.count === 1) {
        acc.singleLessons.push(...value.documents);
      } else {
        acc.subscriptionBaseLessons.push(...value.documents);
      }

      return acc;
    }, { singleLessons: [], subscriptionBaseLessons: [] })

    // For each created group find every document and updated the date property(+7 days)
    subscriptionBaseLessons.forEach(doc => doc.date = new Date(doc.date.getTime() + 7 * 24 * 60 * 60 * 1000));

    // Add cancelation msg to all canceled single lessons also set isRejected so the lessons wont show up in profile
    singleLessons.forEach(doc => {
      doc.cancellationMessage = message;
      doc.isRejected = true;
    });

    // Combine single and subscription base lesson
    const finalResult = [...singleLessons, ...subscriptionBaseLessons];

    // Update the document in the base
    const promises = finalResult.map(doc =>
      BookingModel.findByIdAndUpdate(doc._id, { date: doc.date, cancellationMessage: doc.cancellationMessage, isRejected: doc.isRejected }, { new: true, runValidators: true })
    );
    const postponeUsers = await Promise.all(promises);
   
    // TODO: Change the information in htmlTemplate and show more personalized info
    // Create email template
    const htmlTemplate = emailTemplate({
      title: 'Отменен урок',
      header: 'Съжаляваме да ви информираме, но урокът за който сте записан бе отменен. Може да намерите повече информация в описанието по долу.',
      content: [`${message}`],
    });

    // Get all unique emails
    const emails = new Set()

    finalResult.forEach(document => {
      if (!emails.has(document.populatedOwner.email)) {
        emails.add(document.populatedOwner.email);
      }
    });

    // Send emails 
    emails.forEach(email => sendMail(email, htmlTemplate));

    return postponeUsers;
  });
}

export {
  getAllLessons,
  getAllValidLessons,
  getLessonById,
  addLesson,
  updateLesson,
  deleteLesson,
  postponeLessonUsers
};
