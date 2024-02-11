import { Form } from "react-hook-form";
import Button from "../../ui/elements/button/Button.jsx";

function Register() {
  return (
    <>
      <h2>Register</h2>
      <Form></Form>

      <div>
        <p>
          Already have an account? <Button>Sign in!</Button>
        </p>
      </div>
    </>
  );
}

export default Register;
