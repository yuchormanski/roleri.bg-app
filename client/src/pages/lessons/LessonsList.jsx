import { useLanguage } from "../../context/Language.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import LessonListElement from "./LessonListElement.jsx";
import styles from "./LessonsList.module.css";

function LessonsList() {
  const { lang } = useLanguage();
  return (
    <>
      <h1 className={styles.heading}>{lang.lessons}</h1>

      <LessonListElement />
    </>
  );
}

export default LessonsList;
