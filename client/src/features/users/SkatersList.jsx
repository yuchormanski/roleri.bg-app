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
import AddSkater from "./AddSkater.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useState } from "react";
import EditSkater from "./EditSkater.jsx";
import DeleteSkater from "./DeleteSkater.jsx";

function SkatersList() {
  const [selectedSkaterData, setSelectedSkaterData] = useState({});

  const [isShownAddSkaterModal, toggleAddSkaterModalHandler] = useToggleModal();
  const [isShownEditSkaterModal, toggleEditSkaterModalHandler] = useToggleModal();
  const [isShownDeleteSkaterModal, toggleDeleteSkaterModalHandler] = useToggleModal();

  const { lang } = useLanguage();
  const { isLoading, isError, error, data: skaters } = useGetSkatersQuery();

  if (isError) {
    toast.error(error.message);
  }

  function onEditSkater(skaterData) {
    setSelectedSkaterData(skaterData);
    toggleEditSkaterModalHandler();
  }

  function onDeleteSkater(skaterData) {
    setSelectedSkaterData(skaterData);
    toggleDeleteSkaterModalHandler();
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.skaters}</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.skatersContainer}>
          {skaters.length > 0
            ? (skaters.map((skater) => (
              <figure className={styles.figure} key={skater._id}>
                <header className={styles.header}>
                  <h3
                    className={styles.figureHeading}
                  >{`${skater.firstName} ${skater.lastName}`}</h3>
                  <div className={styles.actionContainer}>
                    <button className={styles.actionBtn}>
                      <LiaIdCard />
                    </button>
                    <button className={styles.actionBtn} onClick={() => onEditSkater(skater)}>
                      <LiaUserEditSolid />
                    </button>
                    <button className={styles.actionBtn} onClick={() => onDeleteSkater(skater)}>
                      <LiaTrashAlt />
                    </button>
                  </div>
                </header>
                <div className={styles.content}>
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.gender}: </span>
                    {skater.gender}
                  </p>
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.s_additionalRequirements}: </span>
                    {skater.additionalRequirements ? skater.additionalRequirements : 'No'}
                  </p>
                  {/* 
                  CHECK WHERE TO VISUALIZED HISTORY
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.s_additionalRequirements}: </span>
                    {skater.courseHistory}
                  </p> */}
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.s_skateSize}: </span>
                    {skater?.skatesSize?.size}
                  </p>
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.level}: </span>
                    {skater?.groupLevel?.typeGroup}
                  </p>
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.s_protections}: </span>
                    {skater?.protection?.size}
                  </p>
                  <p className={styles.element}>
                    <span className={styles.elSpan}>{lang.age}: </span>
                    {skater.age}
                  </p>
                </div>
              </figure>
            ))
            ) : (
              <h2 className={styles.headingNoSkaters}>{lang.noAddedSkaters}</h2>
            )}
        </div>
      )}

      <div className={styles.addSkaterBtnContainer}>
        <button className={styles.addBtn} onClick={toggleAddSkaterModalHandler}>{lang.addSkater}</button>
      </div>

      <section className={styles.description}>
        <p className={styles.par}>
          Кънкьорите, които добавите и виждате тук ще са достъпни от страницата
          за записване на уроци. Необходимото оборудване ще е автоматично
          включено към избраната тренировка.
        </p>
        <p className={styles.par}>
          Имате възможност да прегледате и редактирате всеки един от кънкьорите
          в списъка.
        </p>
      </section>

      {isShownAddSkaterModal && <AddSkater onClose={toggleAddSkaterModalHandler} />}
      {isShownEditSkaterModal && <EditSkater skaterData={selectedSkaterData} onClose={toggleEditSkaterModalHandler} />}
      {isShownDeleteSkaterModal && <DeleteSkater skaterData={selectedSkaterData} onClose={toggleDeleteSkaterModalHandler} />}

    </div>
  );
}

export default SkatersList;
