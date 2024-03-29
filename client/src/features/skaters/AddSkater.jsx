import styles from "./AddSkater.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../context/Language.jsx";

import { useAddSkaterQuery } from "./useAddSkaterQuery.js";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useGetSkaterOptionsQuery } from "./useGetSkaterOptionsQuery.js";
import { useTranslate } from "../../hooks/useTranslate.js";

import { GoIssueOpened } from "react-icons/go";
import { useState } from "react";

const initialFieldsValues = {
  firstName: "",
  lastName: "",
  age: "",
  skatesSize: "",
};

function AddSkater({ onClose }) {
  const { lang, index } = useLanguage();
  const { translatePhrase, translatePhraseFn } = useTranslate();

  const [fieldValues, setFieldValues] = useState({});

  const {
    isLoading,
    isFetching,
    data: options_data,
  } = useGetSkaterOptionsQuery();

  const { addSkaterMutation } = useAddSkaterQuery();

  const { register, unregister, handleSubmit, reset } = useForm();

  // SUBMITTING THE FORM
  function onFormSubmit(skaterData) {
    // console.log(skaterData);
    addSkaterMutation.mutate(skaterData);
    onClose();
    reset();
  }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }
  return (
    <Popup onClose={onClose} backgroundClick={false}>
      {(addSkaterMutation.isPending || isLoading) && <Spinner />}
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>{lang.addSkater}</h2>
        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
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
                  message: "First name can't be more than 20 characters long!",
                },
              })}
              onBlur={valueHandler}
              autoComplete="given-name"
              // autoComplete="family-name"
            />
            <label
              htmlFor={"firstName"}
              className={`${styles.label} ${
                fieldValues.firstName ? styles.filled : null
              }`}
            >
              {lang.s_firstName}
            </label>
          </div>

          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="text"
              id="lastName"
              {...register("lastName", {
                required: "Last name is required",
                maxLength: {
                  value: 20,
                  message: "Last name can't be more than 20 characters long!",
                },
              })}
              onBlur={valueHandler}
              // autoComplete="given-name"
              autoComplete="family-name"
            />
            <label
              htmlFor={"lastName"}
              className={`${styles.label} ${
                fieldValues.lastName ? styles.filled : null
              }`}
            >
              {lang.s_lastName}
            </label>
          </div>

          <div className={styles.fieldsContainer}>
            {/* AGE */}

            <div className={styles.element}>
              <input
                className={styles.textInput}
                type="number"
                id="age"
                {...register("age", {
                  required: "Age is required",
                  max: {
                    value: 120,
                    message: "Age must be under 120 years",
                  },
                  min: {
                    value: 3,
                    message: "Age must be at least 3 years",
                  },
                })}
                onBlur={valueHandler}
              />
              <label
                htmlFor={"age"}
                className={`${styles.label} ${
                  fieldValues.age ? styles.filled : null
                }`}
              >
                {lang.age}
              </label>
            </div>

            {/* SKATEs */}

            <div className={styles.element}>
              <select
                name="skatesSize"
                id={`skatesSize`}
                className={styles.select}
                defaultValue=""
                {...register("skatesSize", {
                  required: "Skates are required",
                })}
                onBlur={valueHandler}
              >
                <option value="" disabled hidden></option>
                {options_data?.skatesData?.map((skate) => (
                  <option key={skate._id} value={skate._id}>
                    {skate.size === 0 ? lang.haveOwn : skate.size}
                  </option>
                ))}
              </select>
              <label
                htmlFor={`skatesSize`}
                className={`${styles.selectLabel} ${
                  fieldValues.skatesSize ? styles.filled : null
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
                onBlur={valueHandler}
              >
                <option value="" disabled hidden></option>
                {/* <option value={"hasOwn"}>{lang.haveOwn}</option> */}
                {options_data?.protectionsData?.map((protection) => (
                  <option key={protection._id} value={protection._id}>
                    {Number(protection.size) === 0
                      ? lang.haveOwn
                      : protection.size.toUpperCase()}
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

          <div className={styles.element}>
            <textarea
              className={styles.textarea}
              type="text"
              id="additionalRequirements"
              {...register("additionalRequirements", {
                maxLength: {
                  value: 150,
                  message:
                    "Requirements text can't be more than 150 characters",
                },
              })}
              rows={3}
              draggable={false}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"additionalRequirements"}
              className={`${styles.label} ${
                fieldValues.additionalRequirements ? styles.filled : null
              }`}
            >
              {lang.requirements}
            </label>
          </div>

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.addSkater}</Button>
            </div>
          </div>
        </form>
        <section className={styles.description}>
          <p className={styles.info}>
            <span>
              <GoIssueOpened />
            </span>
            {lang.u_add_skater_info}
          </p>
        </section>
      </div>
    </Popup>
  );
}

export default AddSkater;
