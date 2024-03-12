import styles from "./ResetPassword.module.css";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoX, GoEye, GoEyeClosed } from "react-icons/go";
import toast from "react-hot-toast";

import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useAuthQueries } from "./useAuthQueries.js";
import { PASS_REGEX } from "../../services/environment.js";

function ResetPassword() {
  const { resetToken } = useParams();
  const { resetPasswordMutation } = useAuthQueries();
  const { register, handleSubmit, reset, getValues } = useForm();
  const [visible, setVisible] = useState(false);

  // SUBMITTING THE FORM
  async function onFormSubmit(newPassword) {
    const { password, ...data } = newPassword;
    await resetPasswordMutation.mutateAsync({ password, resetToken });
    reset();
  }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  function eyeHandler() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }

  return (
    <>
      {resetPasswordMutation.isPending && <Spinner />}
      <div className={styles.container}>
        <h2 className={styles.heading}>
          {"Add new password"}
        </h2>

        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
          <div className={styles.passContainer}>
            <input
              className={styles.input}
              type={visible ? "text" : "password"}
              id="password"
              {...register(
                "password",
                {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message:
                      "The password should be at least 3 characters long ",
                  },
                  pattern: {
                    value: PASS_REGEX,
                    message: "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
                  },
                }
              )}
              placeholder={"Password"}
            />
            <div className={styles.passEyeBtn} onClick={eyeHandler}>
              {visible ? <GoEyeClosed /> : <GoEye />}
            </div>
          </div>
          <input
            className={styles.input}
            type={visible ? "text" : "password"}
            id="repass"
            {...register("repass", {
              required: "Repeat password is required",
              validate: (value) =>
                value === getValues().password || "Passwords don't match",
              pattern: {
                value: PASS_REGEX,
                message: "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
              },
            })}
            placeholder={"Repeat password"}
            autoComplete="new-password"
          />

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>
                {"Change"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
