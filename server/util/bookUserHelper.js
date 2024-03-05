const bookUserHelper = (isoDate, lessonId, skaterId, additionalRequirements, count, ownerId) => {
    const currentDate = new Date(isoDate);
    const nextWeekendBookings = [];

    // Find the next available weekend date
    while (nextWeekendBookings.length === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            nextWeekendBookings.push({
                lessonId,
                skaterId,
                additionalRequirements,
                owner: ownerId || null,
                date: new Date(currentDate)
            });
        }
    }

    // Get the same day of the week for the specified count
    for (let i = 1; i < count; i++) {
        const nextDate = new Date(nextWeekendBookings[i - 1].date);
        nextDate.setDate(nextDate.getDate() + 7);
        nextWeekendBookings.push({
            lessonId,
            skaterId,
            additionalRequirements,
            owner: ownerId || null,
            date: new Date(nextDate)
        });
    }

    return nextWeekendBookings;
};

export { bookUserHelper }