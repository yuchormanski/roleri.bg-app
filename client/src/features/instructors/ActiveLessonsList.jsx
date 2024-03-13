import styles from "./ActiveLessonsList.module.css";

import { Link } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { usePath } from "../../context/PathContext.jsx";
import { useEffect } from "react";

// MOCKED DATA
const lessonsData = [
  {
    lessonTitle: " Group Beginners",
    participants: 7,
    _id: 1,
  },
  {
    lessonTitle: " Group Advanced",
    participants: 10,
    _id: 2,
  },
];

function ActiveLessonsList() {
  const { lang } = useLanguage();
  const { path, newPath } = usePath();
  useEffect(() => newPath("lessons"), [newPath]);

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.i_signedLessons}</h3>

        <div className={styles.secondaryContainer}>
          {lessonsData.length ? (
            <div className={styles.equipmentContainer}>
              {lessonsData.map((lesson) => (
                <figure className={styles.figure} key={lesson._id}>
                  <div className={styles.content}>
                    <Link
                      className={styles.skateItem}
                      to={`/on-duty/activeLesson/${lesson._id}`}
                    >
                      <p className={styles.element}>
                        <span className={styles.elSpan}>{lang.type}:</span>
                        {lesson.lessonTitle}
                      </p>
                      <p className={styles.element}>
                        <span className={styles.elSpan}>
                          {lang.participants}:
                        </span>
                        {lesson.participants}
                      </p>
                    </Link>
                  </div>
                </figure>
              ))}
            </div>
          ) : (
            <h2 className={styles.headingNoSkaters}>
              {lang.i_noSignedLessons}
            </h2>
          )}
        </div>
      </div>
    </>
  );
}

export default ActiveLessonsList;
