import styles from "./ActiveDaysOption.module.css";
import { useEffect, useReducer, useState } from "react";
import { useLanguage } from "../../../context/Language.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import { useGetOptionsQuery } from "../useGetOptionsQuery.js";
import { initialState } from "../../../util/initialStateActiveDays.js";
import { useEditActiveDaysQuery } from "./useEditActiveDaysQuery.js";

function reducer(state, action) {
  switch (action.type) {
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
      const { type, disableBtn, ...individualDays } = state;

      ///

      mutateIndividualDay(individualDays);
    } else {
      const { type, start, end, disableBtn, ...regularDays } = state;
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

        {!isFetching && (
          <div className={styles.secondaryContainer}>
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
            <div className={styles.btnContainer}>
              <div style={{ marginLeft: "auto" }}>
                <Button
                  onClick={onEditClickHandler}
                  type={"primary"}
                  disabled={state.disableBtn}
                >
                  {lang.edit}
                </Button>
              </div>
            </div>
          </div>
        )}

        <section className={styles.description}>
          <p className={styles.info}>
            <span>&#9737;</span>
            {lang.a_selectedDays}
          </p>

          <p className={styles.info}>
            <span>&#9737;</span>
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
