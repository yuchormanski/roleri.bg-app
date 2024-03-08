import { useReducer } from "react";
import { useLanguage } from "../../../context/Language.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import styles from "./ActiveDaysOption.module.css";
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

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.activeDays}</h3>

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
          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.edit}</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActiveDaysOption;

function DayName({ isValid, dispatch, text }) {
  return (
    <button
      className={`${styles.dayBox} ${isValid ? styles.activeDay : ""}`}
      onClick={() => dispatch({ type: `day/${text.toLowerCase()}` })}
    >
      {text}
    </button>
  );
}
