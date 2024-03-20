import styles from "./SkaterElement.module.css";

import { useLanguage } from "../../context/Language.jsx";

import { ImInfo } from "react-icons/im";

function SkaterElement({ skater }) {
  const { _id, firstName, lastName, skates, protection, requirements } = skater;
  const { lang } = useLanguage();

  return (
    <figure className={styles.figure}>
      <h3 className={styles.heading}>
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
        <p className={`${styles.skaterProps} ${styles.infoBlock}`}>
          <ImInfo />
        </p>
      </div>
    </figure>
  );
}

export default SkaterElement;
