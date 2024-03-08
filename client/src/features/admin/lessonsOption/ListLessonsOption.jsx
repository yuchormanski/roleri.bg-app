import styles from "./ListLessonsOption.module.css";
import { useState } from "react";

import toast from "react-hot-toast";
import { PiCheckBold, PiCheck, PiX, PiXBold } from "react-icons/pi";
import { LiaEditSolid, LiaTrashAlt } from "react-icons/lia";

import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import { useLanguage } from "../../../context/Language.jsx";
import { useGetAllLessonQueries } from "../../../pages/lessons/useGetAllLessonQueries.js";
import { useTranslate } from "../../../hooks/useTranslate.js";
import { useToggleModal } from "../../../hooks/useToggleModal.js";
import AddLessonOption from "./AddLessonOption.jsx";
import EditLessonOption from "./EditLessonOption.jsx";
import DeleteLessonOption from "./DeleteLessonOption.jsx";

function ListLessonsOption() {
  const { lang } = useLanguage();
  const { translatePhrase } = useTranslate();
  const [isShownAddModal, toggleAddModalHandler] = useToggleModal();
  const [isShownEditModal, toggleEditModalHandler] = useToggleModal();
  const [isShownDeleteModal, toggleDeleteModalHandler] = useToggleModal();
  const [selectedOptionData, setSelectedOptionData] = useState({});

  const { data: lessonData, isFetching } = useGetAllLessonQueries();

  function onEditLesson(lessonData) {
    setSelectedOptionData(lessonData);
    toggleEditModalHandler();
  }

  function onDeleteLesson(lessonData) {
    setSelectedOptionData(lessonData);
    toggleDeleteModalHandler();
  }

  function calChecker(date) {
    const valid = new Date(date) >= new Date();

    return valid;
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.a_lessons}</h3>
        {isFetching ? (
          <Spinner />
        ) : (
          <div className={styles.secondaryContainer}>
            {lessonData?.length > 0 ? (
              lessonData.map((lesson) => (
                <figure className={styles.figure} key={lesson._id}>
                  <div className={styles.content}>
                    <div className={styles.item}>
                      <p className={styles.element}>
                        <span className={styles.elSpan}>{lang.title}</span>
                        {translatePhrase(lesson.title)}
                      </p>
                    </div>
                    <div className={styles.actionContainer}>
                      <p
                        className={`${styles.isValid} ${
                          calChecker(lesson.validTo)
                            ? styles.isOK
                            : styles.isNotOK
                        }`}
                      >
                        {calChecker(lesson.validTo) ? <PiCheck /> : <PiX />}
                      </p>
                      <button
                        className={styles.actionBtn}
                        onClick={() => onEditLesson(lesson)}
                      >
                        <LiaEditSolid />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => onDeleteLesson(lesson)}
                      >
                        <LiaTrashAlt />
                      </button>
                    </div>
                  </div>
                </figure>
              ))
            ) : (
              <h3 className={styles.headingNoSkaters}>{lang.noAddedOptions}</h3>
            )}
          </div>
        )}
        <div className={styles.addSkaterBtnContainer}>
          <button className={styles.addBtn} onClick={toggleAddModalHandler}>
            {lang.addOptions}
          </button>
        </div>
      </div>

      <section className={styles.description}>
        <p className={styles.par}>Добавете тип (4-7, 7-9) група.</p>
        <p className={styles.par}>
          Имате възможност да прегледате и редактирате всеки един от записите в
          списъка.
        </p>
      </section>

      {isShownAddModal && <AddLessonOption onClose={toggleAddModalHandler} />}
      {isShownEditModal && (
        <EditLessonOption
          onClose={toggleEditModalHandler}
          lessonData={selectedOptionData}
        />
      )}
      {isShownDeleteModal && (
        <DeleteLessonOption
          onClose={toggleDeleteModalHandler}
          lessonData={selectedOptionData}
        />
      )}
    </>
  );
}

export default ListLessonsOption;
