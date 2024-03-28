import styles from "./EditSubscriptionOption.module.css";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";
import { useEditOptionsQuery } from "../useEditOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function EditSubscriptionOption({ onClose, subscriptionData }) {
  const { lang } = useLanguage();
  const [fieldValues, setFieldValues] = useState({
    typePaymentBg: subscriptionData.typePayment.split("&/&").at(0),
    typePaymentEn: subscriptionData.typePayment.split("&/&").at(1),
    price: subscriptionData.price,
    subscriptionCount: subscriptionData.subscriptionCount,
  });

  const { mutateAsync, isPending } = useEditOptionsQuery("subscription");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      typePaymentBg: subscriptionData.typePayment.split("&/&").at(0),
      typePaymentEn: subscriptionData.typePayment.split("&/&").at(1),
      price: subscriptionData.price,
      subscriptionCount: subscriptionData.subscriptionCount,
    },
  });

  // SUBMITTING THE FORM
  async function onFormSubmit(formData) {
    const result = {
      _id: subscriptionData._id,
      typePayment: `${formData.typePaymentBg}&/&${formData.typePaymentEn}`,
      price: formData.price,
      subscriptionCount: formData.subscriptionCount,
    };

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
        <h2 className={styles.heading}>{lang.editOptions}</h2>

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
              step="0.01"
              id="price"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be a negative number!",
                },
              })}
              onBlur={valueHandler}
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
              <Button type={"primary"}>{lang.editOptions}</Button>
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

export default EditSubscriptionOption;

// <div className={styles.element}>
//   <input
//     className={styles.textInput}
//     type="text"
//     id="firstName"
//     name={"firstName"}
//     {...register("firstName", {
//       required: "First name is required",
//       maxLength: {
//         value: 20,
//         message: "First name can't be more than 20 characters long!",
//       },
//     })}
//     onBlur={valueHandler}
//     // autoComplete="given-name"
//     // autoComplete="family-name"
//   />
//   <label
//     htmlFor={"firstName"}
//     className={`${styles.label} ${
//       fieldValues.firstName ? styles.filled : null
//     }`}
//   >
//     {lang.firstName}
//   </label>
// </div>
