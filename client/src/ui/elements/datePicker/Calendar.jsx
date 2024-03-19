import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./styles.css";
import { useGetActiveRegularDaysQuery } from "./useGetActiveRegularDaysQuery.js";
import { useExcludedOptions } from "../../../features/admin/activeDays/useGetExcludedOptions.js";

// const incomingData = {
//   daysBeforeLesson: [1, 2, 5, 6],
//   excludedUserDates: [
//     { date: new Date("03/26/2024") },
//     { date: new Date("03/25/2024") }, //velikden
//   ],
// };

function DatePickerCalendar({ selectedDateProp }) {
  const [daysForFilter, setDaysForFilter] = useState([]);
  const [outputArr, setOutputArr] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [userExcludes, setUserExcludes] = useState([]);
  const { isFetching, data: regularDaysData } = useGetActiveRegularDaysQuery();

  const { isFetching: isFetchingExcluded, data: incoming } = useExcludedOptions();

  useEffect(() => {
    // if (isFetching || isFetchingExcluded) return;
    if (!regularDaysData || !incoming || isFetching || isFetchingExcluded) return;

    const { _id, ...weekDays } = regularDaysData;
    const res = [];
    if (weekDays.sun) res.push(0);
    if (weekDays.mon) res.push(1);
    if (weekDays.tue) res.push(2);
    if (weekDays.wed) res.push(3);
    if (weekDays.thu) res.push(4);
    if (weekDays.fri) res.push(5);
    if (weekDays.sat) res.push(6);

    const incomingData = incoming;

    let userExcludes = [];
    if (incomingData) {
      userExcludes = [
        ...excludedDatesHandler(incomingData),
        ...incomingData.excludedUserDates,
      ];
    } else {
      userExcludes = [];
    }

    setOutputArr(userExcludes);

    setDaysForFilter(res);
  }, [regularDaysData, incoming, isFetching, isFetchingExcluded]);

  useEffect(() => {
    selectedDateProp(selectedDay);
  }, [selectedDateProp, selectedDay]);

  useEffect(() => {
    if (isFetchingExcluded) return;

  }, [incoming, isFetchingExcluded]);

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

  function excludedDatesHandler(incomingData) {
    const arr = [];
    if (incomingData?.daysBeforeLesson) {
      incomingData.daysBeforeLesson.map((inc) => {
        let result = new Date();
        result.setDate(result.getDate() + inc);
        arr.push({ date: result });
      });
      return arr;
    } else {
      return [{ date: null }];
    }
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
        excludeDates={outputArr}
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
