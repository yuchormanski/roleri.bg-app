import styles from './AddAgeOptions.module.css'

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import { useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";

import { useAddOptionsQuery } from '../useAddOptionsQuery.js';

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function AddAgeOptions({ onClose }) {
    const { lang } = useLanguage();

    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useAddOptionsQuery("age");

    const { register, handleSubmit, reset } = useForm();

    // SUBMITTING THE FORM
    async function onFormSubmit(ageData) {
        const ageAvailableData = queryClient.getQueryData(["age"]);
        if (ageAvailableData.some(a => a.typeGroup == ageData.typeGroup)) {
            return toast.error(`Group ${ageData.typeGroup} already exist`);
        }

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
                        id="typeGroup"
                        {...register("typeGroup", {
                            required: "Type of the age group is required",
                        })}
                        placeholder={lang.ageGroup}
                        autoComplete="typeGroup"
                    />

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

export default AddAgeOptions;