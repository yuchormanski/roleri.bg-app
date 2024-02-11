import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { GoChevronLeft, GoX, GoEye, GoEyeClosed } from "react-icons/go";

import Button from "../../ui/elements/button/Button.jsx";
import toast from "react-hot-toast";
import { useState } from "react";
import { EMAIL_REGEX } from "../../services/environment.js";

function Login({ onClose, authToggle }) {
  const [isNotForgotten, setIsNotForgotten] = useState(false);
  const [hide, setHide] = useState(false);
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // SUBMITTING THE FORM
  function onFormSubmit(data) {
    console.log(data);
    if (isNotForgotten) {
      //register user
    } else {
      //send reset password email
    }
  }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  //CHANGE FORGOTTEN PASSWORD
  function forgotten() {
    setIsNotForgotten((is) => !is);
  }
  return (
    <div className={styles.container}>
      <div className={styles.closeBtn}>
        <Button onClick={onClose}>
          <GoX />
        </Button>
      </div>

      <h2 className={styles.heading}>
        {isNotForgotten ? "Forgotten Password" : "Sign In"}
      </h2>

      <form
        onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
        className={styles.form}
      >
        <input
          className={styles.input}
          type="text"
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
          placeholder={"Email"}
        />

        {!isNotForgotten && (
          <input
            className={styles.input}
            type="password"
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
            placeholder={"Password"}
          />
        )}
        <div className={styles.btnContainer}>
          {isNotForgotten && (
            <div className={styles.backBtn}>
              <div className={styles.arrow}>
                <GoChevronLeft />
              </div>
              <Button type={"small"} onClick={forgotten}>
                Back
              </Button>
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
            <Button type={"small"} onClick={forgotten}>
              Forgotten Password?
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
