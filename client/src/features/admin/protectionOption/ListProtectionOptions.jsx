import styles from './ListProtectionOptions.module.css'

import { useState } from 'react';
import {
    LiaEditSolid,
    LiaTrashAlt,
} from "react-icons/lia";

import { useLanguage } from '../../../context/Language.jsx';
import { useToggleModal } from '../../../hooks/useToggleModal.js';

import { useGetOptionsQuery } from '../useGetOptionsQuery.js';

import Spinner from '../../../ui/elements/spinner/Spinner.jsx';
import AddProtectionOptions from './AddProtectionOptions.jsx';
import EditProtectionOption from './EditProtectionOption.jsx';
import DeleteProtectionOption from './DeleteProtectionOption.jsx';

function ListProtectionOptions() {
    const [selectedOptionData, setSelectedOptionData] = useState({});

    const [isShownAddProtectionModal, toggleAddProtectionModalHandler] = useToggleModal();
    const [isShownEditProtectionModal, toggleEditProtectionModalHandler] = useToggleModal();
    const [isShownDeleteProtectionModal, toggleDeleteProtectionModalHandler] = useToggleModal();

    const { lang } = useLanguage();
    const { isLoading, data: protectionData } = useGetOptionsQuery('protection');

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
            {isLoading
                ? (
                    <Spinner />
                ) : (
                    <div className={styles.skatersContainer}>
                        {protectionData?.length > 0
                            ? (protectionData.map((protectionOption) => (
                                <figure className={styles.figure} key={protectionOption._id}>
                                    <header className={styles.header}>
                                        <h3
                                            className={styles.figureHeading}
                                        >{`${lang.s_protections} - ${protectionOption.size}`}
                                        </h3>
                                        <div className={styles.actionContainer}>
                                            <button className={styles.actionBtn} onClick={() => onEditProtection(protectionOption)}>
                                                <LiaEditSolid />
                                            </button>
                                            <button className={styles.actionBtn} onClick={() => onDeleteProtection(protectionOption)}>
                                                <LiaTrashAlt />
                                            </button>
                                        </div>
                                    </header>
                                    <div className={styles.content}>
                                        <p className={styles.element}>
                                            <span className={styles.elSpan}>{lang.quantity}: </span>
                                            {protectionOption.quantity}
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
                <button className={styles.addBtn} onClick={toggleAddProtectionModalHandler}>{lang.addOptions}</button>
            </div>

            <section className={styles.description}>
                <p className={styles.par}>
                    Добавете номер и налично количество за всяка от защитната екипировка.
                </p>
                <p className={styles.par}>
                    Имате възможност да прегледате и редактирате всеки един от записите в списъка.
                </p>
            </section>

            {isShownAddProtectionModal && <AddProtectionOptions onClose={toggleAddProtectionModalHandler} />}
            {isShownEditProtectionModal && <EditProtectionOption onClose={toggleEditProtectionModalHandler} protectionData={selectedOptionData} />}
            {isShownDeleteProtectionModal && <DeleteProtectionOption onClose={toggleDeleteProtectionModalHandler} protectionData={selectedOptionData} />}

        </div>
    );
}

export default ListProtectionOptions;
