import styles from "./AddLessonOption.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";
import { useGetSkaterOptionsQuery } from "../../skaters/useGetSkaterOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import { customStyles } from "./customStyles.js";
import { options } from "./data/selectData.js";
import { useTranslate } from "../../../hooks/useTranslate.js";

// const ageOptions = [
//   { value: "4-7", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const initial = {
  imageUrl: "",
  title: "",
  titleBG: "",
  age: "",
  visits: "",
  participants: "",
  type: "",
  price: "",
  skills: "",
  titleInfo: "",
  location: "",
  geoLocation: { lat: "", lon: "" },
  description: "",
  validateTo: "",
};

function AddLessonOption({ onClose }) {
  const [fieldValues, setFieldValues] = useState(initial);
  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();

  const { isFetching, data: optionData } = useGetSkaterOptionsQuery();

  // TRANSFORM INPUT DATA TO BE VISUALIZED WITH REACT-SELECT
  function transformDataToSelect(dataToTransform) {
    const transformedData = dataToTransform.reduce((acc, dataObj) => {
      const checkLabel = (inputString) => inputString.includes("&/&") ? translate(inputString) : inputString;
      const temporaryData = {
        value: dataObj._id,
        label: checkLabel(dataObj["size"] || dataObj["typeGroup"] || dataObj["typePayment"]),
      };

      return [...acc, temporaryData];
    }, []);

    return transformedData;
  }

  // SUBMITTING THE FORM
  function onFormSubmit(ageData) { }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  // HELPER
  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }

  function selectHandler(data) {
    console.log(data);
    setFieldValues((field) => ({ ...field, [data.name]: data.value }));
  }
  return (
    <Popup onClose={onClose} backgroundClick={false} userWidth={"width800"}>
      {isFetching && <Spinner />}
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>{lang.addOptions}</h2>
        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
          <div className={styles.fieldContainer_double}>
            {/* Title */}
            <div className={styles.element}>
              <input
                className={styles.textInput}
                type="text"
                id="title"
                name={"title"}
                {...register("title", {
                  required: "Lesson title is required",
                  maxLength: {
                    value: 20,
                    message:
                      "Lesson title can't be more than 20 characters long!",
                  },
                })}
                onBlur={valueHandler}
              />
              <label
                htmlFor={"title"}
                className={`${styles.label} ${fieldValues.title ? styles.filled : null
                  }`}
              >
                {lang.title}
              </label>
            </div>

            {/* Title*/}
            <div className={styles.element}>
              <input
                className={styles.textInput}
                type="text"
                id="titleBG"
                name={"titleBG"}
                {...register("titleBG", {
                  required: "Lesson title on Bulgarian is required",
                  maxLength: {
                    value: 20,
                    message:
                      "The Lesson title can't be more than 20 characters long!",
                  },
                })}
                onBlur={valueHandler}
              />
              <label
                htmlFor={"titleBG"}
                className={`${styles.label} ${fieldValues.title ? styles.filled : null
                  }`}
              >
                {lang.title}
                {lang.onBul}
              </label>
            </div>
          </div>

          <div className={styles.fieldContainer_double}>
            <div className={styles.element}>
              <Select
                name={"age"}
                defaultValue={selectedOption}
                onChange={selectHandler}
                options={transformDataToSelect(optionData.groupsAgeData)}
                styles={customStyles}
                placeholder={<div style={{ fontSize: 14 }}>Age group</div>}
              // isMulti
              />
              <label
                className={`${styles.selectLabel} ${fieldValues.age ? styles.filled : null
                  }`}
              >
                <span>{lang.protection}</span>
              </label>
            </div>
            <div className={styles.element}>
              <Select
                name={"visits"}
                defaultValue={selectedOption}
                onChange={selectHandler}
                options={transformDataToSelect(optionData.subscriptionData)}
                styles={customStyles}
                placeholder={<div style={{ fontSize: 14 }}>Visits count</div>}
              // isMulti
              />
              <label
                className={`${styles.selectLabel} ${fieldValues.visits ? styles.filled : null
                  }`}
              >
                <span>{lang.visits}</span>
              </label>
            </div>
          </div>

          <div className={styles.fieldContainer_double}></div>

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

export default AddLessonOption;

// imageUrl	title	titleInfo	age	skills	count participants	type	visits	location	price	geoLocation	description	available to
