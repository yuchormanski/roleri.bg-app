import styles from "./ListSkatesOptions.module.css";

import { useState } from "react";
import { LiaEditSolid, LiaTrashAlt } from "react-icons/lia";

import { useLanguage } from "../../../context/Language.jsx";
import { useToggleModal } from "../../../hooks/useToggleModal.js";

import { useGetOptionsQuery } from "../useGetOptionsQuery.js";

import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import AddSkatesOptions from "./AddSkatesOptions.jsx";
import EditSkatesOption from "./EditSkatesOption.jsx";
import DeleteSkatesOption from "./DeleteSkatesOption.jsx";

import { GoIssueOpened } from "react-icons/go";

function ListSkatesOptions() {
  const [selectedOptionData, setSelectedOptionData] = useState({});

  const [isShownAddSkatesModal, toggleAddSkatesModalHandler] = useToggleModal();
  const [isShownEditSkatesModal, toggleEditSkatesModalHandler] =
    useToggleModal();
  const [isShownDeleteSkatesModal, toggleDeleteSkatesModalHandler] =
    useToggleModal();

  const { lang } = useLanguage();
  const { isFetching, data: skatesData } = useGetOptionsQuery("skates");

  function onEditSkates(skatesData) {
    setSelectedOptionData(skatesData);
    toggleEditSkatesModalHandler();
  }

  function onDeleteSkates(skatesData) {
    setSelectedOptionData(skatesData);
    toggleDeleteSkatesModalHandler();
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.s_skates}</h3>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.innerContainer}>
          {skatesData?.length > 0 ? (
            skatesData.map((skateOption) => (
              <figure className={styles.figure} key={skateOption._id}>
                <div className={styles.content}>
                  <div className={styles.skateItem}>
                    <p className={styles.element}>
                      <span className={styles.elSpan}>{lang.number}</span>
                      {skateOption.size === 0 ? lang.haveOwn : skateOption.size}
                    </p>
                    {skateOption.quantity !== 0 && (
                      <p className={styles.element}>
                        <span className={styles.elSpan}>{lang.quantity}</span>
                        {skateOption.quantity}
                      </p>
                    )}
                  </div>

                  <div className={styles.actionContainer}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onEditSkates(skateOption)}
                    >
                      <LiaEditSolid />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onDeleteSkates(skateOption)}
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
        <button className={styles.addBtn} onClick={toggleAddSkatesModalHandler}>
          {lang.addOptions}
        </button>
      </div>

      <section className={styles.description}>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_skates_info_1}
        </p>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_skates_info_2}
        </p>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_skates_info_3}
        </p>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_skates_info_4}
        </p>
      </section>

      {isShownAddSkatesModal && (
        <AddSkatesOptions onClose={toggleAddSkatesModalHandler} />
      )}
      {isShownEditSkatesModal && (
        <EditSkatesOption
          onClose={toggleEditSkatesModalHandler}
          skatesData={selectedOptionData}
        />
      )}
      {isShownDeleteSkatesModal && (
        <DeleteSkatesOption
          onClose={toggleDeleteSkatesModalHandler}
          skatesData={selectedOptionData}
        />
      )}
    </div>
  );
}

export default ListSkatesOptions;
