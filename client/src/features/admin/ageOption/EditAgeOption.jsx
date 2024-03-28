import styles from "./EditAgeOption.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";
import { useEditOptionsQuery } from "../useEditOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import { useState } from "react";

function EditAgeOption({ onClose, ageData }) {
  const { lang } = useLanguage();

  const [fieldValues, setFieldValues] = useState(ageData);

  const { mutateAsync, isPending } = useEditOptionsQuery("age");
  const { register, handleSubmit, reset } = useForm({ defaultValues: ageData });

  // SUBMITTING THE FORM
  async function onFormSubmit(ageData) {
    try {
      await mutateAsync(ageData);

      onClose();
      reset();
    } catch (error) {
      console.error(error.message);
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
      {isPending && <Spinner />}
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>{lang.editOptions}</h2>

        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="text"
              id="typeGroup"
              name={"typeGroup"}
              {...register("typeGroup", {
                required: "Type of the age group is required",
              })}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"typeGroup"}
              className={`${styles.label} ${
                fieldValues.typeGroup ? styles.filled : null
              }`}
            >
              {lang.ageGroup}
            </label>
          </div>

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.editOptions}</Button>
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
}

export default EditAgeOption;

// const [fieldValues, setFieldValues] = useState(initialFieldsValues);
// function valueHandler(e) {
//   const valueName = e.target.name;
//   const value = e.target.value;
//   setFieldValues({ ...fieldValues, [valueName]: value });
// }
