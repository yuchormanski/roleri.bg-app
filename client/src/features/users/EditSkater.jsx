import styles from "./EditSkater.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../context/Language.jsx";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

import { useEditSkaterQuery } from "./useEditSkaterQuery.js";

function EditSkater({ onClose, skaterData }) {
    const { lang } = useLanguage();

    const { editSkaterMutation } = useEditSkaterQuery();
    const { register, handleSubmit, reset } = useForm({ defaultValues: skaterData });

    // SUBMITTING THE FORM
    async function onFormSubmit(skaterData) {
        try {
            await editSkaterMutation.mutateAsync(skaterData);
            onClose();
            reset();
        } catch (error) {
            toast.error(error.message);
            console.error("Edit skater error:", error);
        }
    }

    //ERROR IN FORM
    function onErrorSubmit(errors) {
        console.log(errors);
        Object.keys(errors).forEach((error) => toast.error(errors[error].message));
    }

    return (
        <Popup onClose={onClose} backgroundClick={false}>
            {editSkaterMutation.isPending && <Spinner />}
            <div className={styles.container}>
                <div className={styles.closeBtn}>
                    <button onClick={onClose} className={styles.closeIcon}><GoX /></button>
                </div>
                <h2 className={styles.heading}>{lang.editSkater}</h2>

                <form
                    onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
                    className={styles.form}
                >
                    <input
                        className={styles.input}
                        type="text"
                        id="firstName"
                        {...register("firstName", {
                            required: "First name is required",
                            maxLength: {
                                value: 20,
                                message: "First name can't be more than 20 characters long!",
                            },
                        })}
                        placeholder={lang.s_firstName}
                        autoComplete="given-name"
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="lastName"
                        {...register("lastName", {
                            required: "Last name is required",
                            maxLength: {
                                value: 20,
                                message: "Last name can't be more than 20 characters long!",
                            },
                        })}
                        placeholder={lang.s_lastName}
                        autoComplete="family-name"
                    />
                    <input
                        className={styles.input}
                        type="number"
                        id="age"
                        {...register("age", {
                            required: "Age is required",
                            max: {
                                value: 120,
                                message: "Age must be under 120 years"
                            },
                            min: {
                                value: 2,
                                message: "Age must be over 2 years"
                            }
                        })}
                        placeholder={lang.age}
                        autoComplete="skater-age"
                    />
                    <input
                        className={styles.input}
                        type="number"
                        id="skatesSize"
                        {...register("skatesSize", {
                            required: "Skate size is required",
                            min: {
                                value: 0,
                                message: "The skate size cannot be smaller than 0"
                            }
                        })}
                        placeholder={lang.s_skateSize}
                        autoComplete="skate-size"
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="protection"
                        {...register("protection", {
                            required: "Protection is required",
                        })}
                        placeholder={lang.skaterProtection}
                        autoComplete="protection"
                    />
                    <input
                        className={styles.input}
                        type="text"
                        id="level"
                        {...register("level", {
                            required: "Level is required",
                        })}
                        placeholder={lang.level}
                        autoComplete="level"
                    />
                    <select
                        className={styles.input}
                        id="gender"
                        {...register("gender", {
                            required: "Gender is required",
                        })}
                        autoComplete="skater-gender"
                    >
                        <option value="">{lang.gender}</option>
                        <option value="male">{lang.s_genderMale}</option>
                        <option value="female">{lang.s_genderFemale}</option>
                    </select>

                    <div className={styles.btnContainer}>
                        <div style={{ marginLeft: "auto" }}>
                            <Button type={"primary"}>{lang.editSkater}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Popup>

    );
}

export default EditSkater;