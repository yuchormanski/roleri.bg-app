import styles from './ListSubscriptionOptions.module.css'

import { useState } from 'react';
import {
    LiaEditSolid,
    LiaTrashAlt,
} from "react-icons/lia";

import { useLanguage } from '../../../context/Language.jsx';
import { useToggleModal } from '../../../hooks/useToggleModal.js';

import { useGetOptionsQuery } from '../useGetOptionsQuery.js';

import Spinner from '../../../ui/elements/spinner/Spinner.jsx';
import AddSubscriptionOptions from './AddSubscriptionOptions.jsx';
import EditSubscriptionOption from './EditSubscriptionOption.jsx';
import DeleteSubscriptionOption from './DeleteSubscriptionOption.jsx';

function ListSubscriptionOptions() {
    const [selectedOptionData, setSelectedOptionData] = useState({});

    const [isShownAddSubscriptionModal, toggleAddSubscriptionModalHandler] = useToggleModal();
    const [isShownEditSubscriptionModal, toggleEditSubscriptionModalHandler] = useToggleModal();
    const [isShownDeleteSubscriptionModal, toggleDeleteSubscriptionModalHandler] = useToggleModal();

    const { lang } = useLanguage();
    const { isLoading, data: subscriptionData } = useGetOptionsQuery('subscription');

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
            {isLoading
                ? (
                    <Spinner />
                ) : (
                    <div className={styles.skatersContainer}>
                        {subscriptionData?.length > 0
                            ? (subscriptionData.map((subscriptionOption) => (
                                <figure className={styles.figure} key={subscriptionOption._id}>
                                    <header className={styles.header}>
                                        <h3
                                            className={styles.figureHeading}
                                        >{`${lang.subscription} - ${subscriptionOption.typePayment}`}
                                        </h3>
                                        <div className={styles.actionContainer}>
                                            <button className={styles.actionBtn} onClick={() => onEditLevel(subscriptionOption)}>
                                                <LiaEditSolid />
                                            </button>
                                            <button className={styles.actionBtn} onClick={() => onDeleteLevel(subscriptionOption)}>
                                                <LiaTrashAlt />
                                            </button>
                                        </div>
                                    </header>
                                    <div className={styles.content}>
                                        <p className={styles.element}>
                                            <span className={styles.elSpan}>{lang.price}: </span>
                                            {subscriptionOption.price}
                                        </p>
                                    </div>
                                </figure>
                            ))
                            ) : (
                                <h2 className={styles.headingNoSkaters}>{lang.noAddedOptions}</h2>
                            )}
                    </div>
                )}
            <div className={styles.addSkaterBtnContainer}>
                <button className={styles.addBtn} onClick={toggleAddSubscriptionModalHandler}>{lang.addOptions}</button>
            </div>

            <section className={styles.description}>
                <p className={styles.par}>
                    Добавете тип плащане (Абонамент, единичен урок) и цена.
                </p>
                <p className={styles.par}>
                    Имате възможност да прегледате и редактирате всеки един от записите в списъка.
                </p>
            </section>

            {isShownAddSubscriptionModal && <AddSubscriptionOptions onClose={toggleAddSubscriptionModalHandler} />}
            {isShownEditSubscriptionModal && <EditSubscriptionOption onClose={toggleEditSubscriptionModalHandler} subscriptionData={selectedOptionData} />}
            {isShownDeleteSubscriptionModal && <DeleteSubscriptionOption onClose={toggleDeleteSubscriptionModalHandler} subscriptionData={selectedOptionData} />}

        </div>
    );
}

export default ListSubscriptionOptions;
