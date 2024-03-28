import styles from "./ListSubscriptionOptions.module.css";

import { useState } from "react";
import { LiaEditSolid, LiaTrashAlt } from "react-icons/lia";

import { useLanguage } from "../../../context/Language.jsx";
import { useTranslate } from "../../../hooks/useTranslate.js";
import { useToggleModal } from "../../../hooks/useToggleModal.js";

import { useGetOptionsQuery } from "../useGetOptionsQuery.js";

import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import AddSubscriptionOptions from "./AddSubscriptionOptions.jsx";
import EditSubscriptionOption from "./EditSubscriptionOption.jsx";
import DeleteSubscriptionOption from "./DeleteSubscriptionOption.jsx";
import { formatCurrency } from "../../../util/formatCurrency.js";

import { GoIssueOpened } from "react-icons/go";

function ListSubscriptionOptions() {
  const [selectedOptionData, setSelectedOptionData] = useState({});

  const [isShownAddSubscriptionModal, toggleAddSubscriptionModalHandler] =
    useToggleModal();
  const [isShownEditSubscriptionModal, toggleEditSubscriptionModalHandler] =
    useToggleModal();
  const [isShownDeleteSubscriptionModal, toggleDeleteSubscriptionModalHandler] =
    useToggleModal();

  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { isFetching, data: subscriptionData } =
    useGetOptionsQuery("subscription");

  function onEditLevel(subscriptionData) {
    setSelectedOptionData(subscriptionData);
    toggleEditSubscriptionModalHandler();
  }

  function onDeleteLevel(subscriptionData) {
    setSelectedOptionData(subscriptionData);
    toggleDeleteSubscriptionModalHandler();
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.subscription}</h3>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.innerContainer}>
          {subscriptionData?.length > 0 ? (
            subscriptionData.map((subscriptionOption) => (
              <figure className={styles.figure} key={subscriptionOption._id}>
                <div className={styles.content}>
                  <div className={styles.skateItem}>
                    <div className={styles.itemContainer}>
                      <p className={styles.element}>
                        <span className={styles.elSpan}>{lang.type}:</span>
                        {translate(subscriptionOption.typePayment)}
                      </p>
                    </div>
                    <div className={styles.itemContainer}>
                      <p className={styles.element}>
                        <span className={styles.elSpan}>{lang.price}:</span>
                        {formatCurrency(subscriptionOption.price)}
                      </p>
                      <p className={styles.element}>
                        <span className={styles.elSpan}>
                          {lang.subscriptionCount}:
                        </span>
                        {subscriptionOption.subscriptionCount ?? 1}
                      </p>
                    </div>
                  </div>
                  <div className={styles.actionContainer}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onEditLevel(subscriptionOption)}
                    >
                      <LiaEditSolid />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onDeleteLevel(subscriptionOption)}
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
          onClick={toggleAddSubscriptionModalHandler}
        >
          {lang.addOptions}
        </button>
      </div>

      <section className={styles.description}>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_subscription_info_1}
        </p>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_subscription_info_2}
        </p>
        <p className={styles.info}>
          <span>
            <GoIssueOpened />
          </span>
          {lang.a_subscription_info_3}
        </p>
      </section>

      {isShownAddSubscriptionModal && (
        <AddSubscriptionOptions onClose={toggleAddSubscriptionModalHandler} />
      )}
      {isShownEditSubscriptionModal && (
        <EditSubscriptionOption
          onClose={toggleEditSubscriptionModalHandler}
          subscriptionData={selectedOptionData}
        />
      )}
      {isShownDeleteSubscriptionModal && (
        <DeleteSubscriptionOption
          onClose={toggleDeleteSubscriptionModalHandler}
          subscriptionData={selectedOptionData}
        />
      )}
    </div>
  );
}

export default ListSubscriptionOptions;
