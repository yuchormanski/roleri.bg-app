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
import toast from "react-hot-toast";

function UnregisteredUser() {
  const [selectedDate, setSelectedDate] = useState();
  const [ageVerifier, setAgeVerifier] = useState(false);
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { register, unregister, handleSubmit, reset, getValues } = useForm();

  const { isFetching, error, data } = useGetSkaterOptionsQuery();

  // SELECTING DATE
  function selectedDateHandler(date) {
    setSelectedDate((d) => (d = date));
  }

  console.log(getValues("ageGroup"));
  function ageHandler(formAge) {
    console.log(formAge);
    // const age = Number(e.target.value.slice(-2));
    // if (age < 18) setAgeVerifier(true);
  }

  function formSuccessHandler(data) {
    console.log(data);
  }
  function formErrorHandler(error) {
    toast.error(error.message);
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

              <form onSubmit={handleSubmit()}>
                {/* First Name */}
                <div className={styles.element}>
                  <label htmlFor={"firstName"}>{lang.firstName}</label>
                  <input
                    className={styles.textInput}
                    type="text"
                    id="firstName"
                    name={"firstName"}
                    {...register("firstName", {
                      required: "First name is required",
                      maxLength: {
                        value: 20,
                        message:
                          "First name can't be more than 20 characters long!",
                      },
                    })}
                    // placeholder={lang.s_firstName}
                    autoComplete="given-name"
                  />
                </div>

                {/* Last Name */}
                <div className={styles.element}>
                  <label htmlFor={"lastName"}>{lang.lastName}</label>
                  <input
                    className={styles.textInput}
                    type="text"
                    id="lastName"
                    name={"lastName"}
                    {...register("lastName", {
                      required: "Last name is required",
                      maxLength: {
                        value: 20,
                        message:
                          "Last name can't be more than 20 characters long!",
                      },
                    })}
                    // placeholder={lang.s_lastName}
                    autoComplete="family-name"
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
                    {...register("ageGroup", {
                      required: "Age is required",
                    })}
                    placeholder={lang.age}
                    autoComplete="skater-age"
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
                    {...register("type", {
                      required: "Lesson type is required",
                    })}
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
                    {...register("level", {
                      required: "Level is required",
                    })}
                  >
                    <option value="" disabled hidden></option>
                    {data.groupsLevelData.map((level) => (
                      <option key={level._id} value={level.typeGroup}>
                        {translate(level.typeGroup)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skates */}
                <div className={styles.element}>
                  <label
                    htmlFor={`skates`}
                    // className={
                    //   hasSkater(s._id)
                    //     ? styles.enabledLevel
                    //     : styles.disabledLabel
                    // }
                  >
                    <span>{lang.skates}:</span>
                  </label>
                  <select
                    name="skates"
                    id={`skates`}
                    className={styles.select}
                    // disabled={hasSkater(s._id) ? false : true}
                    defaultValue=""
                    // onChange={(e) => selection(e, s._id)}
                    {...register("skates", {
                      required: "Skates are required",
                    })}
                  >
                    <option value="" disabled hidden></option>
                    <option value={"hasOwn"}>{lang.haveOwn}</option>
                    {data.skatesData.map((skate) => (
                      <option key={skate._id} value={skate.size}>
                        {skate.size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Protection */}
                <div className={styles.element}>
                  <label
                    htmlFor={`protection`}
                    // className={
                    //   hasSkater(s._id)
                    //     ? styles.enabledLevel
                    //     : styles.disabledLabel
                    // }
                  >
                    <span>{lang.protection}:</span>
                  </label>
                  <select
                    name="protection"
                    id={`protection`}
                    className={styles.select}
                    // disabled={hasSkater(s._id) ? false : true}
                    defaultValue=""
                    // onChange={(e) => selection(e, s._id)}
                    {...register("protection", {
                      required: "Protection is required",
                    })}
                  >
                    <option value="" disabled hidden></option>
                    <option value={"hasOwn"}>{lang.haveOwn}</option>
                    {data.protectionsData.map((protection) => (
                      <option key={protection._id} value={protection.size}>
                        {protection.size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact name */}
                {ageVerifier && (
                  <div className={styles.element}>
                    <label htmlFor={"contact"}>{lang.contactName}:</label>
                    <input
                      className={styles.textInput}
                      type="text"
                      id="contactName"
                      name={"contactName"}
                      {...register("contactName", {
                        validate: {
                          required: (value) => {
                            if (!value) return "Contact name is required";
                            return true;
                          },
                        },
                      })}
                    />
                  </div>
                )}

                {/* Email */}
                <div className={styles.element}>
                  <label htmlFor={"email"}>{lang.email}:</label>
                  <input
                    className={styles.textInput}
                    type="email"
                    id="email"
                    name={"email"}
                    {...register}
                  />
                </div>

                {/* Phone */}
                <div className={styles.element}>
                  <label htmlFor={"phone"}>{lang.phone}:</label>
                  <input
                    className={styles.textInput}
                    type="number"
                    id="phone"
                    name={"phone"}
                    {...register}
                  />
                </div>

                {/* Additional field */}
                <div className={styles.element}>
                  <label htmlFor={"textArea"}>{lang.requirements}:</label>
                  <textarea
                    className={styles.textInput}
                    type="text"
                    id="textArea"
                    name={"textArea"}
                    {...register}
                    rows={3}
                  />
                </div>
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
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UnregisteredUser;
