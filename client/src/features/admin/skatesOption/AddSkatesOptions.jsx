import styles from "./AddSkatesOptions.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";

import { useAddOptionsQuery } from "../useAddOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import { useState } from "react";

function AddSkatesOptions({ onClose }) {
  const [fieldValues, setFieldValues] = useState({
    size: "",
    quantity: "",
  });
  const { lang } = useLanguage();

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useAddOptionsQuery("skates");

  const { register, handleSubmit, reset } = useForm();

  // SUBMITTING THE FORM
  async function onFormSubmit(skatesData) {
    const skatesAvailableData = queryClient.getQueryData(["skates"]);
    if (skatesAvailableData.some((s) => s.size == skatesData.size)) {
      return toast.error(`Skates ${skatesData.size} already exist`);
    }

    try {
      await mutateAsync(skatesData);

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

  // HELPER
  function inputHandle(e) {
    setFieldValues((state) => ({ ...state, [e.target.id]: e.target.value }));
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
        <h2 className={styles.heading}>{lang.addOptions}</h2>
        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
          <div className={styles.element}>
            <input
              className={styles.input}
              type="number"
              id="size"
              {...register("size", {
                required: "Skate size is required",
                min: {
                  value: 0,
                  message: "Skate size cannot be a negative number.",
                },
              })}
              onChange={inputHandle}
            />
            <label
              htmlFor={"title"}
              className={`${styles.label} ${fieldValues.size ? styles.filled : null
                }`}
            >
              {lang.number}
            </label>
          </div>
          <div className={styles.element}>
            <input
              className={styles.input}
              type="number"
              id="quantity"
              {...register("quantity", {
                required: "Skate quantity is required",
                min: {
                  value: 0,
                  message: "Skate quantity cannot be a negative number.",
                },
              })}
              onChange={inputHandle}
            />
            <label
              htmlFor={"quantity"}
              className={`${styles.label} ${fieldValues.quantity ? styles.filled : null
                }`}
            >
              {lang.quantity}
            </label>
          </div>

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.addOptions}</Button>
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
}

export default AddSkatesOptions;
