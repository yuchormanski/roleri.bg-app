import { Schema, model } from "mongoose";

const CalendarExcludedOptionsSchema = new Schema({
  daysBeforeLesson: {
    type: [Number],
    required: true
  },
  excludedUserDates: {
    type: [
      {
        date: {
          type: Date,
          default: null,
        },
      },
    ],
  },
});

const CalendarExcludedOptions = model(
  "CalendarExcludedOptions",
  CalendarExcludedOptionsSchema
);

export { CalendarExcludedOptions };
