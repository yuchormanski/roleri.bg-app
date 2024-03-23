import { Schema, Types, model } from 'mongoose';

const instructorNotesSchema = new Schema({
    instructor: {
        type: Types.ObjectId,
        ref: 'UserParent',
        required: true,
    },
    skater: {
        type: Types.ObjectId,
        ref: 'Skater',
        required: true,
    },
    content: {
        type: String,
        default: null,
        maxlength: 800,
    }
}, { timestamps: true });

const InstructorNotesModel = model('InstructorNotes', instructorNotesSchema);

export { InstructorNotesModel };