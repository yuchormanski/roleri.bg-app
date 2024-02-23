import styles from "./EditSkatesOption.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";
import { useEditOptionsQuery } from "../useEditOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function EditSkatesOption({ onClose, skatesData }) {
    const { lang } = useLanguage();

    const { mutate, isPending } = useEditOptionsQuery("skates");
    const { register, handleSubmit, reset } = useForm({ defaultValues: skatesData });

    // SUBMITTING THE FORM
    function onFormSubmit(skatesData) {
        mutate(skatesData);
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
                <h2 className={styles.heading}>{lang.editOptions}</h2>

                <form
                    onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
                    className={styles.form}
                >
                    <input
                        className={styles.input}
                        type="number"
                        id="size"
                        {...register("size", {
                            required: "Skate size is required",
                            min: {
                                value: 0,
                                message: 'Skate size cannot be a negative number.'
                            }
                        })}
                        placeholder={lang.s_skateSize}
                        autoComplete="skate-size"
                    />
                    <input
                        className={styles.input}
                        type="number"
                        id="quantity"
                        {...register("quantity", {
                            required: "Skate quantity is required",
                            min: {
                                value: 0,
                                message: 'Skate quantity cannot be a negative number.'
                            }
                        })}
                        placeholder={lang.quantity}
                        autoComplete="skate-size"
                    />

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

export default EditSkatesOption;