import styles from "./UserLessonItem.module.css";

import { PiCheckBold, PiCheck, PiX, PiXBold } from "react-icons/pi";

function UserLessonItem() {
  return (
    <figure className={styles.figure}>
      <div className={styles.content}>
        <h3 className={styles.header}>Stamat Petrov</h3>
        <p className={styles.group}>Group Beginners</p>
        <p className={styles.date}>13.04.2024</p>
        <div className={styles.reject}>
          <span>Reject</span>
          <button className={styles.inNotOK}>
            <PiX />
          </button>
        </div>
      </div>
    </figure>
  );
}

export default UserLessonItem;
