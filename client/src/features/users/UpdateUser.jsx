import styles from "./UpdateUser.module.css";

import { useEffect, useState } from "react";
import { usePath } from "../../context/PathContext.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { EMAIL_REGEX, PHONE_REGEX } from "../../services/environment.js";

import { useLanguage } from "../../context/Language.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";

import { useUpdateUserQuery } from "./useUpdateUserQuery.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function UpdateUser() {
  const { path, newPath } = usePath();

  const { updateUserMutation } = useUpdateUserQuery();
  const { getUserHandler } = useAuthContext();
  const data = getUserHandler();
  const [fieldValues, setFieldValues] = useState({ ...data });

  const { lang } = useLanguage();

  useEffect(() => newPath("edit"), [newPath]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
  });

  async function onFormSubmit(data) {
    try {
      const { _id, createdAt, updatedAt, ...serverData } = data;
      await updateUserMutation.mutateAsync(serverData);

      reset();
    } catch (error) {
      console.error(error.message);
    }
  }

  function onErrorForm(error) {
    console.log(error);
    Object.entries(error).map((e) => {
      toast.error(e.at(1).message);
    });
  }

  // HELPER

  function valueHandler(e) {
    const valueName = e.target.name;
    const value = e.target.value;
    setFieldValues({ ...fieldValues, [valueName]: value });
  }

  const isLoading = updateUserMutation.isPending;
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.update}</h3>

      <div className={styles.secondaryContainer}>
        {updateUserMutation.isPending ? (
          <Spinner />
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit(onFormSubmit, onErrorForm)}
          >
            <div className={styles.element}>
              <input
                disabled={isLoading}
                className={styles.textInput}
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: {
                    value: 30,
                    message:
                      "First name can't be more than 30 characters long!",
                  },
                })}
                autoComplete="given-name"
                onBlur={valueHandler}
              />
              <label
                htmlFor={"firstName"}
                className={`${styles.label} ${fieldValues.firstName ? styles.filled : null
                  }`}
              >
                {lang.firstName}
              </label>
            </div>

            <div className={styles.element}>
              <input
                disabled={isLoading}
                className={styles.textInput}
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  maxLength: {
                    value: 30,
                    message: "Last name can't be more than 30 characters long!",
                  },
                })}
                autoComplete="family-name"
                onBlur={valueHandler}
              />
              <label
                htmlFor={"lastName"}
                className={`${styles.label} ${fieldValues.lastName ? styles.filled : null
                  }`}
              >
                {lang.lastName}
              </label>
            </div>

            <div className={styles.element}>
              <input
                disabled={isLoading}
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
              />
              <label
                htmlFor={"email"}
                className={`${styles.label} ${fieldValues.email ? styles.filled : null
                  }`}
              >
                {lang.email}
              </label>
            </div>

            <div className={styles.element}>
              <input
                disabled={isLoading}
                className={styles.textInput}
                type="tel"
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: PHONE_REGEX,
                    message: "Invalid phone number",
                  },
                  maxLength: {
                    value: 20,
                    message: "Phone can't be more than 20 characters long!",
                  },
                })}
                autoComplete="tel"
                onBlur={valueHandler}
              />
              <label
                htmlFor={"phone"}
                className={`${styles.label} ${fieldValues.phone ? styles.filled : null
                  }`}
              >
                {lang.phone}
              </label>
            </div>
            <button className={styles.updateBtn} disabled={isLoading}>
              {lang.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateUser;
