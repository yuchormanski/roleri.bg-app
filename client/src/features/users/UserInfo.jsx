import styles from "./UserInfo.module.css";

import { useEffect } from "react";

import { usePath } from "../../context/PathContext.jsx";
import { useLanguage } from "../../context/Language.jsx";

import { useGetUserDataQuery } from "./useGetUserDataQuery.js";

import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import UserLessonItem from "./UserLessonItem.jsx";

function UserInfo() {
  const { newPath } = usePath();
  const { lang, index } = useLanguage();

  // TODO: трябват две заявки, една за профила на юзъра и една за листа с уроците, ако той не се съдржа в самия юзър
  const { isLoading, isFetching, data } = useGetUserDataQuery();
  const lessons = [{}, {}];

  useEffect(() => newPath("profile"), [newPath]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.heading}>
            {index === 1
              ? `${data?.firstName}'s ${lang.dashboard}`
              : ` ${lang.dashboard} на ${data?.firstName}`}
          </h3>

          <div className={styles.secondaryContainer}>
            {lessons.length === 0 ? (
              <h3>You have no active lessons.</h3>
            ) : (
              <div className={styles.lessonsContainer}>
                {lessons.map((lesson, i) => (
                  <UserLessonItem key={lesson._id || i} />
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
