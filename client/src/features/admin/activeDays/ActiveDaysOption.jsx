import styles from "./ActiveDaysOption.module.css";
import { useEffect, useReducer, useState } from "react";
import { useLanguage } from "../../../context/Language.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import { useGetOptionsQuery } from "../useGetOptionsQuery.js";
import { initialState } from "../../../util/initialStateActiveDays.js";
import { useEditActiveDaysQuery } from "./useEditActiveDaysQuery.js";
import { useExcludedOptions } from "./useGetExcludedOptions.js";
import { useAddExcludedOptionsQuery } from "./useAddExcludedOptions.js";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useTheme } from "../../../context/DarkMode.jsx";
import { customStyles } from "../team/customStyles.js";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

function reducer(state, action) {
  switch (action.type) {
    //  TODO: CHECK if this can be used to disabled
    // case "day/mon": {
    //   // Toggle the state of mon
    //   const toggledMon = !state.mon;
    //   // Conditionally update the state based on the disableBtn flag
    //   const newState = state.disableBtn ? { ...state, mon: toggledMon, disableBtn: false } : { ...state, mon: toggledMon };
    //   return newState;
    // }
    case "day/mon":
      return { ...state, mon: !state.mon };
    case "day/tue":
      return { ...state, tue: !state.tue };
    case "day/wed":
      return { ...state, wed: !state.wed };
    case "day/thu":
      return { ...state, thu: !state.thu };
    case "day/fri":
      return { ...state, fri: !state.fri };
    case "day/sat":
      return { ...state, sat: !state.sat };
    case "day/sun":
      return { ...state, sun: !state.sun };
    case "subscription/changed":
      return { ...state, type: !state.type };
    case "time/changed":
      return { ...state, [action.name]: action.payload };
    case "form/edited":
      return { ...state, disableBtn: false };
    case "excluded/daysBefore":
      return { ...state, daysBeforeLesson: action.payload };
    case "excluded/userDates":
      return { ...state, excludedUserDates: [action.payload] };

    default:
      throw new Error("Unknown action type");
  }
}

function ActiveDaysOption() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { lang } = useLanguage();
  const { isFetching, data: availableDays } = useGetOptionsQuery("activeDays");
  const { mutate: mutateRegularDay, isPending: isPendingRegularDay } =
    useEditActiveDaysQuery("edit_regular_day");
  const { mutate: mutateIndividualDay, isPending: isPendingInitialDay } =
    useEditActiveDaysQuery("edit_individual_day");
  const { isFetching: isFetchingExcluded, data: excludedOptions } =
    useExcludedOptions();
  const {
    mutateAsync,
    mutate,
    isPending,
    isFetching: addData,
  } = useAddExcludedOptionsQuery();

  const { isDark } = useTheme();
  const src = isDark ? "/android-chrome-512x512.png" : "/wheel.webp";

  useEffect(() => {
    if (isFetching) return;

    if (!state.type) {
      Object.entries(availableDays.regularDays).forEach(
        ([d, v]) =>
          state[d] !== v && d !== "_id" && dispatch({ type: `day/${d}` })
      );
    } else {
      Object.entries(availableDays.individualDays).forEach(([d, v]) => {
        if (typeof v === "string") {
          dispatch({ type: "time/changed", name: d, payload: v });
        } else if (state[d] !== v && d !== "_id") {
          dispatch({ type: `day/${d}` });
        }
      });
    }
  }, [availableDays, isFetching, state.type]);

  function onEditClickHandler() {
    if (state.type) {
      const {
        type,
        disableBtn,
        daysBeforeLesson,
        excludedUserDates,
        ...individualDays
      } = state;
      mutateIndividualDay(individualDays);
    } else {
      const {
        type,
        start,
        end,
        disableBtn,
        daysBeforeLesson,
        excludedUserDates,
        ...regularDays
      } = state;
      mutateRegularDay(regularDays);
    }
  }

  function wordModifier(day) {
    return day.at(0).toUpperCase() + day.slice(1).toLowerCase();
  }

  function timeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    // NEXT enabling button
    if (state.disableBtn) dispatch({ type: "form/edited" });
    dispatch({ type: "time/changed", name: name, payload: value });
  }
  const selectOptions = [
    { value: "none", label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];

  function excludedDaysHandler(e) {
    const dateArr = Array.from({ length: e }, (_, i) => i + 1);
    dispatch({ type: "excluded/daysBefore", payload: dateArr });
  }

  function selectedDateHandler(date) {
    // const currentDates = state.excludedUserDates;
    dispatch({ type: "excluded/userDates", payload: date });
  }

  function excludedOptionsHandler() {
    if (
      state.daysBeforeLesson.length === 0 &&
      state.excludedUserDates.length === 0
    )
      return;
    const res = {
      daysBeforeLesson: state.daysBeforeLesson,
      excludedUserDates: excludedUserDatesFormatter(),
    };
    try {
      mutate(res);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  }

  function excludedUserDatesFormatter() {
    if (state.excludedUserDates.length > 0) {
      return state.excludedUserDates.at(0).map((x) => {
        return { date: x };
      });
    } else {
      return [{ date: null }];
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>
          {state.type ? lang.individualDays : lang.activeDays}
        </h3>

        <div className={styles.toggleSwitch}>
          <div
            className={`${styles.switchBtn} ${
              state.type ? styles.toggleRight : styles.toggleLeft
            }`}
            onClick={() => dispatch({ type: "subscription/changed" })}
          ></div>
        </div>

        {isFetching ? (
          <Spinner />
        ) : (
          <div className={`${styles.secondaryContainer} ${styles.fixedHeight}`}>
            <div className={styles.daysContainer}>
              {Array.from({ length: 7 }, (_, i) => (
                <DayName
                  key={i}
                  isValid={state[Object.keys(initialState).at(i)]}
                  dispatch={dispatch}
                  text={wordModifier(Object.keys(initialState).at(i))}
                  state={state}
                />
              ))}
            </div>
            <div className={styles.double}>
              <section className={styles.description}>
                <p className={styles.info}>
                  <span className={styles.span}>&#9737;</span>
                  {state.type
                    ? lang.a_selectedDays_individual
                    : lang.a_selectedDays_regular}
                </p>

                <p className={styles.info}>
                  <span className={styles.span}>&#9737;</span>
                  {lang.a_selectedDays_election}
                </p>
                <ul className={styles.selectedList}>
                  {Object.keys(state)
                    .filter((x) => state[x] && x !== "type")
                    .map((el, i) => (
                      <li key={i} className={styles.listItem}>
                        {lang[el]}
                      </li>
                    ))}
                </ul>
              </section>

              {state.type && (
                <div className={styles.timePickerCOntainer}>
                  <div className={styles.timeWrapper}>
                    <div className={styles.timeElement}>
                      <label htmlFor="startTime">{lang.from}</label>
                      <input
                        id={"startTime"}
                        type="time"
                        name={"start"}
                        className={styles.timeInput}
                        value={state.start}
                        onChange={timeHandler}
                        min="07:00"
                        max="20:00"
                      />
                    </div>

                    <div className={styles.timeElement}>
                      <label htmlFor="endTime">{lang.to}</label>
                      <input
                        id={"endTime"}
                        type="time"
                        name={"end"}
                        className={styles.timeInput}
                        value={state.end}
                        onChange={timeHandler}
                        min="07:00"
                        max="20:00"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.btnContainer}>
              <button
                className={styles.weekDaysBtn}
                onClick={onEditClickHandler}
                type={"primary"}
                disabled={state.disableBtn}
              >
                {lang.edit}
              </button>
            </div>
          </div>
        )}

        {isFetchingExcluded ? (
          <Spinner />
        ) : (
          <div className={styles.secondaryContainer}>
            <div className={styles.selectContainer}>
              <div className={styles.selectInfo}>
                <div className={styles.selectInfoItem}>
                  {/* <img src={src} alt="bullet dot" className={styles.bullet} /> */}
                  <span className={styles.span}>&#9737;</span>
                  <p className={styles.bulletText}>{lang.a_dates_0}</p>
                </div>
                <div className={styles.selectInfoItem}>
                  {/* <img src={src} alt="bullet dot" className={styles.bullet} /> */}
                  <span className={styles.span}>&#9737;</span>
                  <p className={styles.bulletText}>{lang.a_dates_5}</p>
                </div>
                <div className={styles.selectInfoItem}>
                  {/* <img src={src} alt="bullet dot" className={styles.bullet} /> */}
                  <span className={styles.span}>&#9737;</span>

                  <p className={styles.bulletText}>
                    {lang.a_dates_1}{" "}
                    <span>
                      {excludedOptions?.at(-1)?.daysBeforeLesson.at(-1) || 0}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.selectItem}>
                <CreatableSelect
                  options={selectOptions}
                  onChange={(e) => excludedDaysHandler(e.value)}
                  styles={customStyles}
                  placeholder={
                    <div style={{ fontSize: 16 }}>{lang.a_select}</div>
                  }
                />
              </div>
              <button
                className={styles.excludedDaysBtn}
                onClick={excludedOptionsHandler}
                disabled={state.daysBeforeLesson.length === 0}
              >
                {lang.a_select}
              </button>
            </div>
          </div>
        )}

        {isFetchingExcluded ? (
          <Spinner />
        ) : (
          <div className={styles.secondaryContainer}>
            <div className={styles.customDateContainer}>
              <div className={styles.selectInfo}>
                <div className={styles.selectInfoItem}>
                  {/* <img src={src} alt="bullet dot" className={styles.bullet} /> */}
                  <span className={styles.span}>&#9737;</span>
                  <p className={styles.bulletText}>{lang.a_dates_2}</p>
                </div>
                <div className={styles.selectInfoItem}>
                  {/* <img src={src} alt="bullet dot" className={styles.bullet} /> */}
                  <span className={styles.span}>&#9737;</span>
                  <p className={styles.bulletText}>{lang.a_dates_3}</p>
                </div>
              </div>
              <div className={styles.calendarContainer}>
                <DatePicker
                  calendarStartDay={1} // week start day
                  inline={true} // always visible
                  selectsMultiple
                  selectedDates={state.excludedUserDates?.at(-1) || null}
                  onChange={(date) =>
                    dispatch({ type: "excluded/userDates", payload: date })
                  }
                  format
                  calendarClassName="calendar-styles"
                />
              </div>
            </div>
            <div className={styles.calendarInfo}>
              <div className={styles.calendarInfoItem}>
                <span className={styles.span}>&#9737;</span>
                <p className={styles.bulletText}>{lang.a_dates_4}</p>
              </div>
              <button
                className={styles.excludedDaysBtn}
                onClick={excludedOptionsHandler}
                disabled={state.excludedUserDates.length === 0}
              >
                {lang.a_select}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ActiveDaysOption;

function DayName({ isValid, dispatch, text, state }) {
  function clickHandler() {
    // NEXT enabling button
    if (state.disableBtn) dispatch({ type: "form/edited" });
    dispatch({ type: `day/${text.toLowerCase()}` });
  }

  return (
    <button
      className={`${styles.dayBox} ${
        isValid ? styles.activeDay : styles.inactiveDay
      }`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}
