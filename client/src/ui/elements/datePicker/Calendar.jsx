import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./styles.css";

function DatePickerCalendar({ selectedDateProp }) {
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    selectedDateProp(selectedDay);
  }, [selectedDateProp, selectedDay]);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 for Sunday, 6 for Saturday
  };

  return (
    <div className="div">
      <DatePicker
        calendarStartDay={1} // week start day
        inline={true} // always visible
        selected={selectedDay}
        onChange={(date) => setSelectedDay(date)}
        // disabling past dates and weekdays
        filterDate={(date) => date >= new Date() && isWeekend(date)}
        format
        calendarClassName="calendar-styles"
      />
    </div>
  );
}

export default DatePickerCalendar;








// import { useEffect, useState } from "react";

// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import "./styles.css";

// function DatePickerCalendar({ selectedDateProp }) {
//   const [selectedDay, setSelectedDay] = useState(null);

//   // if (selectedDay) console.log(selectedDay.toDateString());
//   useEffect(() => {
//     selectedDateProp(selectedDay);
//   }, [selectedDateProp, selectedDay]);

//   return (
//     <div className="div">
//       <DatePicker
//         calendarStartDay={1} // week start day
//         inline={true} // always visible
//         selected={selectedDay}
//         onChange={(date) => setSelectedDay(date)}
//         // disabling date by weekday index
//         filterDate={(date) =>
//           date.getDay() !== 1 &&
//           date.getDay() !== 2 &&
//           date.getDay() !== 3 &&
//           date.getDay() !== 4 &&
//           date.getDay() !== 5
//         }
//         format
//         calendarClassName="calendar-styles"
//       />
//     </div>
//   );
// }

// export default DatePickerCalendar;
