import { useLanguage } from "../../context/Language.jsx";
import styles from "./LessonListElement.module.css";

function LessonListElement({ lm }) {
  const { lang, index } = useLanguage();

  return (
    <figure className={styles.figure} key={lm.id}>
      <div className={styles.imgContainer}>
        <a href="https://roleri.bg/course/advanced-group/">
          <img
            src={lm.imageUrl}
            className={styles.img}
            alt="Picture of inline skate lesson"
          />
        </a>
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading}>
          {lm.title.split("&/&").at(index) ?? lm.title}
        </h2>
        <p className={styles.titleInfo}>
          <span className={styles.additional}>* </span>
          {lm.titleInfo.split("&/&").at(index) ?? lm.titleInfo}
        </p>

        <div className={styles.description}>
          <div className={styles.line}>
            <span>{lang.age}:</span>
            {lm.age.split("&/&").at(index) ?? lm.age}
          </div>

          <div className={styles.line}>
            <span>{lang.skills}:</span>
            {lm.skills.split("&/&").at(index) ?? lm.skills}
          </div>

          <div className={styles.line}>
            <span>{lang.participants}:</span>
            {lm.participants.split("&/&").at(index) ?? lm.participants}
          </div>

          <div className={styles.line}>
            <span>{lang.type}:</span>
            {lm.type.split("&/&").at(index) ?? lm.type}
          </div>
          <div className={styles.line}>
            <span>{lang.count}:</span>
            {lm.count.split("&/&").at(index) ?? lm.count}
          </div>
          <div className={styles.line}>
            <span>{lang.location}: </span>
            {lm.location.split("&/&").at(index) ?? lm.location}
          </div>
          {/* <div className={styles.line}>
            <span>{lang.price}: </span>
            {lm.price.split("&/&").at(index) ?? lm.price}
          </div> */}
        </div>
      </div>
    </figure>
  );
}

export default LessonListElement;
