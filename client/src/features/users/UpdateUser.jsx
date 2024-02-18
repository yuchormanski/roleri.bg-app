import styles from "./UpdateUser.module.css";

import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Input from "../../ui/elements/Input.jsx";
import { EMAIL_REGEX, PHONE_REGEX } from "../../services/environment.js";
import { useLanguage } from "../../context/Language.jsx";

const userMock = {
  _id: "65d1e25875c58bac29f86ea7",
  firstName: "Van",
  lastName: "Deribohten",
  email: "van@deribohten.com",
  role: "user",
  phone: "+35976382648",
};

function UpdateUser() {
  const { path, newPath } = usePath();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { lang } = useLanguage();

  useEffect(() => newPath("edit"), [newPath]);

  // const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => userMock,
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.update}</h3>
      <form className={styles.form}>
        <input
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
          defaultValue={data?.firstName}
        />

        <input
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
          defaultValue={data?.lastName}
        />

        <input
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
          defaultValue={data?.email}
        />

        <input
          className={styles.input}
          type="tel"
          id="phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: PHONE_REGEX,
              message: "Invalid phone number address",
            },
            maxLength: {
              value: 20,
              message: "Phone can't be more than 20 characters long!",
            },
          })}
          placeholder={"Phone number"}
          autoComplete="tel"
          defaultValue={data?.phone}
        />
      </form>
    </div>
  );
}

export default UpdateUser;
