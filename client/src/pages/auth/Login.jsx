import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";

import Button from "../../ui/elements/button/Button.jsx";
import toast from "react-hot-toast";

function Login({ onClose, authToggle }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  function onFormSubmit(data) {
    console.log(data);
  }

  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }
  return (
    <div className={styles.container}>
      <div className={styles.closeBtn}>
        <Button onClick={onClose}>
          <GoX />
        </Button>
      </div>

      <h2 className={styles.heading}>Sign In</h2>

      <form
        onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
        className={styles.form}
      >
        <input
          className={styles.input}
          type="text"
          id="email"
          {...register("email", { required: "Email is required" })}
          placeholder={"Email"}
        />

        <input
          className={styles.input}
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          placeholder={"Password"}
        />

        <div style={{ alignSelf: "flex-end" }}>
          <Button type={"primary"}>Login</Button>
        </div>
      </form>

      <div className={styles.authInfo}>
        <p>
          Don&apos;t have an account?{" "}
          <button onClick={() => authToggle(false)} className={styles.authBtn}>
            Sign up!
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
