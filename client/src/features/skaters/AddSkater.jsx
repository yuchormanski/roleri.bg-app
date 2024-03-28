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

function AddSkater({ onClose }) {
  const { lang, index } = useLanguage();
  const { translatePhrase, translatePhraseFn } = useTranslate();
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
                  {s.size === 0 ? lang.haveOwn : s.size}
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
                  {p.size == 0 ? lang.haveOwn : p.size}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className={`${styles.input}`}
            type="text"
            id="additionalRequirements"
            {...register("additionalRequirements", {
              maxLength: {
                value: 150,
                message: "Requirements text can't be more than 150 characters",
              },
            })}
            placeholder={lang.requirements}
            autoComplete="skater-additional-requirements"
            rows="2"
            draggable={false}
          />

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

// <section className={styles.description}>
//   <p className={styles.info}>
//     <span>
//       <GoIssueOpened />
//     </span>
//     To create an instructor select him from the list and change his role
//   </p>
// </section>;
