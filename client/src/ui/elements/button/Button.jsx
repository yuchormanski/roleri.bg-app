import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({ children, type, to, onClick }) {
  if (to) {
    return (
      <Link to={to} className={styles.navLink}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
