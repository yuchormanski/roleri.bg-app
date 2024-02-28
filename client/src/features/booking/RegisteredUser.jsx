import styles from "./RegisteredUser.module.css";

import { useState } from "react";

import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
import { useLanguage } from "../../context/Language.jsx";
import { useGetSkatersQuery } from "../skaters/useGetSkatersQuery.js";
import { useGetUserDataQuery } from "../users/useGetUserDataQuery.js";

function RegisteredUser() {
  const [selected, setSelected] = useState();
  const { lang, index } = useLanguage();
  const { isFetching: skatersLoading, data: skaters } = useGetSkatersQuery();
  const { isFetching: userLoading, data: user } = useGetUserDataQuery();

  const userSkaters = skaters.filter((s) => s.owner === user._id);

  function selectedDate(date) {
    setSelected((d) => (d = date));
  }
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.bookLesson}</h3>

        <div className={styles.secondaryContainer}>
          <div className={styles.leftPanel}>
            <p className={styles.headInfo}>
              Преди да попълните формата, моля, запознайте се с видовете{" "}
              <a href="http://roleri.bg/rollwp/lesons/">уроци</a>&nbsp;и техния{" "}
              <a href="http://roleri.bg/rollwp/plans/">график</a>
            </p>
            <h2 className={styles.secondaryHeading}>Следвайте стъпките</h2>
            <h3 className={styles.thirdHeading}>Стъпка 1</h3>
            <p className={styles.paragraph}>
              Изберете ден, маркиран в зелено, попълнете името на участника,
              възрастовата група и вида на урока. Ако изберете Абонамент, това
              означава,че ще ползвте пакет от четири урока, взети в рамките на
              четири поредни седмици в съответния ден. При лошо време урока се
              прехвърля за следващата дата.{" "}
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
            <p>{selected && selected?.toDate?.().toString()}</p>

            <DatePickerCalendar selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisteredUser;
