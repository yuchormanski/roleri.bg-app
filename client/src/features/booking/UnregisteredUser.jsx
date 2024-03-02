import styles from "./UnregisteredUser.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
import Button from "../../ui/elements/button/Button.jsx";

import { useLanguage } from "../../context/Language.jsx";
import { useForm } from "react-hook-form";
import { useTranslate } from "../../hooks/useTranslate.js";
import { useGetSkaterOptionsQuery } from "../skaters/useGetSkaterOptionsQuery.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function UnregisteredUser() {
  const [selectedDate, setSelectedDate] = useState();
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { register, handleSubmit } = useForm();

  const { data, isFetching, error } = useGetSkaterOptionsQuery();
  // const {
  //   groupsAgeData,
  //   groupsLevelData,
  //   protectionsData,
  //   skatesData,
  //   subscriptionData,
  // } = data;

  console.log(data);

  // SELECTING DATE
  function selectedDateHandler(date) {
    setSelectedDate((d) => (d = date));
  }
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
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
                <Link
                  className={styles.link}
                  to="http://roleri.bg/rollwp/plans/"
                >
                  график
                </Link>
              </p>
              <h2 className={styles.secondaryHeading}>Следвайте стъпките</h2>
              <h3 className={styles.thirdHeading}>Стъпка 1</h3>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Изберете ден, маркиран в зелено, името на участника, вида на
                урока и групата, в която ще се включи.
              </p>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Ако изберете Абонамент, това означава,че ще ползвате пакет от
                четири урока, взети в рамките на четири поредни седмици в
                съответния ден (Ще се отрази при преглед на профила Ви)..
              </p>

              <h3 className={styles.thirdHeading}>Стъпка 2</h3>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Изпратете Вашата форма. Ще получите потвърждение на Вашето
                участие на посоченият e-mail адрес.
              </p>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                При лошо време урока се прехвърля за следващата дата.{" "}
              </p>
            </div>

            <div className={styles.rightPanel}>
              <h3 className={styles.secondaryHeading}>{lang.selectDay}</h3>
              <DatePickerCalendar selectedDateProp={selectedDateHandler} />

              <h3 className={styles.secondaryHeading}>Fill the form</h3>

              <form>
                {/* First Name */}
                <div className={styles.element}>
                  <label htmlFor={"firstName"}>First Name</label>
                  <input
                    className={styles.textInput}
                    type="text"
                    id="firstName"
                    name={"firstName"}
                    {...register}
                  />
                </div>

                {/* Last Name */}
                <div className={styles.element}>
                  <label htmlFor={"lastName"}>Last Name</label>
                  <input
                    className={styles.textInput}
                    type="text"
                    id="lastName"
                    name={"lastName"}
                    {...register}
                  />
                </div>

                {/* Age */}
                <div className={styles.element}>
                  <label
                    htmlFor={`ageGroup`}
                    // className={
                    //   hasSkater(s._id)
                    //     ? styles.enabledLevel
                    //     : styles.disabledLabel
                    // }
                  >
                    <span>Age group:</span>
                  </label>
                  <select
                    name="ageGroup"
                    id={`ageGroup`}
                    className={styles.select}
                    // disabled={hasSkater(s._id) ? false : true}
                    defaultValue=""
                    // onChange={(e) => selection(e, s._id)}
                  >
                    <option value="" disabled hidden></option>
                    {data.groupsAgeData.map((age) => (
                      <option value={age.typeGroup} key={age._id}>
                        {age.typeGroup}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lesson type */}
                <div className={styles.element}>
                  <label
                    htmlFor={`type`}
                    // className={
                    //   hasSkater(s._id)
                    //     ? styles.enabledLevel
                    //     : styles.disabledLabel
                    // }
                  >
                    <span>{lang.type}:</span>
                  </label>
                  <select
                    name="type"
                    id={`type`}
                    className={styles.select}
                    // disabled={hasSkater(s._id) ? false : true}
                    defaultValue=""
                    // onChange={(e) => selection(e, s._id)}
                  >
                    <option value="" disabled hidden></option>
                    <option value="group">One time group</option>
                    <option value="subscription">Group Subscription</option>
                  </select>
                </div>

                {/* Level */}
                <div className={styles.element}>
                  <label
                    htmlFor={`level`}
                    // className={
                    //   hasSkater(s._id)
                    //     ? styles.enabledLevel
                    //     : styles.disabledLabel
                    // }
                  >
                    <span>{lang.level}:</span>
                  </label>
                  <select
                    name="level"
                    id={`level`}
                    className={styles.select}
                    // disabled={hasSkater(s._id) ? false : true}
                    defaultValue=""
                    // onChange={(e) => selection(e, s._id)}
                  >
                    <option value="" disabled hidden></option>
                    {data.groupsLevelData.map((level) => (
                      <option key={level._id} value={level.typeGroup}>
                        {translate(level.typeGroup)}
                      </option>
                    ))}
                  </select>
                </div>
              </form>

              <div className={styles.conditions}>
                <p>
                  Съгласявам се с{" "}
                  <Link className={styles.link} to={"/conditions"}>
                    Общите условия
                  </Link>
                </p>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  // onChange={(e) => checkboxHandler(e, s._id)}
                />
              </div>
              <div className={styles.btnContainer}>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type={"primary"}
                    // onClick={bookHandler}
                    // disabled={!selectedDate && sign.length === 0}
                  >
                    {lang.addSkater}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UnregisteredUser;
