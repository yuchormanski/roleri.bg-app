import { useLanguage } from "../../../context/Language.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import styles from "./ActiveDaysOption.module.css";

function ActiveDaysOption() {
  const { lang } = useLanguage();

  const inactive = [0,1, 2, 3, 4, 5];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function dayCheck(day) {
    console.log(day);
    const current = (day + 1 === 7) ? !inactive.includes(0):!inactive.includes(day+1);
    return current;
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.activeDays}</h3>

        <div className={styles.secondaryContainer}>
          <div className={styles.daysContainer}>
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`${styles.dayBox} ${
                  dayCheck(i) ? styles.activeDay : ""
                }`}
              >
                <p className={`${styles.dayName}`}>{dayNames.at(i)}</p>
              </div>
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
