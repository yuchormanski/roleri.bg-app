import { LessonModel } from '../models/LessonModel.js';

const getAllLessons = async () => LessonModel.find();

const getLessonById = async (lessonId) => LessonModel.findById(lessonId);

const addLesson = (lessonData) => LessonModel.create(lessonData); // TODO To decide if the user can reference to this model or not

const updateLesson = (lessonId, lessonData) => LessonModel.findByIdAndUpdate(lessonId, lessonData, { runValidators: true, new: true });

const deleteLesson = async (lessonId) => LessonModel.findByIdAndDelete(lessonId);

export {
    getAllLessons,
    getLessonById,
    addLesson,
    updateLesson,
    deleteLesson,
}