import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { GoChevronLeft, GoX, GoEye, GoEyeClosed } from "react-icons/go";

import Button from "../../ui/elements/button/Button.jsx";
import toast from "react-hot-toast";
import { useState } from "react";
import { EMAIL_REGEX, PHONE_REGEX } from "../../services/environment.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useAuthQueries } from "./useAuthQueries.js";
// import PhoneComponent from "../../ui/elements/phone/PhoneComponent.jsx";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function Register({ onClose, authToggle }) {
  const [isNotForgotten, setIsNotForgotten] = useState(false);
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { registerMutation } = useAuthQueries();

  const [phone, setPhone] = useState("");

  // SUBMITTING THE FORM
  async function onFormSubmit(regData) {
    try {
      if (!PHONE_REGEX.test(phone)) throw new Error("Invalid phone number!");

      // TODO: да се направи базата да приема firstName & lastName instead of name

      const resultData = {
        name: `${regData.firstName} ${regData.lastName}`,
        email: regData.email,
        password: regData.password,
        phone: phone,
      };

      // await registerMutation.mutateAsync({ ...regData, phone: phone });
      await registerMutation.mutateAsync(resultData); //REMOVE this
      onClose();
      reset();
    } catch (error) {
      toast.error(error.message);
      console.error("Registration error:", error);
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
            placeholder={"First name"}
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
            placeholder={"Last name"}
          />
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

          <PhoneInput
            name={"phone"}
            defaultCountry="bg"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputStyle={{
              border: "1px solid lightgray",
              backgrounColor: "none",
              borderRadius: "3px",
              fontSize: "1.6rem",
              padding: "0 2px",
              width: "100%",
              height: "auto",
              margin: "0 0 0 5px",
            }}
            buttonStyle={true}
          />

          <div className={styles.btnContainer}>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>Register</Button>
            </div>
          </div>
        </form>

        <div className={styles.authInfo}>
          <p>
            Already have an account?{" "}
            <button onClick={() => authToggle(true)} className={styles.authBtn}>
              Sign In!
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
