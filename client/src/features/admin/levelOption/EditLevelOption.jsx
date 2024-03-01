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
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            group: levelData.typeGroup.split('&/&').at(0),
            groupEn: levelData.typeGroup.split('&/&').at(1),
            descr: levelData.description.split('&/&').at(0),
            descrEn: levelData.description.split('&/&').at(1),
        }
    });

    // SUBMITTING THE FORM
    function onFormSubmit(formData) {
        const result = {
            _id: levelData._id,
            typeGroup: `${formData.group}&/&${formData.groupEn}`,
            description: `${formData.descr}&/&${formData.descrEn}`,
        };

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
                <h2 className={styles.heading}>{lang.editOptions}</h2>

                <form
                    onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
                    className={styles.form}
                >
                    <input
                        className={styles.input}
                        type="text"
                        id="group"
                        {...register("group", {
                            required: "Type of the group is required",
                        })}
                        placeholder={lang.level}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="groupEn"
                        {...register("groupEn", {
                            required: "English type group is required",
                        })}
                        placeholder={lang.levelEn}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="descr"
                        {...register("descr", {
                            required: "Description is required",
                        })}
                        placeholder={lang.descriptionBg}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="descrEn"
                        {...register("descrEn", {
                            required: "Description is required",
                        })}
                        placeholder={lang.descriptionEn}
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