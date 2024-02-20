import styles from "./UpdateUser.module.css";

import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import { useForm } from "react-hook-form";
import {
  EMAIL_REGEX,
  PHONE_REGEX,
} from "../../services/environment.js";
import { useLanguage } from "../../context/Language.jsx";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useUpdateUserQuery } from "./useUpdateUserQuery.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function UpdateUser() {
  const { path, newPath } = usePath();

  const { updateUserMutation } = useUpdateUserQuery();
  const { getUserHandler } = useAuthContext();
  const data = getUserHandler();

  const { lang } = useLanguage();

  useEffect(() => newPath("edit"), [newPath]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
  });

  async function onFormSubmit(data) {
    const { _id, ...dataFromServer } = data;
    await updateUserMutation.mutateAsync(dataFromServer);
    reset();
  }

  function onErrorForm(error) {
    console.log(error);
    Object.entries(error).map((e) => {
      toast.error(e.at(1).message);
    });
  }

  const isLoading = updateUserMutation.isPending;
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.update}</h3>
      {updateUserMutation.isPending
        ? (
          <Spinner />
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit(onFormSubmit, onErrorForm)}
          >
            <input
              disabled={isLoading}
              className={styles.input}
              type="text"
              id="firstName"
              {...register("firstName", {
                required: "First name is required",
                maxLength: {
                  value: 30,
                  message: "First name can't be more than 30 characters long!",
                },
              })}
              placeholder={"First name"}
              autoComplete="given-name"
            />
            <input
              disabled={isLoading}
              className={styles.input}
              type="text"
              id="lastName"
              {...register("lastName", {
                required: "Last name is required",
                maxLength: {
                  value: 30,
                  message: "Last name can't be more than 30 characters long!",
                },
              })}
              placeholder={"Last name"}
              autoComplete="family-name"
            />
            <input
              disabled={isLoading}
              className={styles.input}
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
              placeholder={"Email"}
              autoComplete="email"
            />
            <input
              disabled={isLoading}
              className={styles.input}
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
              placeholder={"Phone number"}
              autoComplete="tel"
            />
            <button className={styles.updateBtn} disabled={isLoading}>
              {lang.send}
            </button>
          </form>
        )}
    </div>
  );
}

export default UpdateUser;
