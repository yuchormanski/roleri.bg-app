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
            id="skatesSize"
            {...register("skatesSize", {})}
            autoComplete="skate-size"
          >
            <option value="">{lang.s_skateSize}</option>
            {options_data?.skatesData?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.size === 0 ? lang.haveOwn : s.size}
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
                {Number(p.size) === 0 ? lang.haveOwn : p.size}
              </option>
            ))}
          </select>

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
