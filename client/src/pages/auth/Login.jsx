import Button from "../../ui/elements/button/Button.jsx";
import Navigation from "../../ui/navigation/Navigation.jsx";

function Login({ onClose }) {
  return (
    <>
      <h2>Login</h2>
      <Button onClick={onClose} type={"primary"}>
        X
      </Button>
    </>
  );
}

export default Login;
