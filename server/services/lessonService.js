import { LessonModel } from '../models/LessonModel.js';

const getAllLessons = async () => populateLesson(LessonModel.find());

const getLessonById = async (lessonId) => populateLesson(LessonModel.findById(lessonId));

const addLesson = async (lessonData, userId) => {
    const checkForDateAndTime = checkDateAndTime(lessonData);
    const lesson = await LessonModel.create({ ...checkForDateAndTime, owner: userId });
    return populateLesson(LessonModel.findById(lesson._id));
};

const updateLesson = async (lessonData) => {
    const lesson = await LessonModel.findByIdAndUpdate(lessonData._id, checkDateAndTime(lessonData), { runValidators: true, new: true });
    return populateLesson(LessonModel.findById(lesson._id));
};

const deleteLesson = async (lessonId) => LessonModel.findByIdAndDelete(lessonId);

// Helper function 
// Function to global populate data for lessons
function populateLesson(query) {
    const populateFields = [
        { path: "age", select: "typeGroup" },
        { path: "type", select: "-__v -createdAt -updatedAt" },
        { path: "owner", select: "firstName lastName" }
    ];

    return query.populate(populateFields);
}

// Function to check if the time or date is missing to add default values
function checkDateAndTime(lessonObj) {
    const checkedObject = { ...lessonObj };

    if (!checkedObject.time) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        checkedObject.time = `${hours}:${minutes}`;
    }

    if (!checkedObject.validTo) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 100);
        checkedObject.validTo = new Date(date);
    }

    return checkedObject;
}

export {
    getAllLessons,
    getLessonById,
    addLesson,
    updateLesson,
    deleteLesson,
}