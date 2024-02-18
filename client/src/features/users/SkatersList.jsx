import { useLanguage } from "../../context/Language.jsx";
import styles from "./SkatersList.module.css";

function SkatersList() {
  const { lang } = useLanguage();

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.skaters}</h3>
    </div>
  );
}

export default SkatersList;
