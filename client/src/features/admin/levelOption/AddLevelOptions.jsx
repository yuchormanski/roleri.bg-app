import styles from "./AddLevelOptions.module.css";

import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";

import { useAddOptionsQuery } from "../useAddOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function AddLevelOptions({ onClose }) {
  const { lang } = useLanguage();

  const { mutate, isPending } = useAddOptionsQuery("level");

  const { register, handleSubmit, reset } = useForm();

  // SUBMITTING THE FORM
  function onFormSubmit(levelData) {
    const result = {
      typeGroup: `${levelData.group}&/&${levelData.groupEn}`,
      description: `${levelData.descr}&/&${levelData.descrEn}`,
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
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>
          {lang.addOptions} {lang.for} {lang.level}
        </h2>
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
              <Button type={"primary"}>{lang.addOptions}</Button>
            </div>
          </div>
        </form>
        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.a_level_1}
        </p>
        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.a_level_2}
        </p>
      </div>
    </Popup>
  );
}

export default AddLevelOptions;
