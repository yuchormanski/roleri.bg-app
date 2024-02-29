import styles from "./RegisteredUser.module.css";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
import { useLanguage } from "../../context/Language.jsx";
import { useGetSkatersQuery } from "../skaters/useGetSkatersQuery.js";
import { useGetUserDataQuery } from "../users/useGetUserDataQuery.js";

function RegisteredUser() {
  const { lang, index } = useLanguage();
  const { isFetching: skatersLoading, data: skaters } = useGetSkatersQuery();
  const { isFetching: userLoading, data: user } = useGetUserDataQuery();

  const [selected, setSelected] = useState();
  const [skaterSelection, setSkaterSelection] = useState([]);

  const userSkaters = skaters.filter((s) => s.owner === user._id);

  function selectedDate(date) {
    setSelected((d) => (d = date));
  }

  function selection(id) {
    setSkaterSelection((arr) => [...arr, id]);
  }

  function checkboxHandler(e, id) {
    if (e.target.checked) {
      setSkaterSelection((arr) => [...arr, id]);
    } else {
      setSkaterSelection((arr) => arr.filter((el) => el !== id));
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
              Ако се нуждаете от кънки и протектори , изберете подходящия
              размер. <strong>Екипировката е безплатна</strong>!
            </p>
            <p className={styles.paragraph}>
              Данните за контакт са необходими, за да можем да се свържем с вас
              .
            </p>
            <h3 className={styles.thirdHeading}>Стъпка 3</h3>
            <p className={styles.paragraph}>
              Изпратете Вашата форма. След затваряне на формата (два дни преди
              урока) ще получите потвърждение на Вашето участие на посоченият
              e-mail адрес.
            </p>
          </div>
          <div className={styles.rightPanel}>
            <h3 className={styles.secondaryHeading}>{lang.selectDay}</h3>
            <DatePickerCalendar selectedDate={selectedDate} />
            <h3 className={styles.secondaryHeading}>Pic a skater</h3>

            <>
              {userSkaters.map((s) => (
                <div className={styles.skaterContainer} key={s._id}>
                  <p
                    className={styles.skaterName}
                  >{`${s.firstName} ${s.lastName}`}</p>
                  <input
                    className={styles.skaterSelection}
                    type="checkbox"
                    name="frameIsCheck"
                    onChange={(e) => checkboxHandler(e, s._id)}
                  />
                </div>
              ))}
              <h3 className={styles.secondaryHeading}>Pic a Lesson</h3>

              <select name="" id="">
                <option value="basic">Basic</option>
                <option value="advances">Advanced</option>
              </select>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisteredUser;
