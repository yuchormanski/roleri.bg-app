import { useTheme } from "../../../context/DarkMode.jsx";
import styles from "./Spinner.module.css";

function Spinner() {
  const { isDark } = useTheme();
  const src = isDark ? "/apple-touch-icon.png" : "/wheel2.png";
  return (
    <div className={styles.spinnerBlock}>
      <img src={src} alt="Loading image" className={styles.rotate} />
    </div>
  );
}

export default Spinner;
