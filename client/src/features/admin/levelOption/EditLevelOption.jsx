import styles from "./EditLevelOption.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";
import { useEditOptionsQuery } from "../useEditOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function EditLevelOption({ onClose, levelData }) {
    const { lang } = useLanguage();

    const { mutate, isPending } = useEditOptionsQuery("level");
    const { register, handleSubmit, reset } = useForm({ defaultValues: levelData });

    // SUBMITTING THE FORM
    function onFormSubmit(levelData) {
        mutate(levelData);
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
                        type="text"
                        id="typeGroup"
                        {...register("typeGroup", {
                            required: "Type of the group is required",
                        })}
                        placeholder={lang.level}
                        autoComplete="typeGroup"
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="description"
                        {...register("description", {
                            required: "Description is required",
                        })}
                        placeholder={lang.description}
                        autoComplete="description"
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

export default EditLevelOption;