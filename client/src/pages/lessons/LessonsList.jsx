import styles from "./LessonsList.module.css";

import toast from "react-hot-toast";

import { useLanguage } from "../../context/Language.jsx";
import { useGetAllLessonQueries } from "./useGetAllLessonQueries.js";

import LessonListElement from "./LessonListElement.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function LessonsList() {
  const { lang } = useLanguage();
  const { data, isFetching } = useGetAllLessonQueries();
  const result = data.filter((x) => new Date(x.validTo) >= new Date());

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.container}>
            <h1 className={styles.heading}>{lang.lessons}</h1>
            <div className={styles.secondaryContainer}>
              <div className={styles.lessons}>
                {result.map((lm) => (
                  <LessonListElement key={lm._id} lesson={lm} />
                ))}
              </div>
              <div className={styles.scrollToTop}>
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    })
                  }
                >
                  To top
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LessonsList;
