import { BookingModel } from "../models/BookingModel.js";
import { InstructorNotesModel } from "../models/InstructorNotes.js";

// Set Skater is present to true
const setIsPresentToTrue = async (bookingId) => BookingModel.findByIdAndUpdate(bookingId, { isPresent: true }, { runValidators: true, new: true });

// Set Skater is present to false
const setIsPresentToFalse = async (bookingId) => BookingModel.findByIdAndUpdate(bookingId, { isPresent: false }, { runValidators: true, new: true });

// Set Skater is paid to true
const setIsPaidToTrue = async (bookingId) => BookingModel.findByIdAndUpdate(bookingId, { isPaid: true }, { runValidators: true, new: true });

// Set Skater is paid to false
const setIsPaidToFalse = async (bookingId) => BookingModel.findByIdAndUpdate(bookingId, { isPaid: false }, { runValidators: true, new: true });

// Add instructor note
const addNote = async (noteData) => {
    const foundNote = await InstructorNotesModel.findOne({ skater: noteData.skater });

    let newNote;
    if (foundNote) {
        newNote = await InstructorNotesModel.findByIdAndUpdate({ _id: foundNote._id }, noteData, { runValidators: true, new: true });
    } else {
        newNote = await InstructorNotesModel.create(noteData);
    }

    return newNote;
};

// Update instructor note
const updateNote = async (noteData) => {
    const foundNote = await InstructorNotesModel.findOne({ skater: noteData.skater });
    if (!foundNote) {
        throw new Error('Note not found');
    }

    return InstructorNotesModel.findByIdAndUpdate({ _id: foundNote._id }, noteData, { runValidators: true, new: true });
};

// Get all next lesson for all instructors and admins
const getNearestLessonsDate = async () => {
    const currentDate = new Date();

    const aggregationPipeline = [
        // Match bookings with dates greater than or equal to currentDate
        {
            $match: { date: { $gte: currentDate } }
        },
        // Group by date and get the minimum date in each group
        {
            $group: {
                _id: null,
                earliestDate: { $min: "$date" },
                bookings: { $push: "$$ROOT" } // Push all fields of the original documents into an array
            }
        },
        // Project only the earliest date and related bookings
        {
            $project: {
                _id: 0,
                date: "$earliestDate",
                bookings: {
                    $filter: {
                        input: "$bookings",
                        as: "booking",
                        cond: { $eq: ["$$booking.date", "$earliestDate"] } // Filter only the bookings with the earliest date
                    }
                }
            }
        },
        // Unwind the filtered bookings array to process each booking separately
        { $unwind: "$bookings" },
        // Filter out the bookings with isRejected = false
        {
            $match: { "bookings.isRejected": false }
        },
        // Lookup lesson, skater, owner, and instructor details
        {
            $lookup: {
                from: 'lessons',
                localField: 'bookings.lessonId',
                foreignField: '_id',
                as: 'lesson'
            }
        },
        {
            $lookup: {
                from: 'skaters',
                localField: 'bookings.skaterId',
                foreignField: '_id',
                as: 'skater'
            }
        },
        {
            $lookup: {
                from: 'userparents',
                localField: 'bookings.owner',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        },
        {
            $lookup: {
                from: 'instructornotes',
                localField: 'skater._id',
                foreignField: 'skater',
                as: 'instructorNotes'
            }
        },
        {
            $lookup: {
                from: 'skates',
                localField: 'skater.skatesSize',
                foreignField: '_id',
                as: 'skatesSize'
            }
        },
        {
            $lookup: {
                from: 'protections',
                localField: 'skater.protection',
                foreignField: '_id',
                as: 'protection'
            }
        },
        // Project to shape the data according to the desired structure
        {
            $project: {
                _id: "$bookings._id",
                date: 1,
                lesson: { $arrayElemAt: ["$lesson", 0] },
                skater: { $arrayElemAt: ["$skater", 0] },
                ownerDetails: { $arrayElemAt: ["$ownerDetails", 0] },
                additionalRequirements: "$bookings.additionalRequirements",
                instructorNotes: { $cond: { if: { $eq: [{ $size: "$instructorNotes" }, 0] }, then: null, else: { $arrayElemAt: ["$instructorNotes.content", 0] } } },
                skatesSize: { $arrayElemAt: ["$skatesSize.size", 0] }, // Extracting direct value
                protection: { $arrayElemAt: ["$protection.size", 0] } // Extracting direct value
            }
        },
        // Project to convert lesson, skater, and ownerDetails to objects
        {
            $project: {
                _id: 1,
                date: 1,
                lesson: {
                    title: "$lesson.title",
                    time: "$lesson.time"
                },
                skater: {
                    _id: "$skater._id",
                    firstName: "$skater.firstName",
                    lastName: "$skater.lastName",
                    additionalRequirements: "$skater.additionalRequirements",
                    skatesSize: "$skatesSize", // Direct value
                    protection: "$protection" // Direct value
                },
                ownerDetails: {
                    firstName: "$ownerDetails.firstName",
                    lastName: "$ownerDetails.lastName",
                    email: "$ownerDetails.email",
                    phone: "$ownerDetails.phone"
                },
                additionalRequirements: 1,
                instructorNotes: 1
            }
        }
    ];

    // Execute aggregation pipeline
    const result = await BookingModel.aggregate(aggregationPipeline);

    // Group lessons by title
    const groupedLessons = result.reduce((acc, lesson) => {
        const title = lesson.lesson.title;
        if (!acc[title]) {
            acc[title] = [];
        }
        acc[title].push(lesson);
        return acc;
    }, {});

    return groupedLessons;
};

export {
    getNearestLessonsDate,
    setIsPresentToTrue,
    setIsPresentToFalse,
    setIsPaidToTrue,
    setIsPaidToFalse,
    addNote,
    updateNote,
};





// All data Attention this request return and user password: // const getNearestLessonsDate = async () => {
//     const currentDate = new Date();

//     const aggregationPipeline = [
//         // Match bookings with dates greater than or equal to currentDate
//         {
//             $match: { date: { $gte: currentDate } }
//         },
//         // Group by date and get the minimum date in each group
//         {
//             $group: {
//                 _id: null,
//                 earliestDate: { $min: "$date" },
//                 bookings: { $push: "$$ROOT" } // Push all fields of the original documents into an array
//             }
//         },
//         // Project only the earliest date and related bookings
//         {
//             $project: {
//                 _id: 1,
//                 earliestDate: 1,
//                 bookings: {
//                     $filter: {
//                         input: "$bookings",
//                         as: "booking",
//                         cond: { $eq: ["$$booking.date", "$earliestDate"] } // Filter only the bookings with the earliest date
//                     }
//                 }
//             }
//         },
//         // Unwind the filtered bookings array to process each booking separately
//         { $unwind: "$bookings" },
//         // Filter out the bookings with isRejected = false
//         {
//             $match: { "bookings.isRejected": false }
//         },
//         // Lookup lesson, skater, subscription, owner, and instructor details
//         {
//             $lookup: {
//                 from: 'lessons',
//                 localField: 'bookings.lessonId',
//                 foreignField: '_id',
//                 as: 'bookings.lesson'
//             }
//         },
//         {
//             $lookup: {
//                 from: 'skaters',
//                 localField: 'bookings.skaterId',
//                 foreignField: '_id',
//                 as: 'bookings.skater'
//             }
//         },
//         {
//             $lookup: {
//                 from: 'subscriptions',
//                 localField: 'bookings.subscriptionId',
//                 foreignField: '_id',
//                 as: 'bookings.subscription'
//             }
//         },
//         {
//             $lookup: {
//                 from: 'userparents',
//                 localField: 'bookings.owner',
//                 foreignField: '_id',
//                 as: 'bookings.ownerDetails'
//             }
//         },
//         {
//             $lookup: {
//                 from: 'userparents',
//                 localField: 'bookings.instructorId',
//                 foreignField: '_id',
//                 as: 'bookings.instructorDetails'
//             }
//         },
//         // Project only required fields from each lookup
//         {
//             $project: {
//                 _id: "$bookings._id", // Include the id field
//                 date: "$bookings.date",
//                 isPresent: "$bookings.isPresent",
//                 isPaid: "$bookings.isPaid",
//                 isRejected: "$bookings.isRejected",
//                 additionalRequirements: "$bookings.additionalRequirements",
//                 lesson: { $arrayElemAt: ['$bookings.lesson', 0] },
//                 skater: { $arrayElemAt: ['$bookings.skater', 0] },
//                 subscription: { $arrayElemAt: ['$bookings.subscription', 0] },
//                 ownerDetails: { $arrayElemAt: ['$bookings.ownerDetails', 0] },
//                 instructorDetails: { $arrayElemAt: ['$bookings.instructorDetails', 0] },
//             }
//         },
//         // Lookup instructor notes for each skater
//         {
//             $lookup: {
//                 from: 'instructornotes',
//                 localField: 'skater._id',
//                 foreignField: 'skater',
//                 as: 'instructorNotes'
//             }
//         },
//         // Lookup skatesSize and protection for each skater
//         {
//             $lookup: {
//                 from: 'skates',
//                 localField: 'skater.skatesSize',
//                 foreignField: '_id',
//                 as: 'skaterDetails.skatesSize'
//             }
//         },
//         {
//             $lookup: {
//                 from: 'protections',
//                 localField: 'skater.protection',
//                 foreignField: '_id',
//                 as: 'skaterDetails.protection'
//             }
//         },
//         // Add fields to replace existing skater.skatesSize and skater.protection
//         {
//             $addFields: {
//                 'skater.skatesSize': { $arrayElemAt: ['$skaterDetails.skatesSize', 0] },
//                 'skater.protection': { $arrayElemAt: ['$skaterDetails.protection', 0] },
//                 "instructorNotes": {
//                     $cond: { if: { $eq: [{ $size: "$instructorNotes" }, 0] }, then: null, else: "$instructorNotes" }
//                 }
//             }
//         },
//         // Project to remove unnecessary fields
//         {
//             $project: {
//                 _id: 1,
//                 date: 1,
//                 isPresent: 1,
//                 isPaid: 1,
//                 isRejected: 1,
//                 additionalRequirements: 1,
//                 lesson: 1,
//                 skater: 1,
//                 subscription: 1,
//                 ownerDetails: 1,
//                 instructorDetails: 1,
//                 instructorNotes: 1,
//             }
//         }
//     ];

//     // Execute aggregation pipeline
//     const result = await BookingModel.aggregate(aggregationPipeline);

//     // Divide all of the lessons on different groups
//     const groupedLessons = result.reduce((acc, lesson) => {
//         const title = lesson.lesson.title;
//         if (!acc[title]) {
//             acc[title] = [];
//         }
//         acc[title].push(lesson);
//         return acc;
//     }, {});

//     return groupedLessons;
// };