import styles from "./EditSkater.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

import { useEditSkaterQuery } from "./useEditSkaterQuery.js";
import { useGetSkaterOptionsQuery } from "./useGetSkaterOptionsQuery.js";
import { useState } from "react";

function EditSkater({ onClose, skaterData }) {
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();

  const { isLoading, data: options_data } = useGetSkaterOptionsQuery();
  const { editSkaterMutation } = useEditSkaterQuery();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: skaterData.firstName,
      lastName: skaterData.lastName,
      age: skaterData.age,
      skatesSize: skaterData.skatesSize?._id,
      protection: skaterData.protection?._id,
    },
  });
  const [fieldValues, setFieldValues] = useState({
    firstName: skaterData.firstName,
    lastName: skaterData.lastName,
    age: skaterData.age,
    skatesSize: skaterData.skatesSize?._id,
    protection: skaterData.protection?._id,
  });

  // SUBMITTING THE FORM
  async function onFormSubmit(userInput) {
    try {
      await editSkaterMutation.mutateAsync({
        ...userInput,
        _id: skaterData._id,
      });
      onClose();
      reset();
    } catch (error) {
      toast.error(error.message);
      console.error("Edit skater error:", error);
    }
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
      {(editSkaterMutation.isPending || isLoading) && <Spinner />}
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>{lang.editSkater}</h2>

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

          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="text"
              id="lastName"
              name="lastName"
              {...register("lastName", {
                required: "Last name is required",
                maxLength: {
                  value: 20,
                  message: "Last name can't be more than 20 characters long!",
                },
              })}
              onBlur={valueHandler}
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

          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="number"
              id="age"
              name={"age"}
              {...register("age", {
                required: "Age is required",
                max: {
                  value: 120,
                  message: "Age must be under 120 years",
                },
                min: {
                  value: 2,
                  message: "Age must be over 2 years",
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

          <div className={styles.element}>
            <select
              name="skatesSize"
              className={styles.select}
              defaultValue=""
              id="skatesSize"
              {...register("skatesSize", {})}
              onBlur={valueHandler}
            >
              <option value="" disabled hidden></option>
              {options_data?.skatesData?.map((s) => (
                <option value={s._id} key={s._id}>
                  {s.size === 0 ? lang.haveOwn : s.size}
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

          <div className={styles.element}>
            <select
              name="protection"
              className={styles.select}
              defaultValue=""
              id="protection"
              {...register("protection", {})}
              onBlur={valueHandler}
            >
              <option value="" disabled hidden></option>
              {options_data?.protectionsData?.map((p) => (
                <option key={p._id} value={p._id}>
                  {Number(p.size) === 0 ? lang.haveOwn : p.size.toUpperCase()}
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

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.editSkater}</Button>
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
}

export default EditSkater;
