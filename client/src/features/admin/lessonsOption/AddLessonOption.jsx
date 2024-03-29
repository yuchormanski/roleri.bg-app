import styles from "./AddLessonOption.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useQueryClient } from "@tanstack/react-query";

import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../../context/Language.jsx";
import { useAddOptionsQuery } from "../useAddOptionsQuery.js";
import { useGetSkaterOptionsQuery } from "../../skaters/useGetSkaterOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import { customStyles } from "./customStyles.js";
import { options } from "./data/selectData.js";
import { useTranslate } from "../../../hooks/useTranslate.js";
import { formatCurrency } from "../../../util/formatCurrency.js";

function AddLessonOption({ onClose }) {
  const initial = {
    title: "", // *
    titleBG: "", //*
    //
    age: "", // възрастова група   // *
    type: "", //edinichen/abonament
    //
    participants: "", //брой учасници // *
    price: "", // цена // *
    isIndividual: "",
    //
    skills: "", // какво ще се научи в урока
    skillsBG: "", // какво ще се научи в урока
    //
    location: "",
    locationBG: "",
    //
    description: "",
    descriptionBG: "",
    //
    imageUrl: "",
    time: "",
    validTo: "",
    //
    geoLocation: {},
  };

  const [fieldValues, setFieldValues] = useState(initial);
  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();

  const queryClient = useQueryClient();
  const { isFetching, data: optionData } = useGetSkaterOptionsQuery();
  const { isPending, mutateAsync } = useAddOptionsQuery("lessons");

  // TRANSFORM INPUT DATA TO BE VISUALIZED WITH REACT-SELECT
  function transformDataToSelect(dataToTransform) {
    const transformedData = dataToTransform.reduce((acc, dataObj) => {
      const checkLabel = (inputString) =>
        inputString.includes("&/&") ? translate(inputString) : inputString;

      function nameCheck() {
        if (dataObj.typeGroup) return "age";
        else if (dataObj.typePayment) return "type";
      }

      const temporaryData = {
        value: dataObj._id,
        label: checkLabel(
          dataObj["size"] || dataObj["typeGroup"] || dataObj["typePayment"]
        ),
        name: nameCheck(),
      };

      return [...acc, temporaryData];
    }, []);

    return transformedData;
  }

  // SUBMITTING THE FORM
  async function onFormSubmit(formData) {
    const lessonAvailableData = queryClient.getQueryData(["lessons"]);
    if (lessonAvailableData.some((a) => a.title == fieldValues.title)) {
      return toast.error(`Title ${fieldValues.title} already exist`);
    }

    const dataToServer = {
      title: `${fieldValues.titleBG}&/&${fieldValues.title}`, // *
      age: fieldValues.age,
      type: fieldValues.type,
      participants: Number(fieldValues.participants),
      price: Number(fieldValues.price),
      skills: `${fieldValues.skillsBG}&/&${fieldValues.skills}`,
      location: `${fieldValues.locationBG}&/&${fieldValues.location}`,
      description: `${fieldValues.descriptionBG}&/&${fieldValues.description}`,
      imageUrl: fieldValues.imageUrl || null,
      validTo: fieldValues.validTo || null,
      geoLocation: fieldValues.geoLocation,
      time: fieldValues.time,
      isIndividual: fieldValues.isIndividual,
    };

    if (!fieldValues.age) return toast.error("Age is required");
    if (!fieldValues.type) return toast.error("Type is required");
    if (fieldValues.isIndividual === "")
      return toast.error("Is individual is required");

    // console.log(dataToServer);

    try {
      await mutateAsync(dataToServer);
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  }

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

  function locationHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    const obj = { ...fieldValues.geoLocation, [valueName]: value };
    setFieldValues({ ...fieldValues, geoLocation: obj });
  }

  function selectHandler(data) {
    setFieldValues((field) => ({ ...field, [data.name]: data.value }));
  }
  return (
    <Popup
      onClose={onClose}
      backgroundClick={false}
      userWidth={"width800"}
      userHeight={"userHeight"}
    >
      <>
        {isFetching || isPending ? (
          <Spinner />
        ) : (
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
              {/* Title & TitleBG */}
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
                        value: 50,
                        message:
                          "Lesson title can't be more than 50 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"title"}
                    className={`${styles.label} ${
                      fieldValues.title ? styles.filled : null
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
                        value: 50,
                        message:
                          "The Lesson title can't be more than 50 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"titleBG"}
                    className={`${styles.label} ${
                      fieldValues.title ? styles.filled : null
                    }`}
                  >
                    {lang.title}
                    {lang.onBul}
                  </label>
                </div>
              </div>

              {/* Age & Type */}
              <div className={styles.fieldContainer_double}>
                {/* Age */}
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
                    className={`${styles.selectLabel} ${
                      fieldValues.age ? styles.filled : null
                    }`}
                  >
                    <span>{lang.age}</span>
                  </label>
                </div>
                {/* Type */}
                <div className={styles.element}>
                  <Select
                    name={"type"}
                    defaultValue={selectedOption}
                    onChange={selectHandler}
                    options={transformDataToSelect(
                      optionData?.subscriptionData
                    )}
                    styles={customStyles}
                    placeholder={
                      <div style={{ fontSize: 14 }}>{lang.type}</div>
                    }
                  />
                  <label
                    className={`${styles.selectLabel} ${
                      fieldValues.type ? styles.filled : null
                    }`}
                  >
                    <span>{lang.type}</span>
                  </label>
                </div>
              </div>

              {/* Participants & Price */}
              <div className={styles.fieldContainer_double}>
                {/* Participants */}
                <div className={styles.element}>
                  <input
                    className={styles.textInput}
                    type="number"
                    id="participants"
                    name={"participants"}
                    {...register("participants", {
                      required: "Participants count is required",
                      max: {
                        value: 20,
                        message:
                          "Participants count can't be more than 20 persons!",
                      },
                      min: {
                        value: 1,
                        message:
                          "Participants count can't be less than 1 person!",
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"participants"}
                    className={`${styles.label} ${
                      fieldValues.participants ? styles.filled : null
                    }`}
                  >
                    {lang.participants}
                  </label>
                </div>

                {/* Price*/}
                <div className={styles.element}>
                  <input
                    className={styles.textInput}
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    id="price"
                    name={"price"}
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: `The Price can't be less than ${formatCurrency(
                          0.01
                        )}`,
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"price"}
                    className={`${styles.label} ${
                      fieldValues.price ? styles.filled : null
                    }`}
                  >
                    {lang.price}
                  </label>
                </div>
              </div>

              {/* Location & LocationBG */}
              <div className={styles.fieldContainer_double}>
                {/* Location */}
                <div className={styles.element}>
                  <input
                    className={styles.textInput}
                    type="text"
                    id="location"
                    name={"location"}
                    {...register("location", {
                      required: "Location info is required",
                      maxLength: {
                        value: 200,
                        message:
                          "Location info can't be more than 200 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"location"}
                    className={`${styles.label} ${
                      fieldValues.location ? styles.filled : null
                    }`}
                  >
                    {lang.location}
                  </label>
                </div>

                {/* locationBG*/}
                <div className={styles.element}>
                  <input
                    className={styles.textInput}
                    type="text"
                    id="locationBG"
                    name={"locationBG"}
                    {...register("locationBG", {
                      required: "Location on Bulgarian is required",
                      maxLength: {
                        value: 200,
                        message:
                          "Location info can't be more than 200 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"price"}
                    className={`${styles.label} ${
                      fieldValues.locationBG ? styles.filled : null
                    }`}
                  >
                    {lang.location}
                    {lang.onBul}
                  </label>
                </div>
              </div>

              {/* Skills &  SkillsBG */}
              <div className={styles.fieldContainer_double}>
                {/* Skills */}
                <div className={styles.element}>
                  <input
                    className={`${styles.textInput}`}
                    type="text"
                    id="skills"
                    name={"skills"}
                    {...register("skills", {
                      required: "Skills is required",
                      maxLength: {
                        value: 200,
                        message:
                          "Lesson title can't be more than 200 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"skills"}
                    className={`${styles.label} ${
                      fieldValues.skills ? styles.filled : null
                    }`}
                  >
                    {lang.skills}
                  </label>
                </div>

                {/* SkillsBG */}
                <div className={styles.element}>
                  <input
                    className={`${styles.textInput}`}
                    type="text"
                    id="skillsBG"
                    name={"skillsBG"}
                    {...register("skillsBG", {
                      required: "Skills on Bulgarian is required",
                      maxLength: {
                        value: 200,
                        message:
                          "Lesson title can't be more than 200 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"skillsBG"}
                    className={`${styles.label} ${
                      fieldValues.skillsBG ? styles.filled : null
                    }`}
                  >
                    {lang.skills}
                    {lang.onBul}
                  </label>
                </div>
              </div>

              {/* Description &  DescriptionBG */}
              <div className={styles.fieldContainer_double}>
                {/* Description */}
                <div className={styles.element}>
                  <textarea
                    className={`${styles.textarea}`}
                    type="text"
                    id="description"
                    name={"description"}
                    {...register("description", {
                      required: "The description is required",
                      maxLength: {
                        value: 250,
                        message:
                          "The description can't be more than 250 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                    rows={3}
                  />
                  <label
                    htmlFor={"description"}
                    className={`${styles.label} ${
                      fieldValues.description ? styles.filled : null
                    }`}
                  >
                    {lang.description}
                  </label>
                </div>

                {/* DescriptionBG */}
                <div className={styles.element}>
                  <textarea
                    className={`${styles.textarea}`}
                    type="text"
                    id="descriptionBG"
                    name={"descriptionBG"}
                    {...register("descriptionBG", {
                      required: "The description is required",
                      maxLength: {
                        value: 250,
                        message:
                          "The description can't be more than 250 characters long!",
                      },
                    })}
                    onBlur={valueHandler}
                    rows={3}
                  />
                  <label
                    htmlFor={"descriptionBG"}
                    className={`${styles.label} ${
                      fieldValues.descriptionBG ? styles.filled : null
                    }`}
                  >
                    {lang.description}
                    {lang.onBul}
                  </label>
                </div>
              </div>

              {/* Image URL & Time & Valid to*/}
              <div className={styles.fieldContainer_triple}>
                {/* Image URL  */}
                <div
                  className={`${styles.element} ${styles.imageUrlContainer}`}
                >
                  <input
                    className={`${styles.textInput}`}
                    type="text"
                    id="imageUrl"
                    name={"imageUrl"}
                    {...register("imageUrl", {
                      // required: "Skills is required",
                      // maxLength: {
                      //   value: 200,
                      //   message:
                      //     "Lesson title can't be more than 200 characters long!",
                      // },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"imageUrl"}
                    className={`${styles.label} ${
                      fieldValues.imageUrl ? styles.filled : null
                    }`}
                  >
                    {lang.imageUrl}
                  </label>
                </div>

                {/* Time*/}
                <div className={styles.element}>
                  <input
                    className={`${styles.textInput} ${styles.timeInput}`}
                    type="time"
                    id="time"
                    name={"time"}
                    {...register("time", {
                      required: "Time is required",
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"time"}
                    className={`${styles.label} ${
                      fieldValues.time ? styles.filled : styles.hidden
                    }`}
                  >
                    {lang.time}
                  </label>
                </div>

                {/* Valid to */}
                <div className={styles.element}>
                  <input
                    className={`${styles.textInput} ${styles.dateInput}`}
                    type="date"
                    id="validTo"
                    name={"validTo"}
                    {...register("validTo", {
                      // required: "Skills on Bulgarian is required",
                      // maxLength: {
                      //   value: 200,
                      //   message:
                      //     "Lesson title can't be more than 200 characters long!",
                      // },
                    })}
                    onBlur={valueHandler}
                  />
                  <label
                    htmlFor={"validTo"}
                    className={`${styles.label} ${
                      fieldValues.validTo ? styles.filled : styles.hidden
                    }`}
                  >
                    {lang.validTo}
                  </label>
                </div>
              </div>

              {/* Lat &  Lon */}
              <div className={styles.fieldContainer_double}>
                {/* Lat */}
                <div className={styles.element}>
                  <input
                    className={`${styles.textInput}`}
                    type="text"
                    id="lat"
                    name={"lat"}
                    // {...register("lat", {
                    // required: "Skills is required",
                    // maxLength: {
                    //   value: 200,
                    //   message:
                    //     "Lesson title can't be more than 200 characters long!",
                    // },
                    // })}
                    onChange={locationHandler}
                    value={fieldValues.geoLocation.lat}
                  />
                  <label
                    htmlFor={"lat"}
                    className={`${styles.label} ${
                      fieldValues.geoLocation.lat ? styles.filled : null
                    }`}
                  >
                    {lang.latitude}
                  </label>
                </div>

                {/* Longitude */}
                <div className={styles.element}>
                  <input
                    className={`${styles.textInput}`}
                    type="text"
                    id="lon"
                    name={"lon"}
                    // {...register("lon", {
                    //   required: "Skills on Bulgarian is required",
                    //   maxLength: {
                    //     value: 200,
                    //     message:
                    //       "Lesson title can't be more than 200 characters long!",
                    //   },
                    // })}
                    onChange={locationHandler}
                    value={fieldValues.geoLocation.lon}
                  />
                  <label
                    htmlFor={"lon"}
                    className={`${styles.label} ${
                      fieldValues.location.lon ? styles.filled : null
                    }`}
                  >
                    {lang.longitude}
                  </label>
                </div>
              </div>

              <div className={styles.btnContainer}>
                {/* Is Individual*/}
                <div className={styles.fieldContainer_single}>
                  <div className={styles.element}>
                    <Select
                      name={"isIndividual"}
                      defaultValue={selectedOption}
                      onChange={selectHandler}
                      options={[
                        { value: false, label: "No", name: "isIndividual" },
                        { value: true, label: "Yes", name: "isIndividual" },
                      ]}
                      styles={customStyles}
                      placeholder={
                        <div style={{ fontSize: 14 }}>Is Individual</div>
                      }
                      // isMulti
                    />
                    <label
                      className={`${styles.selectLabel} ${
                        fieldValues.isIndividual ? styles.filled : null
                      }`}
                    >
                      <span>isIndividual</span>
                    </label>
                  </div>
                </div>

                <div style={{ marginLeft: "auto" }}>
                  <Button type={"primary"}>{lang.addOptions}</Button>
                </div>
              </div>
            </form>

            <section className={styles.description}>
              <p className={styles.info}>
                <span>&#9737;</span>
                {lang.s_list_1}
              </p>
            </section>
          </div>
        )}
      </>
    </Popup>
  );
}

export default AddLessonOption;

// imageUrl	title	titleInfo	age	skills	count participants	type	visits	location	price	geoLocation	description	available to
