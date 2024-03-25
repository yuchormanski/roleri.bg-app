import styles from "./Login.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoChevronLeft, GoX, GoEye, GoEyeClosed } from "react-icons/go";
import toast from "react-hot-toast";

import { EMAIL_REGEX } from "../../services/environment.js";

import { useLanguage } from "../../context/Language.jsx";
import { useAuthQueries } from "./useAuthQueries.js";

import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

const initialFieldsValues = { email: "", password: "" };

function Login({ onOut = null, onClose, authToggle }) {
  const { lang } = useLanguage();
  const { loginMutation, forgotPasswordMutation } = useAuthQueries();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const [isNotForgotten, setIsNotForgotten] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fieldValues, setFieldValues] = useState(initialFieldsValues);

  // SUBMITTING THE FORM
  async function onFormSubmit(loginData) {
    try {
      if (!isNotForgotten) {
        await loginMutation.mutateAsync(loginData);
      } else {
        const { email, ...data } = loginData;
        await forgotPasswordMutation.mutateAsync({ email });
      }

      onClose();
      onOut ? onOut() : null;
      reset();
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  //CHANGE TO FORGOTTEN PASSWORD
  function forgotten() {
    setIsNotForgotten((is) => !is);
  }

  function eyeHandler() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }

  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }

  return (
    <>
      {(loginMutation.isPending || forgotPasswordMutation.isPending) && (
        <Spinner />
      )}
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>
          {isNotForgotten ? lang.forgotten : lang.signIn}
        </h2>

        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
          autoComplete="off"
        >
          <div className={styles.element}>
            <input
              className={styles.textInput}
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
              autoComplete="email"
              onBlur={valueHandler}
              // placeholder={lang.email}
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

          {!isNotForgotten && (
            <div className={styles.passContainer}>
              <div className={styles.element}>
                <input
                  className={styles.textInput}
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
                        }
                      : null
                  )}
                  // autoComplete="email"
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
          )}
          <div className={styles.btnContainer}>
            {isNotForgotten && (
              <div className={styles.backBtn}>
                <div className={styles.arrow}>
                  <GoChevronLeft />
                </div>
                <button className={styles.backBtnElement} onClick={forgotten}>
                  {lang.back}
                </button>
              </div>
            )}
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>
                {!isNotForgotten ? "Login" : "Send"}
              </Button>
            </div>
          </div>
        </form>

        {!isNotForgotten && (
          <div className={styles.authInfo}>
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => authToggle(false)}
                className={styles.authBtn}
              >
                Sign up!
              </button>
            </p>
            <p className={styles.forgotten}>
              <button onClick={forgotten}>Forgotten Password?</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
