import styles from "./DeleteAgeOption.module.css"

import { GoX } from "react-icons/go";

import { useLanguage } from "../../../context/Language.jsx";
import { useDeleteOptionsQuery } from "../useDeleteOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function DeleteAgeOption({ onClose, ageData }) {
    const { lang } = useLanguage();

    const { mutateAsync, isPending } = useDeleteOptionsQuery("age");

    async function onDelete() {
        try {
            await mutateAsync(ageData)
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Popup onClose={onClose} backgroundClick={true}>
            {isPending && <Spinner />}
            <div className={styles.container}>
                <div className={styles.closeBtn}>
                    <button onClick={onClose} className={styles.closeIcon}><GoX /></button>
                </div>
                <h2 className={styles.heading}>{lang.deleteOptions}</h2>

                <p className={styles.deleteInfo}
                >
                    {lang.deleteSkaterQuestion}
                    <span>{ageData.typeGroup}?</span>
                </p>

                <div className={styles.btnContainer}>
                    <div style={{ marginLeft: "auto" }}>
                        <Button type={"primary"} onClick={onDelete}>{lang.deleteOptions}</Button>
                    </div>
                </div>
            </div>
        </Popup>

    );
}

export default DeleteAgeOption;