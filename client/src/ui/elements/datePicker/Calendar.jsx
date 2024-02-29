import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./styles.css";

function DatePickerCalendar({ selectedDateProp }) {
  const [selectedDay, setSelectedDay] = useState(null);

  if (selectedDay) console.log(selectedDay.toDateString());
  useEffect(() => {
    selectedDateProp(selectedDay);
  }, [selectedDateProp, selectedDay]);

  return (
    <div className="div">
      <DatePicker
        calendarStartDay={1} // week start day
        inline={true} // always visible
        selected={selectedDay}
        onChange={(date) => setSelectedDay(date)}
        // disabling date by weekday index
        filterDate={(date) =>
          date.getDay() !== 1 &&
          date.getDay() !== 2 &&
          date.getDay() !== 3 &&
          date.getDay() !== 4 &&
          date.getDay() !== 5
        }
        format
        calendarClassName="calendar-styles"
      />
    </div>
  );
}

export default DatePickerCalendar;
