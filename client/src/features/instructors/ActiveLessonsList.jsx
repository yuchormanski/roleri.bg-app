import styles from "./ActiveLessonsList.module.css";

import { Link } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { usePath } from "../../context/PathContext.jsx";
import { useEffect, useState } from "react";
import { useGetActiveLessonsQuery } from "./useGetActiveLessonsQuery.js";
import { useTranslate } from "../../hooks/useTranslate.js";
// import ActiveLesson from "./ActiveLesson.jsx";

// // MOCKED DATA
// const lessonsData = [
//   {
//     lessonTitle: " Group Beginners",
//     participants: 7,
//     _id: 1,
//   },
//   {
//     lessonTitle: " Group Advanced",
//     participants: 10,
//     _id: 2,
//   },
// ];

function ActiveLessonsList() {
  const [lessonsData, setLessonData] = useState([]);
  // const [activeLessonId, setActiveLessonId] = useState(null);

  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { path, newPath } = usePath();

  const { isFetching, data: lessons } = useGetActiveLessonsQuery();

  useEffect(() => newPath("lessons"), [newPath]);

  useEffect(() => {
    if (!lessons) {
      return;
    }

    setLessonData(Object.keys(lessons).reduce((acc, groupName) => {
      const summaryObject = {
        lessonTitle: groupName,
        participants: lessons[groupName].data.length,
        _id: lessons[groupName]._id,
      };

      acc.push(summaryObject);
      return acc;
    }, []));

  }, [lessons]);

  // function onLessonClickHandler(lessonId) {
  //   setActiveLessonId(lessonId === activeLessonId ? null : lessonId);
  // }

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
                    // to={undefined}
                    // onClick={() => onLessonClickHandler(lesson._id)}
                    >
                      <p className={styles.element}>
                        <span className={styles.elSpan}>{lang.type}:</span>
                        {translate(lesson.lessonTitle)}
                      </p>
                      <p className={styles.element}>
                        <span className={styles.elSpan}>
                          {lang.participants}:
                        </span>
                        {lesson.participants}
                      </p>
                    </Link>
                  </div>
                  {/* {activeLessonId === lesson._id && (
                    <ActiveLesson lessonsData={lessons[lesson.lessonTitle]} />
                  )} */}
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