import styles from "./UserLessonItem.module.css";

import { useTranslate } from "../../hooks/useTranslate.js";
import { PiCheckBold, PiCheck, PiX, PiXBold } from "react-icons/pi";

function UserLessonItem({ bookedLesson, rejectLessonHandler }) {
  const { translatePhrase: translate } = useTranslate();
  // TODO: choose which property to use and then which to remove from the server population
  // console.log(bookedLesson)
  const { lessonId, skaterId, subscriptionId, ...bookingMainData } = bookedLesson;

  return (
    <figure className={styles.figure}>
      <div className={styles.content}>
        <h3 className={styles.header}>{skaterId.firstName} {skaterId.lastName}</h3>
        <p className={styles.group}>{translate(lessonId.title)}</p>
        <p className={styles.date}>{new Date(bookingMainData.date).toLocaleDateString()}</p>
        <div className={styles.reject}>
          <span>Reject</span>
          <button className={styles.inNotOK} onClick={() => rejectLessonHandler(bookingMainData._id)}>
            <PiX />
          </button>
        </div>
      </div>
    </figure>
  );
}

export default UserLessonItem;
