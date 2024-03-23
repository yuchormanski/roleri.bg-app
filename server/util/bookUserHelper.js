const bookUserHelper = (
  isoDate,
  count = 1,
  lessonId,
  skaterId,
  additionalRequirements,
  subscriptionId,
  ownerId
) => {
  const currentDate = new Date(isoDate);
  const nextWeekendBookings = [];
  let countSignedLessons = 1;
  for (let i = 0; i < count * 7; i += 7) {
    let nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + i);
    nextWeekendBookings.push({
      lessonId,
      skaterId,
      subscriptionId,
      additionalRequirements,
      owner: ownerId || null,
      date: new Date(nextDate),
      lessonIndex: countSignedLessons,
    });

    countSignedLessons++;
  }

  return nextWeekendBookings;
};

export { bookUserHelper };
