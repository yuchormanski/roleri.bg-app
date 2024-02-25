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

function AddSkater({ onClose }) {
  const { lang, index } = useLanguage();
  const { isLoading, data: options_data } = useGetSkaterOptionsQuery();
  const { addSkaterMutation } = useAddSkaterQuery();
  const { register, handleSubmit, reset } = useForm();
  const { translatePhrase, translatePhraseFn } = useTranslate();

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
          <input
            className={styles.input}
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First name is required",
              maxLength: {
                value: 20,
                message: "First name can't be more than 20 characters long!",
              },
            })}
            placeholder={lang.s_firstName}
            autoComplete="given-name"
          />
          <input
            className={styles.input}
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Last name is required",
              maxLength: {
                value: 20,
                message: "Last name can't be more than 20 characters long!",
              },
            })}
            placeholder={lang.s_lastName}
            autoComplete="family-name"
          />

          <div className={styles.fieldsContainer}>
            <input
              className={`${styles.input} ${styles.halfWidth}`}
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
              placeholder={lang.age}
              autoComplete="skater-age"
            />

            <select
              className={`${styles.halfWidth} ${styles.select}`}
              id="gender"
              {...register("gender", {
                required: "Gender is required",
              })}
              defaultValue=""
            >
              <option value="" disabled hidden>
                {lang.gender}
              </option>
              <option value="male">{lang.s_genderMale}</option>
              <option value="female">{lang.s_genderFemale}</option>
            </select>
          </div>

          <div className={styles.fieldsContainer}>
            <select
              className={styles.input}
              id="skatesSize"
              {...register("skatesSize", {
                required: "Skate size is required",
              })}
              defaultValue=""
            >
              <option value="" disabled hidden>
                {lang.s_skates}
              </option>
              {options_data?.skatesData?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.size}
                </option>
              ))}
            </select>

            <select
              className={styles.input}
              id="protection"
              {...register("protection", {
                required: "Protection is required",
              })}
              defaultValue=""
            >
              <option value="" disabled hidden>
                {lang.s_protections}
              </option>
              {options_data?.protectionsData?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.size}
                </option>
              ))}
            </select>
          </div>

          <select
            className={styles.input}
            id="groupLevel"
            {...register("groupLevel", {
              required: "Level is required",
            })}
            defaultValue=""
          >
            <option value="" disabled hidden className={styles.selected}>
              {lang.level}
            </option>
            {options_data?.groupsLevelData?.map((l) => (
              <option key={l._id} value={l._id}>
                {translatePhrase(l.typeGroup)}
              </option>
            ))}
          </select>

          <textarea
            className={`${styles.input}`}
            type="text"
            id="additionalRequirements"
            {...register("additionalRequirements", {
              maxLength: {
                value: 120,
                message: "Requirements text can't be more than 120 characters",
              },
            })}
            placeholder={lang.requirements}
            autoComplete="skater-additional-requirements"
            rows="2"
            draggable={false}
          ></textarea>

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.addSkater}</Button>
            </div>
          </div>
        </form>
        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.u_add_skater_info}
        </p>
      </div>
    </Popup>
  );
}

export default AddSkater;
