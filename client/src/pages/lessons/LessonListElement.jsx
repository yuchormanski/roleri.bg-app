import styles from "./LessonListElement.module.css";

import { Link } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";

function LessonListElement({ lesson }) {
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();

  function reveal() {
    let reveals = document.querySelectorAll(".card");

    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 10;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);

  return (
    <figure className={styles.card}>
      <div className={styles.imgBox}>
        <img src={lesson.imageUrl} alt="" />
      </div>
      <div className={styles.textBox}>
        <span className={styles.title}>{translate(lesson.title)}</span>
      </div>
      <div className={styles.main}>
        <div className={styles.info}>
          <p>{translate(lesson.skills)}</p>
          <p>{translate(lesson.location)}</p>
        </div>
        <Link to={`/lesson/${lesson._id}`} className={styles.link}>
          <p className={styles.button}>{lang.learnMore}</p>
        </Link>
      </div>
    </figure>
  );
}

export default LessonListElement;
