import styles from './ListAgeOptions.module.css'

import { useState } from 'react';
import {
    LiaEditSolid,
    LiaTrashAlt,
} from "react-icons/lia";

import { useLanguage } from '../../../context/Language.jsx';
import { useToggleModal } from '../../../hooks/useToggleModal.js';

import { useGetOptionsQuery } from '../useGetOptionsQuery.js';

import Spinner from '../../../ui/elements/spinner/Spinner.jsx';
import AddAgeOptions from './AddAgeOptions.jsx';
import EditAgeOption from './EditAgeOption.jsx';
import DeleteAgeOption from './DeleteAgeOption.jsx';

function ListAgeOptions() {
    const [selectedOptionData, setSelectedOptionData] = useState({});

    const [isShownAddAgeModal, toggleAddAgeModalHandler] = useToggleModal();
    const [isShownEditAgeModal, toggleEditAgeModalHandler] = useToggleModal();
    const [isShownDeleteAgeModal, toggleDeleteAgeModalHandler] = useToggleModal();

    const { lang } = useLanguage();
    const { isFetching, data: ageData } = useGetOptionsQuery('age');

    function onEditAge(ageData) {
        setSelectedOptionData(ageData);
        toggleEditAgeModalHandler();
    }

    function onDeleteAge(ageData) {
        setSelectedOptionData(ageData);
        toggleDeleteAgeModalHandler();
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>{lang.ageGroup}</h3>
            {isFetching
                ? (
                    <Spinner />
                ) : (
                    <div className={styles.innerContainer}>
                        {ageData?.length > 0
                            ? (ageData.map((ageOption) => (
                                <figure className={styles.figure} key={ageOption._id}>
                                    <div className={styles.content}>
                                        <div className={styles.ageItem}>
                                            <p className={styles.element}>
                                                <span className={styles.elSpan}>{lang.ageGroup}:</span>
                                                {ageOption.typeGroup}
                                            </p>
                                        </div>
                                        <div className={styles.actionContainer}>
                                            <button className={styles.actionBtn} onClick={() => onEditAge(ageOption)}>
                                                <LiaEditSolid />
                                            </button>
                                            <button className={styles.actionBtn} onClick={() => onDeleteAge(ageOption)}>
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
                <button className={styles.addBtn} onClick={toggleAddAgeModalHandler}>{lang.addOptions}</button>
            </div>

            <section className={styles.description}>
                <p className={styles.par}>
                    Добавете тип (4-7, 7-9) група.
                </p>
                <p className={styles.par}>
                    Имате възможност да прегледате и редактирате всеки един от записите в списъка.
                </p>
            </section>

            {isShownAddAgeModal && <AddAgeOptions onClose={toggleAddAgeModalHandler} />}
            {isShownEditAgeModal && <EditAgeOption onClose={toggleEditAgeModalHandler} ageData={selectedOptionData} />}
            {isShownDeleteAgeModal && <DeleteAgeOption onClose={toggleDeleteAgeModalHandler} ageData={selectedOptionData} />}

        </div>
    );
}

export default ListAgeOptions;
