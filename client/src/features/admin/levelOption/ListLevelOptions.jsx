import styles from "./ListLevelOptions.module.css";

import { useState } from "react";
import { LiaEditSolid, LiaTrashAlt } from "react-icons/lia";

import { useLanguage } from "../../../context/Language.jsx";
import { useToggleModal } from "../../../hooks/useToggleModal.js";

import { useGetOptionsQuery } from "../useGetOptionsQuery.js";

import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import AddLevelOptions from "./AddLevelOptions.jsx";
import EditLevelOption from "./EditLevelOption.jsx";
import DeleteLevelOption from "./DeleteLevelOption.jsx";
import { useTranslate } from "../../../hooks/useTranslate.js";

function ListLevelOptions() {
  const [selectedOptionData, setSelectedOptionData] = useState({});

  const [isShownAddLevelModal, toggleAddLevelModalHandler] = useToggleModal();
  const [isShownEditLevelModal, toggleEditLevelModalHandler] = useToggleModal();
  const [isShownDeleteLevelModal, toggleDeleteLevelModalHandler] =
    useToggleModal();

  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { isFetching, data: levelData } = useGetOptionsQuery("level");

  function onEditLevel(levelData) {
    setSelectedOptionData(levelData);
    toggleEditLevelModalHandler();
  }

  function onDeleteLevel(levelData) {
    setSelectedOptionData(levelData);
    toggleDeleteLevelModalHandler();
  }

  function textSplitter(data) {
    const text = translate(data).slice(0, 5) + " ...";
    return text;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.level}</h3>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.innerContainer}>
          {levelData?.length > 0 ? (
            levelData.map((levelOption) => (
              <figure className={styles.figure} key={levelOption._id}>
                <div className={styles.content}>
                  <div className={styles.skateItem}>
                    <p className={styles.element}>
                      <span className={styles.elSpan}>{lang.type}:</span>
                      {translate(levelOption.typeGroup)}
                    </p>
                    {/* <p className={styles.element}>
                      <span className={styles.elSpan}>{lang.description}:</span>
                      {textSplitter(levelOption.description)}
                    </p> */}
                  </div>

                  <div className={styles.actionContainer}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onEditLevel(levelOption)}
                    >
                      <LiaEditSolid />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onDeleteLevel(levelOption)}
                    >
                      <LiaTrashAlt />
                    </button>
                  </div>
                </div>
              </figure>
            ))
          ) : (
            <h2 className={styles.headingNoSkaters}>{lang.noAddedOptions}</h2>
          )}
        </div>
      )}
      <div className={styles.addSkaterBtnContainer}>
        <button className={styles.addBtn} onClick={toggleAddLevelModalHandler}>
          {lang.addOptions}
        </button>
      </div>

      <section className={styles.description}>
        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.a_list_level_1}
        </p>

        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.a_list_level_2}
        </p>
      </section>

      {isShownAddLevelModal && (
        <AddLevelOptions onClose={toggleAddLevelModalHandler} />
      )}
      {isShownEditLevelModal && (
        <EditLevelOption
          onClose={toggleEditLevelModalHandler}
          levelData={selectedOptionData}
        />
      )}
      {isShownDeleteLevelModal && (
        <DeleteLevelOption
          onClose={toggleDeleteLevelModalHandler}
          levelData={selectedOptionData}
        />
      )}
    </div>
  );
}

export default ListLevelOptions;
