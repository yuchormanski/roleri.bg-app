import styles from "./RegisteredUser.module.css";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
import { useLanguage } from "../../context/Language.jsx";
import { useGetSkatersQuery } from "../skaters/useGetSkatersQuery.js";
import { useGetUserDataQuery } from "../users/useGetUserDataQuery.js";
import { useGetSkaterOptionsQuery } from "../skaters/useGetSkaterOptionsQuery.js";
import { useTranslate } from "../../hooks/useTranslate.js";

function RegisteredUser() {
  const { lang, index } = useLanguage();
  const { isFetching: skatersLoading, data: skaters } = useGetSkatersQuery();
  const { isFetching: userLoading, data: user } = useGetUserDataQuery();
  const { isLoading, isFetching, data } = useGetSkaterOptionsQuery();
  const { translatePhrase: translate } = useTranslate();
  const [selectedDate, setSelectedDate] = useState();
  const [sign, setSign] = useState({});
  const [skaterSelection, setSkaterSelection] = useState([]);

  const userSkaters = skaters.filter((s) => s.owner === user._id);

  function selectedDateHandler(date) {
    setSelectedDate((d) => (d = date));
  }

  function selection(e, id) {
    console.log(e.target.value, id);

    const newObj = { ...sign[id], [e.target.id]: e.target.value };
    console.log(newObj);
    setSign((state) => (state = { ...state, [id]: newObj }));
  }

  function checkboxHandler(e, id) {
    if (e.target.checked) {
      // setSkaterSelection((arr) => [...arr, id]);
      setSign((state) => (state = { ...state, [id]: {} }));
    } else {
      // setSkaterSelection((arr) => arr.filter((el) => el !== id));
      const { [id]: _, ...newObj } = sign;
      setSign((state) => (state = { ...newObj }));
    }
  }
  // console.log(skaterSelection);
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.bookLesson}</h3>

        <div className={styles.secondaryContainer}>
          <div className={styles.leftPanel}>
            <p className={styles.headInfo}>
              Преди да попълните формата, моля, запознайте се с видовете{" "}
              <Link className={styles.link} to={"/lessons"}>
                уроци
              </Link>{" "}
              и техния{" "}
              <Link className={styles.link} to="http://roleri.bg/rollwp/plans/">
                график
              </Link>
            </p>
            <h2 className={styles.secondaryHeading}>Следвайте стъпките</h2>
            <h3 className={styles.thirdHeading}>Стъпка 1</h3>
            <p className={styles.paragraph}>
              Изберете ден, маркиран в зелено, попълнете името на участника,
              възрастовата група и вида на урока.
            </p>
            <p className={styles.paragraph}>
              Ако изберете Абонамент, това означава,че ще ползвате пакет от
              четири урока, взети в рамките на четири поредни седмици в
              съответния ден.
            </p>
            <p className={styles.paragraph}>
              При лошо време урока се прехвърля за следващата дата.{" "}
            </p>
            <h3 className={styles.thirdHeading}>Стъпка 2</h3>
            <p className={styles.paragraph}>
              Изпратете Вашата форма. След затваряне на формата (два дни преди
              урока) ще получите потвърждение на Вашето участие на посоченият
              e-mail адрес.
            </p>
          </div>

          <div className={styles.rightPanel}>
            <h3 className={styles.secondaryHeading}>{lang.selectDay}</h3>
            <DatePickerCalendar selectedDateProp={selectedDateHandler} />

            <h3 className={styles.secondaryHeading}>
              Select from registered skaters
            </h3>

            <div className={`${styles.headInfo} ${styles.userChoice} `}>
              {skaters.map((s) => (
                <>
                  <div className={styles.skaterContainer} key={s._id}>
                    <p
                      className={styles.skaterName}
                    >{`${s.firstName} ${s.lastName}`}</p>
                    <input
                      className={styles.skaterSelection}
                      type="checkbox"
                      onChange={(e) => checkboxHandler(e, s._id)}
                    />
                  </div>

                  <div className={styles.selectContainer}>
                    <div className={styles.label}>
                      <label htmlFor="type">
                        <span>Вид урок:</span>
                      </label>
                      <select
                        name=""
                        id="type"
                        className={styles.select}
                        disabled={sign[s._id] ? false : true}
                        defaultValue=""
                        onChange={(e) => selection(e, s._id)}
                      >
                        <option value="" disabled hidden></option>
                        <option value="group">Single group lesson</option>
                        <option value="subscription">Subscription</option>
                        <option value="individual">Individual</option>
                      </select>
                    </div>

                    <div className={styles.label}>
                      <label htmlFor="level" className={styles.label}>
                        <span>Група:</span>
                      </label>
                      <select
                        name=""
                        id="level"
                        className={styles.select}
                        disabled={sign[s._id] ? false : true}
                        defaultValue=""
                        onChange={(e) => selection(e, s._id)}
                      >
                        <option value="" disabled hidden></option>
                        {data?.groupsLevelData.map((level) => (
                          <option value={level.typeGroup} key={level._id}>
                            {translate(level.typeGroup)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <button>Запиши се</button>

            <div className={styles.conditions}>
              <p>
                Съгласявам се с <Link to={"/conditions"}>Общите условия</Link>
              </p>
              <input
                className={styles.checkbox}
                type="checkbox"
                // onChange={(e) => checkboxHandler(e, s._id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisteredUser;
