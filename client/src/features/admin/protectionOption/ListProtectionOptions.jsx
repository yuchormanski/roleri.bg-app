import styles from "./ListProtectionOptions.module.css";

import { useState } from "react";
import { LiaEditSolid, LiaTrashAlt } from "react-icons/lia";

import { useLanguage } from "../../../context/Language.jsx";
import { useToggleModal } from "../../../hooks/useToggleModal.js";

import { useGetOptionsQuery } from "../useGetOptionsQuery.js";

import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import AddProtectionOptions from "./AddProtectionOptions.jsx";
import EditProtectionOption from "./EditProtectionOption.jsx";
import DeleteProtectionOption from "./DeleteProtectionOption.jsx";

import { GoIssueOpened } from "react-icons/go";

function ListProtectionOptions() {
  const [selectedOptionData, setSelectedOptionData] = useState({});

  const [isShownAddProtectionModal, toggleAddProtectionModalHandler] =
    useToggleModal();
  const [isShownEditProtectionModal, toggleEditProtectionModalHandler] =
    useToggleModal();
  const [isShownDeleteProtectionModal, toggleDeleteProtectionModalHandler] =
    useToggleModal();

  const { lang } = useLanguage();
  const { isFetching, data: protectionData } = useGetOptionsQuery("protection");

  function onEditProtection(protectionData) {
    setSelectedOptionData(protectionData);
    toggleEditProtectionModalHandler();
  }

  function onDeleteProtection(protectionData) {
    setSelectedOptionData(protectionData);
    toggleDeleteProtectionModalHandler();
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.s_protections}</h3>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.innerContainer}>
          {protectionData?.length > 0 ? (
            protectionData.map((protectionOption) => (
              <figure className={styles.figure} key={protectionOption._id}>
                <div className={styles.content}>
                  <div className={styles.protectionItem}>
                    <p className={styles.element}>
                      <span className={styles.elSpan}>
                        {lang.s_protections}:
                      </span>
                      {Number(protectionOption.size) === 0
                        ? lang.haveOwn
                        : protectionOption.size}
                    </p>
                    {Number(protectionOption.size) === 0 ? null : (
                      <p className={styles.element}>
                        <span className={styles.elSpan}>{lang.quantity}:</span>
                        {protectionOption.quantity}
                      </p>
                    )}
                  </div>

                  <div className={styles.actionContainer}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onEditProtection(protectionOption)}
                    >
                      <LiaEditSolid />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onDeleteProtection(protectionOption)}
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
        <button
          className={styles.addBtn}
          onClick={toggleAddProtectionModalHandler}
        >
          {lang.addOptions}
        </button>
      </div>
      <section className={styles.description}>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_protection_info_1}
        </p>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_protection_info_3}
        </p>

        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_protection_info_2}
        </p>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_skates_info_4}
        </p>
      </section>

      {isShownAddProtectionModal && (
        <AddProtectionOptions onClose={toggleAddProtectionModalHandler} />
      )}
      {isShownEditProtectionModal && (
        <EditProtectionOption
          onClose={toggleEditProtectionModalHandler}
          protectionData={selectedOptionData}
        />
      )}
      {isShownDeleteProtectionModal && (
        <DeleteProtectionOption
          onClose={toggleDeleteProtectionModalHandler}
          protectionData={selectedOptionData}
        />
      )}
    </div>
  );
}

export default ListProtectionOptions;
