import styles from "./UnregisteredUser.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
import Button from "../../ui/elements/button/Button.jsx";

import { useLanguage } from "../../context/Language.jsx";
import { useForm } from "react-hook-form";
import { useTranslate } from "../../hooks/useTranslate.js";
import { useGetSkaterOptionsQuery } from "../skaters/useGetSkaterOptionsQuery.js";
import { useAddUnregisteredBookQuery } from "./useAddUnregisteredBookQuery.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import toast from "react-hot-toast";
import { EMAIL_REGEX, PHONE_REGEX } from "../../services/environment.js";
import { useGetAllLessonQueries } from "../../pages/lessons/useGetAllLessonQueries.js";

const initialFieldsValues = {
	firstName: "",
	lastName: "",
	groupAge: "",
	subscriptionType: "",
	lessonId: "",
	skatesSize: "",
	protection: "",
	contactName: "",
	email: "",
	phone: "",
	textArea: "",
	additionalRequirements: "",
	// gender: "",
};

function UnregisteredUser() {
	const [selectedDate, setSelectedDate] = useState();
	const [ageVerifier, setAgeVerifier] = useState(false);
	const [fieldValues, setFieldValues] = useState(initialFieldsValues);
	const [phone, setPhone] = useState("");

	const { lang, index: selectedLangIndex } = useLanguage();
	const { translatePhrase: translate } = useTranslate();
	const { register, handleSubmit, reset } = useForm();

	const { isFetching, error, data } = useGetSkaterOptionsQuery();
	const { isFetching: isFetchingLesson, data: lessonData } = useGetAllLessonQueries();
	const { mutate, isPending } = useAddUnregisteredBookQuery();

	// SELECTING DATE
	function selectedDateHandler(date) {
		setSelectedDate((d) => (d = date));
	}

	function formSuccessHandler(formData) {
		if (!PHONE_REGEX.test(phone)) return toast.error("Invalid phone number!");

		const dataToServer = { ...formData, phone: phone, date: selectedDate };
		mutate(dataToServer);

		reset();
		setPhone("");
	}
	function formErrorHandler(errors) {
		console.log(errors);
		Object.keys(errors).forEach((error) => toast.error(errors[error].message));
	}

	// HELPER
	function ageHandler(e) {
		if (!e.target.value) return;
		const age = Number(e.target.value.slice(-2));
		if (age < 18) setAgeVerifier(true);
	}

	function valueHandler(e) {
		const valueName = e.target.name;
		const value = e.target.value;
		setFieldValues({ ...fieldValues, [valueName]: value });
	}
	function onFocusHandler(e) {
		const valueName = e.target.name;
		setFieldValues({ ...fieldValues, [valueName]: "" });
	}

	return (
		<>
			{(isFetching || isPending || isFetchingLesson) ? (
				<Spinner />
			) : (
				<div className={styles.container}>
					<h3 className={styles.heading}>{lang.bookLesson}</h3>

					<div className={styles.secondaryContainer}>
						<div className={styles.leftPanel}>
							<p className={styles.headInfo}>
								Преди да попълните формата, моля, запознайте се с видовете{" "}
								<Link className={styles.link} to={"/lessons"}>
									уроци
								</Link>{" "}
								и техния{" "}
								<Link
									className={styles.link}
									to="http://roleri.bg/rollwp/plans/"
								>
									график
								</Link>
							</p>
							<h2 className={styles.secondaryHeading}>Следвайте стъпките</h2>
							<h3 className={styles.thirdHeading}>Стъпка 1</h3>
							<p className={styles.paragraph}>
								<span>&#9737;</span>
								Изберете ден, маркиран в зелено, името на участника, вида на
								урока и групата, в която ще се включи.
							</p>
							<p className={styles.paragraph}>
								<span>&#9737;</span>
								Ако изберете Абонамент, това означава,че ще ползвате пакет от
								четири урока, взети в рамките на четири поредни седмици в
								съответния ден (Ще се отрази при преглед на профила Ви)..
							</p>

							<h3 className={styles.thirdHeading}>Стъпка 2</h3>
							<p className={styles.paragraph}>
								<span>&#9737;</span>
								Изпратете Вашата форма. Ще получите потвърждение на Вашето
								участие на посоченият e-mail адрес.
							</p>
							<p className={styles.paragraph}>
								<span>&#9737;</span>
								При лошо време урока се прехвърля за следващата дата.{" "}
							</p>
						</div>

						<div className={styles.rightPanel}>
							<h3 className={styles.secondaryHeading}>{lang.selectDay}</h3>
							<DatePickerCalendar selectedDateProp={selectedDateHandler} />

							<h3 className={styles.secondaryHeading}>{lang.unregistered_user_form_title}</h3>

							<form
								onSubmit={handleSubmit(formSuccessHandler, formErrorHandler)}
								className={styles.form}
							>
								<div className={styles.fieldContainer_double}>
									{/* First Name */}
									<div className={styles.element}>
										<input
											className={styles.textInput}
											type="text"
											id="firstName"
											name={"firstName"}
											{...register("firstName", {
												required: "First name is required",
												maxLength: {
													value: 20,
													message:
														"First name can't be more than 20 characters long!",
												},
											})}
											onBlur={valueHandler}
										// autoComplete="given-name"
										/>
										<label
											htmlFor={"firstName"}
											className={`${styles.label} ${fieldValues.firstName ? styles.filled : null
												}`}
										>
											{lang.firstName}
										</label>
									</div>

									{/* Last Name */}
									<div className={styles.element}>
										<input
											className={styles.textInput}
											type="text"
											id="lastName"
											name={"lastName"}
											{...register("lastName", {
												required: "Last name is required",
												maxLength: {
													value: 20,
													message:
														"Last name can't be more than 20 characters long!",
												},
											})}
											onBlur={valueHandler}
										// autoComplete="family-name"
										/>
										<label
											htmlFor={"lastName"}
											className={`${styles.label} ${fieldValues.lastName ? styles.filled : null
												}`}
										>
											{lang.lastName}
										</label>
									</div>
								</div>

								<div className={styles.fieldContainer_triple}>
									{/* Age */}
									<div className={styles.element}>
										<select
											name="groupAge"
											id={`groupAge`}
											className={styles.select}
											defaultValue=""
											{...register("groupAge", {
												required: "Age is required",
											})}
											onBlur={(e) => {
												valueHandler(e), ageHandler(e);
											}}
										>
											<option value="" disabled hidden></option>
											{data.groupsAgeData.map((age) => (
												<option value={age._id} key={age._id}>
													{age.typeGroup}
												</option>
											))}
										</select>
										<label
											htmlFor={`groupAge`}
											className={`${styles.selectLabel} ${fieldValues.groupAge ? styles.filled : null
												}`}
										>
											<span>{lang.ageGroup}</span>
										</label>
									</div>

									{/* Skates */}
									<div className={styles.element}>
										<select
											name="skatesSize"
											id={`skatesSize`}
											className={styles.select}
											defaultValue=""
											{...register("skatesSize", {
												required: "Skates are required",
											})}
											onBlur={valueHandler}
										>
											<option value="" disabled hidden></option>
											{/* <option value={"hasOwn"}>{lang.haveOwn}</option> */}
											{data.skatesData.map((skate) => (
												<option key={skate._id} value={skate._id}>
													{skate.size}
												</option>
											))}
										</select>
										<label
											htmlFor={`skatesSize`}
											className={`${styles.selectLabel} ${fieldValues.skatesSize ? styles.filled : null
												}`}
										>
											<span>{lang.skates}</span>
										</label>
									</div>

									{/* Protection */}
									<div className={styles.element}>
										<select
											name="protection"
											id={`protection`}
											className={styles.select}
											defaultValue=""
											{...register("protection", {
												required: "Protection is required",
											})}
											onBlur={valueHandler}
										>
											<option value="" disabled hidden></option>
											{/* <option value={"hasOwn"}>{lang.haveOwn}</option> */}
											{data.protectionsData.map((protection) => (
												<option key={protection._id} value={protection._id}>
													{protection.size}
												</option>
											))}
										</select>
										<label
											htmlFor={`protection`}
											className={`${styles.selectLabel} ${fieldValues.protection ? styles.filled : null
												}`}
										>
											<span>{lang.protection}</span>
										</label>
									</div>
								</div>

								<div className={styles.fieldContainer_double}>
									{/* Lesson type */}
									<div className={styles.element}>
										<select
											name="subscriptionType"
											id={`subscriptionType`}
											className={styles.select}
											defaultValue=""
											{...register("subscriptionType", {
												required: "Lesson type is required",
											})}
											onBlur={valueHandler}
										>
											<option value="" disabled hidden></option>
											{data.subscriptionData.map((subscription) => (
												<option key={subscription._id} value={subscription._id}>
													{`
                            							${translate(subscription.typePayment)} - ${subscription.subscriptionCount} 
                            							${lang.visit}${subscription.subscriptionCount > 1
															? selectedLangIndex === 0 ? "я" : "s"
															: selectedLangIndex === 0 ? "e" : ""
														}
                          							`}
												</option>
											))}
										</select>
										<label
											htmlFor={`subscriptionType`}
											className={`${styles.selectLabel} ${fieldValues.subscriptionType ? styles.filled : null
												}`}
										>
											<span>{lang.type}</span>
										</label>
									</div>

									{/* Lesson */}
									<div className={styles.element}>
										<select
											name="lessonId"
											id={`lessonId`}
											className={styles.select}
											defaultValue=""
											{...register("lessonId", {
												required: "Lesson is required",
											})}
											onBlur={valueHandler}
										>
											<option value="" disabled hidden></option>
											{lessonData.map((lesson) => (
												<option key={lesson._id} value={lesson._id}>
													{translate(lesson.title)}
												</option>
											))}
										</select>
										<label
											htmlFor={`lessonId`}
											className={`${styles.selectLabel} ${fieldValues.lessonId ? styles.filled : null
												}`}
										>
											<span>{lang.lessons}</span>
										</label>
									</div>

									{/* Gender */}

									{/* <div className={styles.element}>
										<select
											className={styles.select}
											id="gender"
											{...register("gender", {
												required: "Gender is required",
											})}
											defaultValue=""
											onBlur={valueHandler}
										>
											<option value="" disabled hidden></option>
											<option value="male">{lang.s_genderMale}</option>
											<option value="female">{lang.s_genderFemale}</option>
										</select>
										<label
											htmlFor={`gender`}
											className={`${styles.selectLabel} ${fieldValues.gender ? styles.filled : null
												}`}
										>
											<span>{lang.gender}</span>
										</label>
									</div> */}
								</div>

								{/* Contact name */}
								{ageVerifier && (
									<div className={styles.element}>
										<input
											className={styles.textInput}
											type="text"
											id="contactName"
											name={"contactName"}
											{...register("contactName", {
												validate: {
													required: (value) => {
														if (!value && ageVerifier)
															return "Contact name is required";
														return true;
													},
												},
											})}
											onBlur={valueHandler}
										/>
										<label
											htmlFor={"contactName"}
											className={`${styles.label} ${fieldValues.contactName ? styles.filled : null
												}`}
										>
											{lang.contactName}
										</label>
									</div>
								)}

								<div
									className={`${styles.fieldContainer_double} ${styles.fieldContainer_double_extended}`}
								>
									{/* Email */}
									<div className={styles.element}>
										<input
											className={styles.textInput}
											type="email"
											id="email"
											name={"email"}
											{...register("email", {
												required: "Email is required",
												pattern: {
													value: EMAIL_REGEX,
													message: "Invalid email address",
												},
												maxLength: {
													value: 30,
													message:
														"Email can't be more than 30 characters long!",
												},
											})}
											onBlur={valueHandler}
										/>
										<label
											htmlFor={"email"}
											className={`${styles.label} ${fieldValues.email ? styles.filled : null
												}`}
										>
											{lang.email}
										</label>
									</div>

									{/* Phone */}
									{/* <div className={styles.element}>
                    <input
                      className={styles.textInput}
                      type="number"
                      id="phone"
                      name={"phone"}
                      {...register}
                      onChange={valueHandler}
                    />
                    <label
                      htmlFor={"phone"}
                      className={`${styles.label} ${
                        fieldValues.phone ? styles.filled : null
                      }`}
                    >
                      {lang.phone}
                    </label>
                  </div> */}

									<PhoneInput
										name={"phone"}
										defaultCountry="bg"
										value={phone}
										onChange={(phone) => setPhone(phone)}
										inputStyle={{
											border: "1px solid var(--input-border)",
											backgroundColor: "var(--color-header)",
											borderRadius: "0.3rem",
											fontSize: "1.6rem",
											padding: "0 10px",
											width: "100%",
											height: "auto",
											margin: "0 0 0 5px",
											color: "var(--color-main)",
										}}
										buttonStyle={false}
										style={{
											"--react-international-phone-dropdown-item-background-color":
												"var(--color-header)",
											"--react-international-phone-country-selector-background-color":
												"var(--color-header)",
											"--react-international-phone-country-selector-background-color-hover":
												"var(--color-header)",
											"--react-international-phone-country-selector-border-color":
												"none",
											"--react-international-phone-country-selector-arrow-color":
												"var(--color-main)",
											"--react-international-phone-dropdown-item-text-color":
												"var(--color-main)",
											"--react-international-phone-dropdown-item-dial-code-color":
												"var(--color-main)",
											"--react-international-phone-selected-dropdown-item-background-color":
												"var(--input-border)",
										}}
									/>
								</div>

								{/* Additional field */}
								<div className={styles.element}>
									<textarea
										className={styles.textarea}
										type="text"
										id="additionalRequirements"
										name="additionalRequirements"
										{...register("additionalRequirements", {
											maxLength: {
												value: 300,
												message:
													"Additional requirement can't be more than 300 characters long!",
											},
										})}
										rows={3}
										onBlur={valueHandler}
									/>
									<label
										htmlFor={"additionalRequirements"}
										className={`${styles.label} ${fieldValues.additionalRequirements ? styles.filled : null
											}`}
									>
										{lang.requirements}
									</label>
								</div>

								{/* Conditions */}
								<div className={styles.conditions}>
									<p>
										Съгласявам се с{" "}
										<Link className={styles.link} to={"/conditions"}>
											Общите условия
										</Link>
									</p>
									<input
										className={styles.checkbox}
										type="checkbox"
									// onChange={(e) => checkboxHandler(e, s._id)}
									/>
								</div>
								<div className={styles.btnContainer}>
									<div style={{ marginLeft: "auto" }}>
										<Button
											type={"primary"}
											// onClick={bookHandler}
											disabled={!selectedDate}
										>
											{lang.addSkater}
										</Button>
									</div>
								</div>
							</form>
						</div>
					</div >
				</div >
			)
			}
		</>
	);
}

export default UnregisteredUser;
