import Button from "../elements/button/Button.jsx";
import styles from "./NavigationMenu.module.css";

function NavigationMenu({ onLogin }) {
  return (
    <ul className={styles.list}>
      <li>
        <Button to={"/"}>Home</Button>
      </li>
      <li>
        <Button to={"lessons"}>Lessons</Button>
      </li>
      <li>
        {/* <Button to={"/login"}>Login</Button> */}
        <Button type={"primary"} onClick={onLogin}>
          Login
        </Button>
      </li>
    </ul>
  );
}

export default NavigationMenu;
