import { Schema, model } from 'mongoose';

const lessonModelSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Image URL must start with http:// or https://'],
    },
    title: {
        type: String,
        required: true
    },
    titleInfo: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    participants: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    geoLocation: {
        lat: {
            type: String,
            default: null
        },
        lon: {
            type: String,
            default: null
        }
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const LessonModel = model('Lesson', lessonModelSchema);

export { LessonModel };