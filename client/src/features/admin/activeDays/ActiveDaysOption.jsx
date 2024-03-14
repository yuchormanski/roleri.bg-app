import styles from "./ActiveDaysOption.module.css";
import { useReducer } from "react";
import { useLanguage } from "../../../context/Language.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import { incoming } from "../../../util/test.js";

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
      return { ...state, [action.name]: [action.payload].at(0) };

    default:
      throw new Error("Unknown action type");
  }
}

function ActiveDaysOption() {
  const { lang } = useLanguage();

  const [state, dispatch] = useReducer(reducer, incoming);

  function wordModifier(day) {
    return day.at(0).toUpperCase() + day.slice(1).toLowerCase();
  }

  function timeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
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

        <div className={styles.secondaryContainer}>
          <div className={styles.daysContainer}>
            {Array.from({ length: 7 }, (_, i) => (
              <DayName
                key={i}
                isValid={state[Object.keys(incoming).at(i)]}
                dispatch={dispatch}
                text={wordModifier(Object.keys(incoming).at(i))}
              />
            ))}
          </div>
          {state.type && (
            <div className={styles.timePickerCOntainer}>
              {/* <p className={styles.timeINfo}>Time interval</p> */}
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
              <Button type={"primary"}>{lang.edit}</Button>
            </div>
          </div>
        </div>

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

function DayName({ isValid, dispatch, text }) {
  return (
    <button
      className={`${styles.dayBox} ${
        isValid ? styles.activeDay : styles.inactiveDay
      }`}
      onClick={() => dispatch({ type: `day/${text.toLowerCase()}` })}
    >
      {text}
    </button>
  );
}
