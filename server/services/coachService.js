import { BookingModel } from "../models/BookingModel.js";
import { InstructorNotesModel } from "../models/InstructorNotes.js";

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
                _id: 1,
                earliestDate: 1,
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
        // Lookup lesson, skater, subscription, owner, and instructor details
        {
            $lookup: {
                from: 'lessons',
                localField: 'bookings.lessonId',
                foreignField: '_id',
                as: 'bookings.lesson'
            }
        },
        {
            $lookup: {
                from: 'skaters',
                localField: 'bookings.skaterId',
                foreignField: '_id',
                as: 'bookings.skater'
            }
        },
        {
            $lookup: {
                from: 'subscriptions',
                localField: 'bookings.subscriptionId',
                foreignField: '_id',
                as: 'bookings.subscription'
            }
        },
        {
            $lookup: {
                from: 'userparents',
                localField: 'bookings.owner',
                foreignField: '_id',
                as: 'bookings.ownerDetails'
            }
        },
        {
            $lookup: {
                from: 'userparents',
                localField: 'bookings.instructorId',
                foreignField: '_id',
                as: 'bookings.instructorDetails'
            }
        },
        // Project only required fields from each lookup
        {
            $project: {
                _id: "$bookings._id", // Include the id field
                date: "$bookings.date",
                isPresent: "$bookings.isPresent",
                isPaid: "$bookings.isPaid",
                isRejected: "$bookings.isRejected",
                additionalRequirements: "$bookings.additionalRequirements",
                lesson: { $arrayElemAt: ['$bookings.lesson', 0] },
                skater: { $arrayElemAt: ['$bookings.skater', 0] },
                subscription: { $arrayElemAt: ['$bookings.subscription', 0] },
                ownerDetails: { $arrayElemAt: ['$bookings.ownerDetails', 0] },
                instructorDetails: { $arrayElemAt: ['$bookings.instructorDetails', 0] },
            }
        },
        // Lookup instructor notes for each skater
        {
            $lookup: {
                from: 'instructornotes',
                localField: 'booking.skater._id',
                foreignField: 'skater',
                as: 'instructorNotes'
            }
        }
    ];

    // Execute aggregation pipeline
    const result = await BookingModel.aggregate(aggregationPipeline);

    // Divide all of the lessons on different groups
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
};