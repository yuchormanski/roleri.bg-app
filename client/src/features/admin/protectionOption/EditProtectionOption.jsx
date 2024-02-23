import styles from "./EditProtectionOption.module.css";

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

    const { mutate, isPending } = useEditOptionsQuery("protection");
    const { register, handleSubmit, reset } = useForm({ defaultValues: protectionData });

    // SUBMITTING THE FORM
    function onFormSubmit(protectionData) {
        mutate(protectionData);
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
                            required: "Protection size is required",
                            min: {
                                value: 0,
                                message: 'Protection size cannot be a negative number.'
                            }
                        })}
                        placeholder={lang.s_protections}
                        autoComplete="protection-size"
                    />
                    <input
                        className={styles.input}
                        type="number"
                        id="quantity"
                        {...register("quantity", {
                            required: "Protection quantity is required",
                            min: {
                                value: 0,
                                message: 'Protection quantity cannot be a negative number.'
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

export default EditProtectionOption;