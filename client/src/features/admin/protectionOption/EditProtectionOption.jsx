import styles from "./EditProtectionOption.module.css";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";
import { useEditOptionsQuery } from "../useEditOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function EditProtectionOption({ onClose, protectionData }) {
  const { lang } = useLanguage();
  const [fieldValues, setFieldValues] = useState(protectionData);

  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }

  const { mutateAsync, isPending } = useEditOptionsQuery("protection");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: protectionData,
  });

  // SUBMITTING THE FORM
  async function onFormSubmit(protectionData) {
    try {
      await mutateAsync(protectionData);

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
              id="size"
              name={"size"}
              {...register("size", {
                required: "Protection size is required",
                min: {
                  value: 0,
                  message: "Protection size cannot be a negative number.",
                },
              })}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"size"}
              className={`${styles.label} ${
                fieldValues.size ? styles.filled : null
              }`}
            >
              {lang.s_protections}
            </label>
          </div>

          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="number"
              id="quantity"
              name={"quantity"}
              {...register("quantity", {
                required: "Protection quantity is required",
                min: {
                  value: 0,
                  message: "Protection quantity cannot be a negative number.",
                },
              })}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"size"}
              className={`${styles.label} ${
                fieldValues.quantity ? styles.filled : null
              }`}
            >
              {lang.quantity}
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

export default EditProtectionOption;
