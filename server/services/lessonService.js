import { LessonModel } from "../models/LessonModel.js";

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

export {
  getAllLessons,
  getAllValidLessons,
  getLessonById,
  addLesson,
  updateLesson,
  deleteLesson,
};
