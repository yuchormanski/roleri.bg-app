import styles from './ListSkatesOptions.module.css'

import { useState } from 'react';
import {
    LiaEditSolid,
    LiaTrashAlt,
} from "react-icons/lia";

import { useLanguage } from '../../../context/Language.jsx';
import { useToggleModal } from '../../../hooks/useToggleModal.js';

import { useGetOptionsQuery } from '../useGetOptionsQuery.js';

import Spinner from '../../../ui/elements/spinner/Spinner.jsx';
import AddSkatesOptions from './AddSkatesOptions.jsx';
import EditSkatesOption from './EditSkatesOption.jsx';
import DeleteSkatesOption from './DeleteSkatesOption.jsx';

function ListSkatesOptions() {
    const [selectedOptionData, setSelectedOptionData] = useState({});

    const [isShownAddSkatesModal, toggleAddSkatesModalHandler] = useToggleModal();
    const [isShownEditSkatesModal, toggleEditSkatesModalHandler] = useToggleModal();
    const [isShownDeleteSkatesModal, toggleDeleteSkatesModalHandler] = useToggleModal();

    const { lang } = useLanguage();
    const { isLoading, data: skatesData } = useGetOptionsQuery('skates');

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
            <h3 className={styles.heading}>{lang.s_skateSize}</h3>
            {isLoading
                ? (
                    <Spinner />
                ) : (
                    <div className={styles.skatersContainer}>
                        {skatesData?.length > 0
                            ? (skatesData.map((skateOption) => (
                                <figure className={styles.figure} key={skateOption._id}>
                                    <header className={styles.header}>
                                        <h3
                                            className={styles.figureHeading}
                                        >{`${lang.s_skateSize} - ${skateOption.size}`}
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
                                <h2 className={styles.headingNoSkaters}>{lang.noAddedOptions}</h2>
                            )}
                    </div>
                )}
            <div className={styles.addSkaterBtnContainer}>
                <button className={styles.addBtn} onClick={toggleAddSkatesModalHandler}>{lang.addOptions}</button>
            </div>

            <section className={styles.description}>
                <p className={styles.par}>
                    Добавете номер и налично количество към кънките
                </p>
                <p className={styles.par}>
                    Имате възможност да прегледате и редактирате всеки един от записите в списъка.
                </p>
            </section>

            {isShownAddSkatesModal && <AddSkatesOptions onClose={toggleAddSkatesModalHandler} />}
            {isShownEditSkatesModal && <EditSkatesOption onClose={toggleEditSkatesModalHandler} skatesData={selectedOptionData} />}
            {isShownDeleteSkatesModal && <DeleteSkatesOption onClose={toggleDeleteSkatesModalHandler} skatesData={selectedOptionData} />}

        </div>
    );
}

export default ListSkatesOptions;
