import { Form } from "react-hook-form";
import Button from "../../ui/elements/button/Button.jsx";

function Login({ onClose }) {
  return (
    <>
      <h2>Login</h2>
      <Form></Form>

      <div>
        <p>Don't have an account? <Button>Sign up!</Button></p>
      </div>
    </>
  );
}

export default Login;
