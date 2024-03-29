import styles from "./EditSubscriptionOption.module.css";

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
          <input
            className={styles.input}
            type="text"
            id="typePaymentBg"
            {...register("typePaymentBg", {
              required: "Type of the subscription is required",
            })}
            placeholder={lang.typePaymentBg}
            autoComplete="typePaymentBg"
          />
          <input
            className={styles.input}
            type="text"
            id="typePaymentEn"
            {...register("typePaymentEn", {
              required: "Type of the subscription is required",
            })}
            placeholder={lang.typePaymentEn}
            autoComplete="typePaymentEn"
          />
          <input
            className={styles.input}
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
            placeholder={lang.price}
            autoComplete="price"
          />
          <input
            className={styles.input}
            type="number"
            id="subscriptionCount"
            {...register("subscriptionCount", {
              required: "Subscription count is required",
              min: {
                value: 0,
                message: "Subscription count cannot be a negative number!",
              },
            })}
            placeholder={lang.subscriptionCount}
          />

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
