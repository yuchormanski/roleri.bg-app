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

  const textOptions = [lang.a_info_1, lang.a_info_2, lang.a_info_3];

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.heading}>
            {`${data?.firstName} ${data?.lastName}'s ${lang.adminPanel}`}
          </h3>
          <div className={styles.innerContainer}>
            <ul className={styles.list}>
              {textOptions.map((option, i) => (
                <ListOptions option={option} key={i} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminInfo;

function ListOptions({ option }) {
  const src = "/wheel.webp";
  return (
    <li className={styles.listItem}>
      <img src={src} alt="bullet dot" className={styles.bullet} />
      <p>{option}</p>
    </li>
  );
}
