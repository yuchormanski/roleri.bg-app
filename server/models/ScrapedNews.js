import { Schema, model } from 'mongoose';

const newsSchema = new Schema({
    title: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    newsUrl: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String,
        default: null
    }
});

const ScrapedNews = model('ScrapedNews', newsSchema);

export { ScrapedNews };