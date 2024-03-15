import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./styles.css";
import { useGetActiveRegularDaysQuery } from "./useGetActiveRegularDaysQuery.js";

// days from datatabase
// 0 for Sunday, 1 for monday ... 6 for Saturday

// const daysForFilter = [0, 6];

function DatePickerCalendar({ selectedDateProp }) {
  const [daysForFilter, setDaysForFilter] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const { isFetching, data: regularDaysData } = useGetActiveRegularDaysQuery();

  useEffect(() => {
    if (isFetching) return;
    const { _id, ...weekDays } = regularDaysData;
    const res = [];
    if (weekDays.sun) res.push(0);
    if (weekDays.mon) res.push(1);
    if (weekDays.tue) res.push(2);
    if (weekDays.wed) res.push(3);
    if (weekDays.thu) res.push(4);
    if (weekDays.fri) res.push(5);
    if (weekDays.sat) res.push(6);

    setDaysForFilter(res);
  }, [regularDaysData, isFetching]);

  useEffect(() => {
    selectedDateProp(selectedDay);
  }, [selectedDateProp, selectedDay]);

  function isWeekend(date, [a, b, c, d, e, f, g] = daysForFilter) {
    const day = date.getDay();
    return (
      day === a ||
      day === b ||
      day === c ||
      day === d ||
      day === e ||
      day === f ||
      day === g
    );
  }

  function excludedDatesHandler() {
    return [{ date: twoDaysForward(1) }, { date: twoDaysForward(2) }];
  }

  // two days forward can't book a lesson
  function twoDaysForward(dayCount) {
    let result = new Date();
    result.setDate(result.getDate() + dayCount);
    return result;
  }
  function userDate() {
    let result = new Date("03/26/2024");
    return result;
  }

  return (
    <div className="div">
      <DatePicker
        calendarStartDay={1} // week start day
        inline={true} // always visible
        selected={selectedDay}
        onChange={(date) => setSelectedDay(date)}
        // disabling past dates and weekdays
        // filterDate={(date) => date >= new Date() && isWeekend(date)}
        filterDate={(date) => date >= new Date() && isWeekend(date)}
        excludeDates={[
          { date: twoDaysForward(1) },
          { date: twoDaysForward(2) },
          { date: userDate() },
        ]}
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
