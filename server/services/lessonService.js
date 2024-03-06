import { LessonModel } from '../models/LessonModel.js';

const populateFields = [
    { path: "age", select: "typeGroup" },
    { path: "type", select: "-__v -createdAt -updatedAt" },
    { path: "owner", select: "firstName lastName" }
];

const populateLesson = (query) => {
    return query.populate(populateFields);
};

const getAllLessons = async () => populateLesson(LessonModel.find());

const getLessonById = async (lessonId) => populateLesson(LessonModel.findById(lessonId));

const addLesson = async (lessonData, userId) => {
    const lesson = await LessonModel.create({ ...lessonData, owner: userId });
    return populateLesson(LessonModel.findById(lesson._id));
};

const updateLesson = async (lessonData) => {
    const lesson = await LessonModel.findByIdAndUpdate(lessonData._id, lessonData, { runValidators: true, new: true });
    return populateLesson(LessonModel.findById(lesson._id));
};

const deleteLesson = async (lessonId) => LessonModel.findByIdAndDelete(lessonId);

export {
    getAllLessons,
    getLessonById,
    addLesson,
    updateLesson,
    deleteLesson,
}