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
        { $match: { date: { $gte: currentDate } } },
        // Group by date and get the minimum date in each group
        {
            $group: {
                _id: null,
                earliestDate: { $min: "$date" },
                bookings: { $push: "$$ROOT" }
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
        // Unwind the bookings array
        { $unwind: "$bookings" },
        // Filter out the bookings with isRejected = false
        { $match: { "bookings.isRejected": false } },
        // Lookup lesson, skater, owner, and instructor details
        {
            $lookup: { from: 'lessons', localField: 'bookings.lessonId', foreignField: '_id', as: 'lesson' }
        },
        {
            $lookup: { from: 'skaters', localField: 'bookings.skaterId', foreignField: '_id', as: 'skater' }
        },
        {
            $lookup: { from: 'userparents', localField: 'bookings.owner', foreignField: '_id', as: 'ownerDetails' }
        },
        {
            $lookup: { from: 'instructornotes', localField: 'skater._id', foreignField: 'skater', as: 'instructorNotes' }
        },
        {
            $lookup: { from: 'skates', localField: 'skater.skatesSize', foreignField: '_id', as: 'skatesSize' }
        },
        {
            $lookup: { from: 'protections', localField: 'skater.protection', foreignField: '_id', as: 'protection' }
        },
        // Lookup unregistered users based on skaterId from BookingModel
        {
            $lookup: { from: 'unregisteredusers', localField: 'bookings.skaterId', foreignField: '_id', as: 'unregisteredUser' }
        },
        {
            $lookup: { from: 'skates', localField: 'unregisteredUser.skatesSize', foreignField: '_id', as: 'skatesSizeUnregistered' }
        },
        {
            $lookup: { from: 'protections', localField: 'unregisteredUser.protection', foreignField: '_id', as: 'protectionUnregistered' }
        },
        // Add fields to shape the data according to the desired structure
        {
            $addFields: {
                ownerDetails: {
                    $cond: {
                        if: { $ifNull: ["$bookings.owner", null] },
                        then: { $arrayElemAt: ["$ownerDetails", 0] },
                        else: { $arrayElemAt: ["$unregisteredUser", 0] }
                    }
                },
                skater: {
                    $cond: {
                        if: { $ifNull: ["$bookings.owner", null] },
                        then: { $arrayElemAt: ["$skater", 0] },
                        else: { $arrayElemAt: ["$unregisteredUser", 0] }
                    }
                },
                skatesSize: {
                    $cond: {
                        if: { $ifNull: ["$bookings.owner", null] },
                        then: { $arrayElemAt: ["$skatesSize.size", 0] },
                        else: { $arrayElemAt: ["$skatesSizeUnregistered.size", 0] },
                    }
                },
                protection: {
                    $cond: {
                        if: { $ifNull: ["$bookings.owner", null] },
                        then: { $arrayElemAt: ["$protection.size", 0] },
                        else: { $arrayElemAt: ["$protectionUnregistered.size", 0] },
                    }
                },
                lesson: { $arrayElemAt: ["$lesson", 0] },
                instructorNotes: { $cond: { if: { $eq: [{ $size: "$instructorNotes" }, 0] }, then: null, else: { $arrayElemAt: ["$instructorNotes.content", 0] } } },
            }
        },
        // Project to shape the data according to the desired structure
        {
            $project: {
                _id: "$bookings._id",
                date: "$bookings.date",
                isPresent: "$bookings.isPresent",
                isPaid: "$bookings.isPaid",
                lesson: {
                    title: "$lesson.title",
                    time: "$lesson.time"
                },
                ownerDetails: {
                    firstName: "$ownerDetails.firstName",
                    lastName: "$ownerDetails.lastName",
                    email: "$ownerDetails.email",
                    phone: "$ownerDetails.phone"
                },
                skater: {
                    _id: "$skater._id",
                    firstName: "$skater.firstName",
                    lastName: "$skater.lastName",
                    additionalRequirements: "$skater.additionalRequirements",
                    skatesSize: "$skatesSize",
                    protection: "$protection"
                },
                additionalRequirements: "$bookings.additionalRequirements",
                instructorNotes: "$instructorNotes",
                subscriptionCodeId: "$bookings.subscriptionCodeId"
            }
        }
    ];

    // Execute aggregation pipeline
    const result = await BookingModel.aggregate(aggregationPipeline);

    // Group lessons by title
    const groupedLessons = result.reduce((acc, lesson) => {
        const randomId = Math.random().toString(36).slice(2);
        const title = lesson.lesson.title;

        if (!acc[title]) {
            acc[title] = {};
            acc[title]['data'] = [];
            acc[title]['_id'] = randomId;
            acc[title]['lessonDate'] = new Date(lesson.date).toLocaleDateString();
        }

        acc[title]['data'].push(lesson);
        return acc;
    }, {});

    return groupedLessons;
};


// Get all needed equipment for current lesson
const getEquipmentForDate = async () => {
    const currentDate = new Date();

    const bookings = await BookingModel.aggregate([
        // Match bookings with dates greater than or equal to currentDate
        {
            $match: { date: { $gte: currentDate }, isRejected: false }
        },
        // Group by date and get the minimum date in each group
        {
            $group: {
                _id: null,
                earliestDate: { $min: "$date" }
            }
        }
    ]);

    // Extract the earliest date from the aggregation result
    const earliestDate = bookings.length > 0 ? bookings[0].earliestDate : null;

    // Now fetch bookings with the earliest date
    const bookingsWithEarliestDate = await BookingModel.find({ date: earliestDate, isRejected: false }).populate({
        path: 'skaterId',
        populate: [
            {
                path: 'protection',
                model: 'Protection'
            },
            {
                path: 'skatesSize',
                model: 'Skates'
            }
        ]
    });

    // Initialize objects to store skates and protection
    const skatesData = [];
    const protectionData = [];

    bookingsWithEarliestDate.forEach(booking => {
        const { skaterId: { skatesSize, protection } } = booking;

        // Add skate size to skatesData array if quantity is greater than 0
        if (skatesSize && skatesSize.size !== 0) {
            const skateIndex = skatesData.findIndex(item => item.skateSize === skatesSize.size);
            if (skateIndex === -1) {
                skatesData.push({ skateSize: skatesSize.size, quantity: 1 });
            } else {
                skatesData[skateIndex].quantity++;
            }
        }

        // Add protection size to protectionData array if quantity is greater than 0
        if (protection && protection.size !== 0) {
            const protectionIndex = protectionData.findIndex(item => item.protectionSize === protection.size);
            if (protectionIndex === -1) {
                protectionData.push({ protectionSize: protection.size, quantity: 1 });
            } else {
                protectionData[protectionIndex].quantity++;
            }
        }
    });

    // Wrap skates and protection data in their own objects
    const skatesObject = { skates: skatesData };
    const protectionObject = { protection: protectionData };

    // Combine skates and protection objects into a single array
    const equipmentData = [skatesObject, protectionObject];

    return equipmentData;
};

export {
    getNearestLessonsDate,
    getEquipmentForDate,
    setIsPresentToTrue,
    setIsPresentToFalse,
    setIsPaidToTrue,
    setIsPaidToFalse,
    addNote,
    updateNote,
};