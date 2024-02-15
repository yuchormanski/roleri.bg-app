import toast from "react-hot-toast";
import styles from "./LessonsList.module.css";

import { useLanguage } from "../../context/Language.jsx";
import { useLessonQueries } from "./useLessonQueries.js";

import LessonListElement from "./LessonListElement.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function LessonsList() {
  const { lang } = useLanguage();
  const { getAllLessonsQuery } = useLessonQueries();

  if (getAllLessonsQuery.isError) {
    toast.error(getAllLessonsQuery.error.message);
  }

  return (
    <>
      {getAllLessonsQuery.isLoading
        ? (<Spinner />
        ) : (
          <>
            <h1 className={styles.heading}>{lang.lessons}</h1>
            <div className={styles.lessons}>
              {getAllLessonsQuery.data.map((lm) => (
                <LessonListElement key={lm._id} lm={lm} />
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
          </>
        )}
    </>
  );
}

export default LessonsList;
