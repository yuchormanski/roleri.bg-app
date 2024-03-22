import styles from "./AddSubscriptionOptions.module.css";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";

import { useAddOptionsQuery } from "../useAddOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

const initialFieldsValues = {
  typePaymentBg: "",
  typePaymentEn: "",
  price: "",
  subscriptionCount: "",
};

function AddSubscriptionOptions({ onClose }) {
  const [fieldValues, setFieldValues] = useState(initialFieldsValues);

  const { lang } = useLanguage();

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useAddOptionsQuery("subscription");

  const { register, handleSubmit, reset } = useForm();

  // SUBMITTING THE FORM
  async function onFormSubmit(subscriptionData) {
    const result = {
      typePayment: `${subscriptionData.typePaymentBg}&/&${subscriptionData.typePaymentEn}`,
      price: subscriptionData.price,
      subscriptionCount: subscriptionData.subscriptionCount,
    };

    const subscriptionAvailableData = queryClient.getQueryData([
      "subscription",
    ]);
    if (
      subscriptionAvailableData.some((p) => p.typePayment == result.typePayment)
    ) {
      return toast.error(
        `Subscription type ${subscriptionData.typePayment} already exist`
      );
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

        <h2 className={styles.heading}>{lang.addOptions}</h2>
        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="text"
              id="typePaymentBg"
              {...register("typePaymentBg", {
                required: "Type of the subscription is required",
              })}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"typePaymentBg"}
              className={`${styles.label} ${
                fieldValues.typePaymentBg ? styles.filled : null
              }`}
            >
              {lang.typePaymentBg}
            </label>
          </div>

          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="text"
              id="typePaymentEn"
              {...register("typePaymentEn", {
                required: "Type of the subscription is required",
              })}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"typePaymentEn"}
              className={`${styles.label} ${
                fieldValues.typePaymentEn ? styles.filled : null
              }`}
            >
              {lang.typePaymentEn}
            </label>
          </div>

          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="number"
              id="price"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be a negative number!",
                },
              })}
              onBlur={valueHandler}
              // autoComplete="given-name"
              // autoComplete="family-name"
            />
            <label
              htmlFor={"price"}
              className={`${styles.label} ${
                fieldValues.price ? styles.filled : null
              }`}
            >
              {lang.price}
            </label>
          </div>

          <div className={styles.element}>
            <input
              className={styles.textInput}
              type="number"
              id="subscriptionCount"
              {...register("subscriptionCount", {
                required: "Subscription count is required",
                min: {
                  value: 0,
                  message: "Subscription count cannot be a negative number!",
                },
              })}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"subscriptionCount"}
              className={`${styles.label} ${
                fieldValues.subscriptionCount ? styles.filled : null
              }`}
            >
              {lang.subscriptionCount}
            </label>
          </div>

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>{lang.addOptions}</Button>
            </div>
          </div>
        </form>
        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.a_level_1}
        </p>
      </div>
    </Popup>
  );
}

export default AddSubscriptionOptions;
{
  /* <input
            className={styles.input}
            type="text"
            id="typePaymentBg"
            {...register("typePaymentBg", {
              required: "Type of the subscription is required",
            })}
            placeholder={lang.typePaymentBg}
            autoComplete="typePaymentBg"
          /> */
}
{
  /* <input
            className={styles.input}
            type="text"
            id="typePaymentEn"
            {...register("typePaymentEn", {
              required: "Type of the subscription is required",
            })}
            placeholder={lang.typePaymentEn}
            autoComplete="typePaymentEn"
          /> */
}

// <input
//   className={styles.input}
//   type="number"
//   id="price"
//   step="0.01"
//   {...register("price", {
//     required: "Price is required",
//     min: {
//       value: 0,
//       message: "Price cannot be a negative number!",
//     },
//   })}
//   placeholder={lang.price}
//   autoComplete="price"
// />
// <input
//   className={styles.input}
//   type="number"
//   id="subscriptionCount"
//   {...register("subscriptionCount", {
//     required: "Subscription count is required",
//     min: {
//       value: 0,
//       message: "Subscription count cannot be a negative number!",
//     },
//   })}
//   placeholder={lang.subscriptionCount}
// />
