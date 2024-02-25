import styles from "./AddSkater.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import Select from "react-select";

import { useLanguage } from "../../context/Language.jsx";

import { useAddSkaterQuery } from "./useAddSkaterQuery.js";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useGetSkaterOptionsQuery } from "./useGetSkaterOptionsQuery.js";

function AddSkater({ onClose }) {
  const { lang } = useLanguage();

  const { isLoading, data: options_data } = useGetSkaterOptionsQuery();
  const { addSkaterMutation } = useAddSkaterQuery();
  const { register, handleSubmit, reset } = useForm();

  // SUBMITTING THE FORM
  function onFormSubmit(skaterData) {
    // addSkaterMutation.mutate(skaterData);
    console.log(skaterData);
    onClose();
    reset();
  }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  // TODO: Add additionalRequirements property

  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

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
          <input
            className={styles.input}
            type="number"
            id="age"
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
            placeholder={lang.age}
            autoComplete="skater-age"
          />

          <select
            className={styles.input}
            id="gender"
            {...register("gender", {
              required: "Gender is required",
            })}
            autoComplete="skater-gender"
          >
            <option value="">{lang.gender}</option>
            <option value="male">{lang.s_genderMale}</option>
            <option value="female">{lang.s_genderFemale}</option>
          </select>

          <select
            className={styles.input}
            id="skatesSize"
            {...register("skatesSize", {})}
            autoComplete="skate-size"
          >
            <option value="">{lang.s_skateSize}</option>
            {options_data?.skatesData?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.size}
              </option>
            ))}
          </select>

          <select
            className={styles.input}
            id="protection"
            {...register("protection", {})}
            autoComplete="protection"
          >
            <option value="">{lang.s_protections}</option>
            {options_data?.protectionsData?.map((p) => (
              <option key={p._id} value={p._id}>
                {p.size}
              </option>
            ))}
          </select>

          <select
            className={styles.input}
            id="groupLevel"
            {...register("groupLevel", {})}
            autoComplete="groupLevel"
          >
            <option value="">{lang.level}</option>
            {options_data?.groupsLevelData?.map((l) => (
              <option key={l._id} value={l._id}>
                {l.typeGroup}
              </option>
            ))}
          </select>

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.addSkater}</Button>
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
}

export default AddSkater;
