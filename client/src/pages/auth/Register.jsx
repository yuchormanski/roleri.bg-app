import styles from "./Register.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoX, GoEye, GoEyeClosed } from "react-icons/go";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import {
  EMAIL_REGEX,
  PASS_REGEX,
  PHONE_REGEX,
} from "../../services/environment.js";
import { useAuthQueries } from "./useAuthQueries.js";
import { useLanguage } from "../../context/Language.jsx";

import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { Link } from "react-router-dom";

const initialFieldsValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  repass: "",
};

function Register({ onOut = null, onClose, authToggle }) {
  const { lang } = useLanguage();
  const [isNotForgotten, setIsNotForgotten] = useState(false);
  const [terms, setTerms] = useState(false);
  const [fieldValues, setFieldValues] = useState(initialFieldsValues);

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { registerMutation } = useAuthQueries();

  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(false);

  // SUBMITTING THE FORM
  async function onFormSubmit(regData) {
    try {
      if (!terms) throw new Error("Please read and agree to the terms!");
      if (!PHONE_REGEX.test(phone)) throw new Error("Invalid phone number!");

      const resultData = {
        firstName: regData.firstName,
        lastName: regData.lastName,
        email: regData.email,
        password: regData.password,
        phone: phone,
      };

      await registerMutation.mutateAsync(resultData);
      onClose();
      onOut ? onOut() : null;
      reset();
    } catch (error) {
      toast.error(error.message);
      console.error("Registration error:", error);
    }
  }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    // console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  function eyeHandler() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }

  // SELECTING SKATER
  function checkboxHandler(e, id) {
    if (e.target.checked) {
      setTerms(true);
    } else setTerms(false);
  }

  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }

  return (
    <>
      {registerMutation.isPending && <Spinner />}
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>Sign In</h2>

        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
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
                  message: "First name can't be more than 20 characters long!",
                },
              })}
              onBlur={valueHandler}
              autoComplete="given-name"
            />
            <label
              htmlFor={"firstName"}
              className={`${styles.label} ${
                fieldValues.firstName ? styles.filled : null
              }`}
            >
              {lang.firstName}
            </label>
          </div>

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
                  message: "Last name can't be more than 20 characters long!",
                },
              })}
              onBlur={valueHandler}
              autoComplete="family-name"
            />
            <label
              htmlFor={"lastName"}
              className={`${styles.label} ${
                fieldValues.lastName ? styles.filled : null
              }`}
            >
              {lang.lastName}
            </label>
          </div>

          <div className={styles.element}>
            <input
              className={styles.textInput}
              name={"email"}
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Invalid email address",
                },
                maxLength: {
                  value: 30,
                  message: "Email can't be more than 30 characters long!",
                },
              })}
              onBlur={valueHandler}
              autoComplete="email"
            />
            <label
              htmlFor={"email"}
              className={`${styles.label} ${
                fieldValues.email ? styles.filled : null
              }`}
            >
              {lang.email}
            </label>
          </div>

          <div className={styles.passContainer}>
            <div className={styles.element}>
              <input
                className={styles.textInput}
                name={"password"}
                type={visible ? "text" : "password"}
                id="password"
                {...register(
                  "password",
                  !isNotForgotten
                    ? {
                        required: "Password is required",
                        minLength: {
                          value: 3,
                          message:
                            "The password should be at least 3 characters long ",
                        },
                        pattern: {
                          value: PASS_REGEX,
                          message:
                            "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
                        },
                      }
                    : null
                )}
                onBlur={valueHandler}
              />
              <label
                htmlFor={"password"}
                className={`${styles.label} ${
                  fieldValues.password ? styles.filled : null
                }`}
              >
                {lang.password}
              </label>
            </div>

            <div className={styles.passEyeBtn} onClick={eyeHandler}>
              {visible ? <GoEyeClosed /> : <GoEye />}
            </div>
          </div>

          <div className={styles.element}>
            <input
              className={styles.textInput}
              name={"repass"}
              type={visible ? "text" : "password"}
              id="repass"
              {...register("repass", {
                required: "Repeat password is required",
                validate: (value) =>
                  value === getValues().password || "Passwords don't match",
                pattern: {
                  value: PASS_REGEX,
                  message:
                    "Password must contain at least one lowercase letter, one uppercase letter, and one digitt",
                },
              })}
              onBlur={valueHandler}
            />
            <label
              htmlFor={"repass"}
              className={`${styles.label} ${
                fieldValues.repass ? styles.filled : null
              }`}
            >
              {lang.repass}
            </label>
          </div>

          <PhoneInput
            name={"phone"}
            defaultCountry="bg"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputStyle={{
              border: "1px solid var(--input-border)",
              backgroundColor: "var(--color-header)",
              borderRadius: "3px",
              fontSize: "1.6rem",
              padding: "0 2px",
              width: "81%",
              height: "auto",
              margin: "0 0 0 5px",
              color: "var(--color-main)",
            }}
            buttonStyle={true}
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

          {/* CONDITIONS */}
          <div className={styles.conditions}>
            <p>
              {lang.agree}{" "}
              <Link className={styles.link} to={"/conditions"}>
                {lang.terms}
              </Link>
            </p>
            <input
              className={styles.checkbox}
              type="checkbox"
              onChange={checkboxHandler}
            />
          </div>
          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>Register</Button>
            </div>
          </div>
        </form>

        <div className={styles.authInfo}>
          <p>
            {lang.haveAccount}{" "}
            <button onClick={() => authToggle(true)} className={styles.authBtn}>
              {lang.signIn}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
