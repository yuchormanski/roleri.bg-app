import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({ children, type, to }) {
  if (to) {
    return <Link to={to}>{children}</Link>;
  }

  return <button className={styles[type]}>{children}</button>;
}

export default Button;
