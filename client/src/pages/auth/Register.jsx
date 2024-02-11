import styles from "./Register.module.css";
import { Form } from "react-hook-form";
import { GoX } from "react-icons/go";

import Button from "../../ui/elements/button/Button.jsx";

function Register({ onClose, authToggle }) {
  return (
    <div className={styles.container}>
      <Button onClick={onClose} className={styles.closeBtn}>
        <GoX />
      </Button>
      <h2>Register</h2>
      {/* <Form></Form> */}

      <div>
        <p>
          Already have an account?{" "}
          <Button onClick={() => authToggle(true)}>Sign in!</Button>
        </p>
      </div>
    </div>
  );
}

export default Register;
