import styles from './ListLevelOptions.module.css'

import { useState } from 'react';
import {
    LiaEditSolid,
    LiaTrashAlt,
} from "react-icons/lia";

import { useLanguage } from '../../../context/Language.jsx';
import { useToggleModal } from '../../../hooks/useToggleModal.js';

import { useGetOptionsQuery } from '../useGetOptionsQuery.js';

import Spinner from '../../../ui/elements/spinner/Spinner.jsx';
import AddLevelOptions from './AddLevelOptions.jsx';
import EditLevelOption from './EditLevelOption.jsx';
import DeleteLevelOption from './DeleteLevelOption.jsx';


function ListLevelOptions() {
    const [selectedOptionData, setSelectedOptionData] = useState({});

    const [isShownAddLevelModal, toggleAddLevelModalHandler] = useToggleModal();
    const [isShownEditLevelModal, toggleEditLevelModalHandler] = useToggleModal();
    const [isShownDeleteLevelModal, toggleDeleteLevelModalHandler] = useToggleModal();

    const { lang } = useLanguage();
    const { isLoading, data: levelData } = useGetOptionsQuery('level');

    function onEditLevel(levelData) {
        setSelectedOptionData(levelData);
        toggleEditLevelModalHandler();
    }

    function onDeleteLevel(levelData) {
        setSelectedOptionData(levelData);
        toggleDeleteLevelModalHandler();
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>{lang.level}</h3>
            {isLoading
                ? (
                    <Spinner />
                ) : (
                    <div className={styles.skatersContainer}>
                        {levelData?.length > 0
                            ? (levelData.map((levelOption) => (
                                <figure className={styles.figure} key={levelOption._id}>
                                    <header className={styles.header}>
                                        <h3
                                            className={styles.figureHeading}
                                        >{`${lang.level} - ${levelOption.typeGroup}`}
                                        </h3>
                                        <div className={styles.actionContainer}>
                                            <button className={styles.actionBtn} onClick={() => onEditLevel(levelOption)}>
                                                <LiaEditSolid />
                                            </button>
                                            <button className={styles.actionBtn} onClick={() => onDeleteLevel(levelOption)}>
                                                <LiaTrashAlt />
                                            </button>
                                        </div>
                                    </header>
                                    <div className={styles.content}>
                                        <p className={styles.element}>
                                            <span className={styles.elSpan}>{lang.description}: </span>
                                            {levelOption.description}
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
                <button className={styles.addBtn} onClick={toggleAddLevelModalHandler}>{lang.addOptions}</button>
            </div>

            <section className={styles.description}>
                <p className={styles.par}>
                    Добавете тип (начинаещи, напреднали) група и описание.
                </p>
                <p className={styles.par}>
                    Имате възможност да прегледате и редактирате всеки един от записите в списъка.
                </p>
            </section>

            {isShownAddLevelModal && <AddLevelOptions onClose={toggleAddLevelModalHandler} />}
            {isShownEditLevelModal && <EditLevelOption onClose={toggleEditLevelModalHandler} levelData={selectedOptionData} />}
            {isShownDeleteLevelModal && <DeleteLevelOption onClose={toggleDeleteLevelModalHandler} levelData={selectedOptionData} />}

        </div>
    );
}

export default ListLevelOptions;
