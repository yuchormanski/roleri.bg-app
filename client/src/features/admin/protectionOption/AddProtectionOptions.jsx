import styles from "./AddProtectionOptions.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";

import { useState } from "react";

import { useAddOptionsQuery } from "../useAddOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

import { GoIssueOpened } from "react-icons/go";

const initialFieldsValues = {
  size: "",
  quantity: "",
};

function AddProtectionOptions({ onClose }) {
  const { lang } = useLanguage();
  const [fieldValues, setFieldValues] = useState(initialFieldsValues);
  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useAddOptionsQuery("protection");

  const { register, handleSubmit, reset } = useForm();

  // SUBMITTING THE FORM
  async function onFormSubmit(protectionData) {
    const result = {
      size: protectionData.size.toUpperCase(),
      quantity: Number(protectionData.quantity),
    };

    const protectionAvailableData = queryClient.getQueryData(["protection"]);
    if (protectionAvailableData.some((p) => p.size == result.size)) {
      return toast.error(`Protector size ${result.size} already exist`);
    }

    try {
      await mutateAsync(result);

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
    <Popup onClose={onClose} backgroundClick={false} userWidth={"width800"}>
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
              // autoComplete="given-name"
              // autoComplete="family-name"
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
              // autoComplete="given-name"
              // autoComplete="family-name"
            />
            <label
              htmlFor={"quantity"}
              className={`${styles.label} ${
                fieldValues.quantity ? styles.filled : null
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
        <section className={styles.description}>
          <p className={styles.info}>
            <span>
              <GoIssueOpened />
            </span>
            {lang.a_protection_info_1}
          </p>
          <p className={styles.info}>
            <span>
              <GoIssueOpened />
            </span>
            {lang.a_skates_info_4}
          </p>

          <p className={styles.info}>
            <span>
              <GoIssueOpened />
            </span>
            {lang.a_protection_info_3}
          </p>
          <p className={styles.info}>
            <span>&#9737;</span>
            {lang.a_protection}
          </p>
        </section>
      </div>
    </Popup>
  );
}

export default AddProtectionOptions;
