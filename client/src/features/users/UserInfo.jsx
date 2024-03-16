import styles from "./UserInfo.module.css";

import { useEffect } from "react";

import { usePath } from "../../context/PathContext.jsx";
import { useLanguage } from "../../context/Language.jsx";

import { useRejectBookingQuery } from "./useRejectBookingQuery.js";
import { useGetAllBookingDataQuery } from "./useGetAllBookingDataQuery.js";

import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import UserLessonItem from "./UserLessonItem.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";

function UserInfo() {
  const { newPath } = usePath();
  const { lang, index } = useLanguage();

  const { getUserHandler } = useAuthContext();
  const userData = getUserHandler();

  const { mutateAsync, isPending } = useRejectBookingQuery();
  const { isFetchingBooking, data: lessons } = useGetAllBookingDataQuery();

  useEffect(() => newPath("profile"), [newPath]);

  async function rejectLessonHandler(bookingId) {
    try {
      await mutateAsync({ _id: bookingId });
    } catch (error) {
      console.error(error.message);
    }
  }

  const isLoading = isFetchingBooking || isPending;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.heading}>
            {index === 1
              ? `${userData.firstName}'s ${lang.dashboard}`
              : ` ${lang.dashboard} на ${userData.firstName}`}
          </h3>

          <div className={styles.secondaryContainer}>
            {lessons.length === 0 ? (
              <h3>You have no active lessons.</h3>
            ) : (
              <div className={styles.lessonsContainer}>
                {lessons.map((lesson) => (
                  <UserLessonItem
                    key={lesson._id}
                    bookedLesson={lesson}
                    rejectLessonHandler={rejectLessonHandler}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfo;
