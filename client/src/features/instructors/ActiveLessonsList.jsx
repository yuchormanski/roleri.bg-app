import styles from "./ActiveLessonsList.module.css";

import { Link } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { usePath } from "../../context/PathContext.jsx";
import { useEffect, useState } from "react";
import { useGetActiveLessonsQuery } from "./useGetActiveLessonsQuery.js";
import { useTranslate } from "../../hooks/useTranslate.js";
import { usePostponeActiveLesson } from "./usePostponeActiveLesson.js";
import Popup from "../../ui/elements/popupModal/Popup.jsx";
import { GoX } from "react-icons/go";
import Button from "../../ui/elements/button/Button.jsx";
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
  const [currentDate, setCurrentDate] = useState("");
  const [modal, setModal] = useState(false);
  const [textAreaState, setTextAreaState] = useState("");
  // const [activeLessonId, setActiveLessonId] = useState(null);

  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { path, newPath } = usePath();

  const { isFetching, data: lessons } = useGetActiveLessonsQuery();
  const {
    mutateAsync,
    isPending,
    isFetching: cancelAdmin,
  } = usePostponeActiveLesson();
  useEffect(() => newPath("lessons"), [newPath]);

  useEffect(() => {
    if (isFetching || !lessons || Object.keys(lessons).length == 0) {
      return;
    }
    const current = Object.values(lessons).at(0).lessonDate;
    setCurrentDate(current.replaceAll("/", "."));
    setLessonData(
      Object.keys(lessons).reduce((acc, groupName) => {
        const summaryObject = {
          lessonTitle: groupName,
          participants: lessons[groupName].data.length,
          _id: lessons[groupName]._id,
        };

        acc.push(summaryObject);
        return acc;
      }, [])
    );
  }, [lessons]);

  // function onLessonClickHandler(lessonId) {
  //   setActiveLessonId(lessonId === activeLessonId ? null : lessonId);
  // }

  function textAreaHandler(e) {
    if (!e.target.value && e.target.value !== "") {
      return;
    }

    setTextAreaState(e.target.value);
  }

  async function manualCancelOfNextLesson() {
    if (isFetching || !lessons || Object.keys(lessons).length == 0) {
      return;
    }

    const activeLessonBookedUsersCustomIds = Object.values(lessons).flatMap(
      (l) => l.data.map((sub) => sub.subscriptionCodeId)
    );
    await mutateAsync({
      activeLessonBookedUsersCustomIds,
      message: textAreaState,
    });
  }

  return (
    <>
      {modal && (
        <Popup>
          <div className={styles.modalContainer}>
            <div className={styles.closeBtn}>
              <button
                onClick={() => setModal(false)}
                className={styles.closeIcon}
              >
                <GoX />
              </button>
            </div>
            <div className={styles.element}>
              <textarea
                className={styles.textarea}
                type="text"
                id="additionalRequirements"
                name="additionalRequirements"
                rows={3}
                onChange={textAreaHandler}
                value={textAreaState}
              />
              <label
                htmlFor={"additionalRequirements"}
                className={`${styles.label} ${
                  textAreaState ? styles.filled : null
                }`}
              >
                {lang.i_cancelLable}
              </label>
            </div>
            <Button type="primary" onClick={manualCancelOfNextLesson}>
              {lang.i_cancelLesson}
            </Button>
          </div>
        </Popup>
      )}

      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.i_signedLessons}</h3>
        {lessonsData.length ? (
          isFetching ? null : (
            <div className={styles.headingActions}>
              <p className={styles.headingDate}>{currentDate}</p>
              <button
                onClick={() => setModal(true)}
                className={styles.actionBtn}
              >
                {lang.cancelDate}
              </button>
            </div>
          )
        ) : null}
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
