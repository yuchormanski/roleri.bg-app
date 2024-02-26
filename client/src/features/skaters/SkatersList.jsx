import styles from "./SkatersList.module.css";

import toast from "react-hot-toast";
import { TbUserEdit } from "react-icons/tb";
import {
  LiaUserEditSolid,
  LiaTrashAlt,
  LiaGrin,
  LiaIdCard,
} from "react-icons/lia";

import { useLanguage } from "../../context/Language.jsx";
import { useToggleModal } from "../../hooks/useToggleModal.js";
import { useGetSkatersQuery } from "./useGetSkatersQuery.js";
// import AddSkater from "./AddSkater.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useState } from "react";
import EditSkater from "./EditSkater.jsx";
import DeleteSkater from "./DeleteSkater.jsx";
import AddSkater from "./AddSkater.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";
import GetSkater from "./GetSkater.jsx";

function SkatersList() {
  const [selectedSkaterData, setSelectedSkaterData] = useState({});

  const [isShownAddSkaterModal, toggleAddSkaterModalHandler] = useToggleModal();
  const [isShownEditSkaterModal, toggleEditSkaterModalHandler] =
    useToggleModal();
  const [isShownDeleteSkaterModal, toggleDeleteSkaterModalHandler] =
    useToggleModal();
  const [isShownGetSkaterModal, toggleGetSkaterModalHandler] = useToggleModal();

  const { lang, index } = useLanguage();
  const { translatePhrase } = useTranslate();
  const { isFetching, isError, error, data: skaters } = useGetSkatersQuery();

  // index е 0 или 1. 0 е falsy
  // const baseLang = index ? "typeGroupEn" : "typeGroup";

  if (isError) {
    toast.error(error.message);
  }

  function onGetSkater(skaterData) {
    console.log(skaterData);
    setSelectedSkaterData(skaterData);
    toggleGetSkaterModalHandler();
  }
  function onEditSkater(skaterData) {
    setSelectedSkaterData(skaterData);
    toggleEditSkaterModalHandler();
  }

  function onDeleteSkater(skaterData) {
    setSelectedSkaterData(skaterData);
    toggleDeleteSkaterModalHandler();
  }

  function genderHandler(gender) {
    return gender === "male" ? lang.s_genderMale : lang.s_genderFemale;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.skaters}</h3>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.skatersContainer}>
          {skaters.length > 0 ? (
            skaters.map((skater) => (
              <figure className={styles.figure} key={skater._id}>
                <header className={styles.header}>
                  <h3
                    className={styles.figureHeading}
                  >{`${skater.firstName} ${skater.lastName}`}</h3>
                  <div className={styles.actionContainer}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onGetSkater(skater)}
                    >
                      <LiaIdCard />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onEditSkater(skater)}
                    >
                      <LiaUserEditSolid />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onDeleteSkater(skater)}
                    >
                      <LiaTrashAlt />
                    </button>
                  </div>
                </header>

                {/* <div className={styles.content}>
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.gender}: </span>
                    {genderHandler(skater.gender)}
                  </p>

                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.age}: </span>
                    {skater.age}
                  </p>

                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.s_skates}: </span>
                    {skater?.skatesSize?.size}
                  </p>

                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.level}: </span>
                    {translatePhrase(skater?.groupLevel?.typeGroup)}
                  </p>

                  <p className={styles.element}>
                    <span className={styles.elSpan}>
                      {lang.s_protections}:{" "}
                    </span>
                    {skater?.protection?.size}
                  </p>

                  <p className={`${styles.element} ${styles.additional}`}>
                    <span className={styles.elSpan}>
                      {lang.s_requirements}:{" "}
                    </span>
                    {skater.additionalRequirements
                      ? skater.additionalRequirements
                      : index
                      ? "No"
                      : "Няма"}
                  </p>
                </div> */}
              </figure>
            ))
          ) : (
            <h2 className={styles.headingNoSkaters}>{lang.noAddedSkaters}</h2>
          )}
        </div>
      )}

      <div className={styles.addSkaterBtnContainer}>
        <button className={styles.addBtn} onClick={toggleAddSkaterModalHandler}>
          {lang.addSkater}
        </button>
      </div>

      <section className={styles.description}>
        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.s_list_1}
        </p>

        <p className={styles.info}>
          <span>&#9737;</span>
          {lang.s_list_2}
        </p>
      </section>

      {isShownAddSkaterModal && (
        <AddSkater onClose={toggleAddSkaterModalHandler} />
      )}
      {isShownGetSkaterModal && (
        <GetSkater
          onClose={toggleGetSkaterModalHandler}
          skaterData={selectedSkaterData}
        />
      )}
      {isShownEditSkaterModal && (
        <EditSkater
          skaterData={selectedSkaterData}
          onClose={toggleEditSkaterModalHandler}
        />
      )}
      {isShownDeleteSkaterModal && (
        <DeleteSkater
          skaterData={selectedSkaterData}
          onClose={toggleDeleteSkaterModalHandler}
        />
      )}
    </div>
  );
}

export default SkatersList;
