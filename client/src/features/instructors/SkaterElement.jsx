import { useLanguage } from "../../context/Language.jsx";
import styles from "./SkaterElement.module.css";

function SkaterElement({ skater }) {
  const { _id, firstName, lastName, skates, protection, requirements } = skater;
  const { lang } = useLanguage();

  return (
    <figure className={styles.figure}>
      <h3>
        {firstName} {lastName}
      </h3>

      <div className={styles.additional}>
        <p className={styles.skaterProps}>
          <span>{lang.skates}</span>
          {skates}
        </p>
        <p className={styles.skaterProps}>
          <span>{lang.protection}</span>
          {protection}
        </p>
        <p className={styles.skaterProps}>
          <span>{lang.requirements}</span>
          {requirements}
        </p>
      </div>
    </figure>
  );
}

export default SkaterElement;
