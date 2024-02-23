import styles from "./AdminInfo.module.css";

import { useEffect } from "react";

import { usePath } from "../../context/PathContext.jsx";
import { useLanguage } from "../../context/Language.jsx";

import { useGetUserDataQuery } from "../users/useGetUserDataQuery.js";

import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function AdminInfo() {
  const { newPath } = usePath();
  const { lang } = useLanguage();

  const { isLoading, data } = useGetUserDataQuery();

  useEffect(() => newPath("settings"), [newPath]);

  return (
    <>
      {isLoading
        ? (
          <Spinner />
        ) : (
          <div className={styles.container}>
            <h3 className={styles.heading}>
              {`${data?.firstName} ${data?.lastName}'s ${lang.adminPanel}`}
            </h3>
            <p>This is admin page: Welcome here you can add, edit and delete your options TODO add more functionality</p>
          </div >
        )
      }
    </>
  );
}

export default AdminInfo;
