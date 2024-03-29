import styles from "./GetSkater.module.css";

import { GoX } from "react-icons/go";

import { useLanguage } from "../../context/Language.jsx";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";

function GetSkater({ onClose, skaterData: skater }) {
  const { lang, index } = useLanguage();
  const { translatePhrase } = useTranslate();

  return (
    <Popup onClose={onClose} backgroundClick={false}>
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>

        <figure className={styles.figure} key={skater._id}>
          <header className={styles.header}>
            <h3
              className={styles.figureHeading}
            >{`${skater.firstName} ${skater.lastName}`}</h3>
          </header>

          <div className={styles.content}>
            <p className={styles.element}>
              <span className={styles.elSpan}>{lang.age}: </span>
              {skater.age}
            </p>

            <p className={styles.element}>
              <span className={styles.elSpan}>{lang.s_skates}: </span>
              {skater?.skatesSize?.size === 0
                ? lang.haveOwn
                : skater.skatesSize.size}
            </p>

            <p className={styles.element}>
              <span className={styles.elSpan}>{lang.s_protections}: </span>
              {Number(skater?.protection?.size) === 0
                ? lang.haveOwn
                : skater.protection.size.toUpperCase()}
            </p>

            <p className={`${styles.element} ${styles.additional}`}>
              <span className={styles.elSpan}>{lang.s_requirements}: </span>
              {skater.additionalRequirements
                ? skater.additionalRequirements
                : index
                ? "No"
                : "Няма"}
            </p>
          </div>
        </figure>
      </div>
    </Popup>
  );
}

export default GetSkater;
