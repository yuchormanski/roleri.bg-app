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

const initialFieldsValues = {
  firstName: "",
  lastName: "",
  ageGroup: "",
  type: "",
  level: "",
  skates: "",
  protection: "",
  contactName: "",
  email: "",
  phone: "",
  textArea: "",
};

function UnregisteredUser() {
  const [selectedDate, setSelectedDate] = useState();
  const [ageVerifier, setAgeVerifier] = useState(false);
  const [fieldValues, setFieldValues] = useState(initialFieldsValues);
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { register, unregister, handleSubmit, reset, getValues } = useForm();

  const { isFetching, error, data } = useGetSkaterOptionsQuery();

  // SELECTING DATE
  function selectedDateHandler(date) {
    setSelectedDate((d) => (d = date));
  }

  function formSuccessHandler(data) {
    console.log(data);
  }
  function formErrorHandler(error) {
    toast.error(error.message);
  }

  // HELPER
  function ageHandler(e) {
    if (!e.target.value) return;
    const age = Number(e.target.value.slice(-2));
    if (age < 18) setAgeVerifier(true);
  }

  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }
  function onFocusHandler(e) {
    const valueName = e.target.name;
    setFieldValues({ ...fieldValues, [valueName]: "" });
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

              <form onSubmit={handleSubmit()} className={styles.form}>
                <div className={styles.fieldContainer_double}>
                  {/* First Name */}
                  <div className={styles.element}>
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
                      onChange={valueHandler}
                      autoComplete="given-name"
                    />
                    <label
                      htmlFor={"firstName"}
                      className={`${styles.label} ${
                        fieldValues.firstName ? styles.filled : null
                      }`}
                    >
                      {lang.firstName}
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className={styles.element}>
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
                      onChange={valueHandler}
                      autoComplete="family-name"
                    />
                    <label
                      htmlFor={"lastName"}
                      className={`${styles.label} ${
                        fieldValues.lastName ? styles.filled : null
                      }`}
                    >
                      {lang.lastName}
                    </label>
                  </div>
                </div>

                <div className={styles.fieldContainer_triple}>
                  {/* Age */}
                  <div className={styles.element}>
                    <select
                      name="ageGroup"
                      id={`ageGroup`}
                      className={styles.select}
                      defaultValue=""
                      {...register("ageGroup", {
                        required: "Age is required",
                      })}
                      onBlur={ageHandler}
                      onChange={valueHandler}
                    >
                      <option value="" disabled hidden></option>
                      {data.groupsAgeData.map((age) => (
                        <option value={age.typeGroup} key={age._id}>
                          {age.typeGroup}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor={`ageGroup`}
                      className={`${styles.selectLabel} ${
                        fieldValues.ageGroup ? styles.filled : null
                      }`}
                    >
                      <span>{lang.ageGroup}</span>
                    </label>
                  </div>

                  {/* Skates */}
                  <div className={styles.element}>
                    <select
                      name="skates"
                      id={`skates`}
                      className={styles.select}
                      defaultValue=""
                      {...register("skates", {
                        required: "Skates are required",
                      })}
                      onChange={valueHandler}
                    >
                      <option value="" disabled hidden></option>
                      <option value={"hasOwn"}>{lang.haveOwn}</option>
                      {data.skatesData.map((skate) => (
                        <option key={skate._id} value={skate.size}>
                          {skate.size}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor={`skates`}
                      className={`${styles.selectLabel} ${
                        fieldValues.skates ? styles.filled : null
                      }`}
                    >
                      <span>{lang.skates}</span>
                    </label>
                  </div>

                  {/* Protection */}
                  <div className={styles.element}>
                    <select
                      name="protection"
                      id={`protection`}
                      className={styles.select}
                      defaultValue=""
                      {...register("protection", {
                        required: "Protection is required",
                      })}
                      onChange={valueHandler}
                    >
                      <option value="" disabled hidden></option>
                      <option value={"hasOwn"}>{lang.haveOwn}</option>
                      {data.protectionsData.map((protection) => (
                        <option key={protection._id} value={protection.size}>
                          {protection.size}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor={`protection`}
                      className={`${styles.selectLabel} ${
                        fieldValues.protection ? styles.filled : null
                      }`}
                    >
                      <span>{lang.protection}</span>
                    </label>
                  </div>
                </div>

                <div className={styles.fieldContainer_double}>
                  {/* Lesson type */}
                  <div className={styles.element}>
                    <select
                      name="type"
                      id={`type`}
                      className={styles.select}
                      defaultValue=""
                      {...register("type", {
                        required: "Lesson type is required",
                      })}
                      onChange={valueHandler}
                    >
                      <option value="" disabled hidden></option>
                      <option value="group">One time group</option>
                      <option value="subscription">Group Subscription</option>
                    </select>
                    <label
                      htmlFor={`type`}
                      className={`${styles.selectLabel} ${
                        fieldValues.type ? styles.filled : null
                      }`}
                    >
                      <span>{lang.type}</span>
                    </label>
                  </div>

                  {/* Level */}
                  <div className={styles.element}>
                    <select
                      name="level"
                      id={`level`}
                      className={styles.select}
                      defaultValue=""
                      {...register("level", {
                        required: "Level is required",
                      })}
                      onChange={valueHandler}
                    >
                      <option value="" disabled hidden></option>
                      {data.groupsLevelData.map((level) => (
                        <option key={level._id} value={level.typeGroup}>
                          {translate(level.typeGroup)}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor={`level`}
                      className={`${styles.selectLabel} ${
                        fieldValues.level ? styles.filled : null
                      }`}
                    >
                      <span>{lang.level}</span>
                    </label>
                  </div>
                </div>

                {/* Contact name */}
                {ageVerifier && (
                  <div className={styles.element}>
                    <input
                      className={styles.textInput}
                      type="text"
                      id="contactName"
                      name={"contactName"}
                      {...register("contactName", {
                        validate: {
                          required: (value) => {
                            if (!value && ageVerifier)
                              return "Contact name is required";
                            return true;
                          },
                        },
                      })}
                      onChange={valueHandler}
                    />
                    <label
                      htmlFor={"contactName"}
                      className={`${styles.label} ${
                        fieldValues.contactName ? styles.filled : null
                      }`}
                    >
                      {lang.contactName}
                    </label>
                  </div>
                )}

                <div
                  className={`${styles.fieldContainer_double} ${styles.fieldContainer_double_extended}`}
                >
                  {/* Email */}
                  <div className={styles.element}>
                    <input
                      className={styles.textInput}
                      type="email"
                      id="email"
                      name={"email"}
                      {...register}
                      onChange={valueHandler}
                    />
                    <label
                      htmlFor={"email"}
                      className={`${styles.label} ${
                        fieldValues.email ? styles.filled : null
                      }`}
                    >
                      {lang.email}
                    </label>
                  </div>

                  {/* Phone */}
                  <div className={styles.element}>
                    <input
                      className={styles.textInput}
                      type="number"
                      id="phone"
                      name={"phone"}
                      {...register}
                      onChange={valueHandler}
                    />
                    <label
                      htmlFor={"phone"}
                      className={`${styles.label} ${
                        fieldValues.phone ? styles.filled : null
                      }`}
                    >
                      {lang.phone}
                    </label>
                  </div>
                </div>

                {/* Additional field */}
                <div className={styles.element}>
                  <textarea
                    className={styles.textarea}
                    type="text"
                    id="textArea"
                    name={"textArea"}
                    {...register}
                    rows={3}
                    onChange={valueHandler}
                  />
                  <label
                    htmlFor={"textArea"}
                    className={`${styles.label} ${
                      fieldValues.textArea ? styles.filled : null
                    }`}
                  >
                    {lang.requirements}
                  </label>
                </div>

                {/* Conditions */}
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
