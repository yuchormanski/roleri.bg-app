import styles from "./LessonListElement.module.css";

import { Link } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";

function LessonListElement({ lesson }) {
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();

  return (
    <Link to={`/lesson/${lesson._id}`}>
      <figure className={styles.card}>
        <div className={styles.imgBox}>
          <img src={lesson.imageUrl} alt="" />
        </div>
        <div className={styles.textBox}>
          <span>{translate(lesson.title)}</span>
        </div>
        <div className={styles.main}>
          <div className={styles.info}>
            <p>{translate(lesson.skills)}</p>
            <p>{translate(lesson.location)}</p>
          </div>
          <p className={styles.button}>{lang.learnMore}</p>
        </div>
      </figure>
    </Link>
  );
}

export default LessonListElement;
