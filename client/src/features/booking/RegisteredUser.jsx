import styles from "./RegisteredUser.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
import { useLanguage } from "../../context/Language.jsx";
import { useGetSkatersQuery } from "../skaters/useGetSkatersQuery.js";
import { useGetUserDataQuery } from "../users/useGetUserDataQuery.js";
import { useGetSkaterOptionsQuery } from "../skaters/useGetSkaterOptionsQuery.js";
import { useTranslate } from "../../hooks/useTranslate.js";
import Button from "../../ui/elements/button/Button.jsx";
import toast from "react-hot-toast";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function RegisteredUser() {
  const { lang, index } = useLanguage();

  const { isFetching: skatersLoading, data: skaters } = useGetSkatersQuery();
  const { isFetching: userLoading, data: user } = useGetUserDataQuery();
  const { isLoading, isFetching, data } = useGetSkaterOptionsQuery();

  const { translatePhrase: translate } = useTranslate();
  const [selectedDate, setSelectedDate] = useState();
  const [sign, setSign] = useState([]);
  const [additional, setAdditional] = useState("");
  const navigate = useNavigate();

  // SELECTING DATE
  function selectedDateHandler(date) {
    setSelectedDate((d) => (d = date));
  }

  // SELECTING SKATER
  function checkboxHandler(e, id) {
    if (e.target.checked) {
      setSign((arr) => [...arr, { skaterId: id }]);
    } else {
      setSign((arr) => arr.filter((el) => el.skaterId !== id));
    }
  }

  // SELECTING LESSONS TYPE & LEVEL
  function selection(e, skaterId) {
    const skaterObj = sign.filter((s) => s.skaterId === skaterId).at(0);
    skaterObj[e.target.name] = e.target.value;
    setSign((state) => (state = [...sign]));
  }
  // FINISHING REQUEST
  function bookHandler() {
    // hardcoded disable validation
    if (!selectedDate && sign.length === 0) {
      return toast.error("You should fill the form!");
    }

    // if not selected date
    if (!selectedDate) {
      return toast.error("You should choose a date!");
    }
    if (sign.length === 0) {
      console.log(sign.length);
      return toast.error("You should make a selection!");
    }

    // if selected date is before the current
    if (new Date(selectedDate) < new Date()) {
      return toast.error("The selected date is before the current!");
    }

    // preview on date
    // const lessonDate = selectedDate.toDateString();

    const result = sign
      .map((s) => {
        if (!!s.skaterId && !!s.type && !!s.level) return true;
        else return false;
      })
      .every((x) => x);

    if (result) {
      const objToFetch = {
        date: selectedDate.toLocaleDateString(),
        skaters: sign,
        additional: additional,
      };

      console.log(objToFetch);
      toast.success("You successfully book for lesson");
      // navigate("/profile");
    } else return toast.error("You should select all option for skater");
  }

  // HELPER
  function hasSkater(id) {
    return sign.find((s) => s.skaterId === id);
  }
  return (
    <>
      {" "}
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.heading}>{lang.bookLesson}</h3>

          <div className={styles.secondaryContainer}>
            <div className={styles.leftPanel}>
              <p className={styles.headInfo}>
                {lang.book_headInfo_1}
                <Link className={styles.link} to={"/lessons"}>
                  {lang.lessons.toLowerCase()}
                </Link>{" "}
                {lang.book_headInfo_2}
                <Link
                  className={styles.link}
                  to="http://roleri.bg/rollwp/plans/"
                >
                  {lang.schedule.toLowerCase()}
                </Link>
              </p>
              <h2 className={styles.secondaryHeading}>
                {lang.book_sec_heading_1}
              </h2>
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
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Ако по някаква причина не можете да използвате оборудването,
                което сте заявили при регистрацията си, напишете го в полето
                &apos;Допълнително&apos;
              </p>
            </div>

            <div className={styles.rightPanel}>
              <h3 className={styles.secondaryHeading}>
                {lang.book_sec_heading_2}
              </h3>
              <DatePickerCalendar selectedDateProp={selectedDateHandler} />
              <h3 className={styles.secondaryHeading}>{lang.select_skaters}</h3>
              <div className={` ${styles.userChoice} `}>
                {skaters.map((s) => (
                  <div className={styles.skaterWrapper} key={s._id}>
                    <div className={styles.skaterContainer}>
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
                      <div
                        className={styles.label}
                        // className={
                        //   hasSkater(s._id) ? styles.label : styles.hidden
                        // }
                      >
                        <label
                          htmlFor={`${s._id}-type`}
                          className={
                            hasSkater(s._id)
                              ? styles.enabledLevel
                              : styles.disabledLabel
                          }
                        >
                          <span>Вид урок:</span>
                        </label>
                        <select
                          name="type"
                          id={`${s._id}-type`}
                          className={styles.select}
                          disabled={hasSkater(s._id) ? false : true}
                          defaultValue=""
                          onChange={(e) => selection(e, s._id)}
                        >
                          <option value="" disabled hidden></option>
                          {data?.subscriptionData.map((subscription) => (
                            <option
                              value={subscription._id}
                              key={subscription._id}
                            >
                              {translate(subscription.typePayment)}
                            </option>
                          ))}

                          {/* <option value="group">One time group</option>
                          <option value="subscription">Subscription</option> */}
                        </select>
                      </div>

                      <div
                        className={styles.label}

                        // className={
                        //   hasSkater(s._id) ? styles.label : styles.hidden
                        // }
                      >
                        <label
                          htmlFor={`${s._id}-level`}
                          className={
                            hasSkater(s._id)
                              ? styles.enabledLevel
                              : styles.disabledLabel
                          }
                        >
                          <span>Група:</span>
                        </label>
                        <select
                          name="level"
                          id={`${s._id}-level`}
                          className={styles.select}
                          disabled={hasSkater(s._id) ? false : true}
                          defaultValue=""
                          onChange={(e) => selection(e, s._id)}
                        >
                          <option value="" disabled hidden></option>
                          {data?.groupsLevelData.map((level) => (
                            <option value={level._id} key={level._id}>
                              {translate(level.typeGroup)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Additional field */}
                <div className={styles.element}>
                  <label
                    htmlFor={"textArea"}
                    className={`${styles.enabledLevel} ${styles.textareaLabel} `}
                    //  ${
                    //   fieldValues.textArea ? styles.filled : null
                    // }
                  >
                    {lang.requirements}
                  </label>
                  <textarea
                    className={styles.textarea}
                    type="text"
                    id="textArea"
                    name={"textArea"}
                    rows={3}
                    onBlur={(e) => setAdditional(e.target.value)}
                  />
                </div>
              </div>

              {/* CONDITIONS */}
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
                    onClick={bookHandler}
                    disabled={!selectedDate && sign.length === 0}
                  >
                    {skaters.length > 1 ? lang.addSkaters : lang.addSkater}
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

export default RegisteredUser;
