import styles from "./UserInfo.module.css";

import { useEffect } from "react";

import { usePath } from "../../context/PathContext.jsx";
import { useLanguage } from "../../context/Language.jsx";

import { useGetUserDataQuery } from "./useGetUserDataQuery.js";

import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function UserInfo() {
  const { newPath } = usePath();
  const { lang } = useLanguage();

  const { isLoading, data } = useGetUserDataQuery();
  const lessons = {};

  useEffect(() => newPath("profile"), [newPath]);

  return (
    <>
      {isLoading
        ? (
          <Spinner />
        ) : (
          <div className={styles.container}>
            <h3 className={styles.heading}>
              {`${data?.firstName} ${data?.lastName}'s ${lang.dashboard}`}
            </h3>
            {lessons && <h3>You have no active lessons.</h3>}
            <p>
              Трябва да се зарежда информация дали има предстоящи записани уроци.
            </p>
          </div >
        )
      }
    </>
  );
}

export default UserInfo;
