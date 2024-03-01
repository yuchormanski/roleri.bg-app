import styles from './AddSubscriptionOptions.module.css'

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import { useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";

import { useAddOptionsQuery } from '../useAddOptionsQuery.js';

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function AddSubscriptionOptions({ onClose }) {
    const { lang } = useLanguage();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useAddOptionsQuery("subscription");

    const { register, handleSubmit, reset } = useForm();

    // SUBMITTING THE FORM
    function onFormSubmit(subscriptionData) {
        const result = {
            typePayment: `${subscriptionData.typePaymentBg}&/&${subscriptionData.typePaymentEn}`,
            price: subscriptionData.price,
        };

        const subscriptionAvailableData = queryClient.getQueryData(["subscription"]);
        if (subscriptionAvailableData.some(p => p.typePayment == result.typePayment)) {
            return toast.error(`Subscription type ${subscriptionData.typePayment} already exist`);
        }

        mutate(result);
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
            {isPending && <Spinner />}
            <div className={styles.container}>
                <div className={styles.closeBtn}>
                    <button onClick={onClose} className={styles.closeIcon}><GoX /></button>
                </div>
                <h2 className={styles.heading}>{lang.addOptions}</h2>
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
                        id="price"
                        {...register("price", {
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price cannot be a negative number!"
                            }
                        })}
                        placeholder={lang.price}
                        autoComplete="price"
                    />

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