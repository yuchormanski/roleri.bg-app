import styles from "./ActiveLessonsList.module.css";

import { useLanguage } from "../../context/Language.jsx";
import { usePath } from "../../context/PathContext.jsx";
import { useEffect } from "react";

function ActiveLessonsList() {
  const { lang } = useLanguage();
  const { path, newPath } = usePath();
  useEffect(() => newPath("lessons"), [newPath]);

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.i_signedLessons}</h3>

        <div className={styles.secondaryContainer}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
          excepturi qui dolores earum sint illo. Eius hic sequi quos,
          necessitatibus distinctio aspernatur eos earum iure suscipit itaque
          modi ipsum vitae.
        </div>
      </div>
    </>
  );
}

export default ActiveLessonsList;
