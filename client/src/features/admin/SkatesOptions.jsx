import styles from './SkatesOptions.module.css'

import { useState } from 'react';
import {
  LiaEditSolid,
  LiaTrashAlt,
} from "react-icons/lia";
import { useQueryClient } from '@tanstack/react-query';

import { useLanguage } from '../../context/Language.jsx';
import { useToggleModal } from '../../hooks/useToggleModal.js';
import AddSkatesOptions from './AddSkatesOptions.jsx';

function SkatesOptions() {
  const [selectedSkaterData, setSelectedSkaterData] = useState({});

  const queryClient = useQueryClient();
  const [skatesData, setSkatesData] = useState(() => {
    const queryOptionsData = queryClient.getQueryData(["skaters_options_data"]);
    return queryOptionsData['skatesData'];
  });

  const [isShownAddSkatesModal, toggleAddSkatesModalHandler] = useToggleModal();
  const [isShownEditSkatesModal, toggleEditSkatesModalHandler] = useToggleModal();
  const [isShownDeleteSkatesModal, toggleDeleteSkatesModalHandler] = useToggleModal();

  const { lang } = useLanguage();

  function onAddSkates() {
    const queryOptionsData = queryClient.getQueryData(["skaters_options_data"]);
    setSkatesData(queryOptionsData['skatesData']);
  }

  function onEditSkates(skatesData) {
    setSelectedSkaterData(skatesData);
  }

  function onDeleteSkates(skatesData) {
    setSelectedSkaterData(skatesData);
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.skaterSkateSize}</h3>

      <div className={styles.skatersContainer}>
        {skatesData?.length > 0
          ? (skatesData.map((skateOption) => (
            <figure className={styles.figure} key={skateOption._id}>
              <header className={styles.header}>
                <h3
                  className={styles.figureHeading}
                >{`${lang.skaterSkateSize} - ${skateOption.size}`}
                </h3>
                <div className={styles.actionContainer}>
                  <button className={styles.actionBtn} onClick={() => onEditSkates(skateOption)}>
                    <LiaEditSolid />
                  </button>
                  <button className={styles.actionBtn} onClick={() => onDeleteSkates(skateOption)}>
                    <LiaTrashAlt />
                  </button>
                </div>
              </header>
              <div className={styles.content}>
                <p className={styles.element}>
                  <span className={styles.elSpan}>{lang.quantity}: </span>
                  {skateOption.quantity}
                </p>
              </div>
            </figure>
          ))
          ) : (
            <h2 className={styles.headingNoSkaters}>{lang.noAddedSkatesOptions}</h2>
          )}
      </div>

      <div className={styles.addSkaterBtnContainer}>
        <button className={styles.addBtn} onClick={toggleAddSkatesModalHandler}>{lang.addSkatesOptions}</button>
      </div>

      <section className={styles.description}>
        <p className={styles.par}>
          Добавете номер и налично количество за всеки от ролерите
        </p>
        <p className={styles.par}>
          Имате възможност да прегледате и редактирате всеки един от ролерите в списъка.
        </p>
      </section>

      {isShownAddSkatesModal && <AddSkatesOptions onClose={toggleAddSkatesModalHandler} refreshState={onAddSkates} />}

    </div>
  );
}

export default SkatesOptions;
