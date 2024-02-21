import styles from "./DeleteSkater.module.css"

import { GoX } from "react-icons/go";
import toast from "react-hot-toast";

import { useLanguage } from "../../context/Language.jsx";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

import { useDeleteSkaterQuery } from "./useDeleteSkaterQuery.js";

function DeleteSkater({ onClose, skaterData }) {
    const { lang } = useLanguage();

    const { deleteSkaterMutation } = useDeleteSkaterQuery();

    async function onDelete() {
        try {
            await deleteSkaterMutation.mutateAsync(skaterData);
            onClose();

        } catch (error) {
            toast.error(error.message);
            console.error("Delete skater error:", error);
        }
    }

    return (
        <Popup onClose={onClose} backgroundClick={false}>
            {deleteSkaterMutation.isPending && <Spinner />}
            <div className={styles.container}>
                <div className={styles.closeBtn}>
                    <button onClick={onClose} className={styles.closeIcon}><GoX /></button>
                </div>
                <h2 className={styles.heading}>{lang.deleteSkater}</h2>

                <p className={styles.deleteInfo}
                >
                    {lang.deleteSkaterQuestion}
                    <span>{skaterData.firstName} {skaterData.lastName}?</span>
                </p>

                <div className={styles.btnContainer}>
                    <div style={{ marginLeft: "auto" }}>
                        <Button type={"primary"} onClick={onDelete}>{lang.deleteSkater}</Button>
                    </div>
                </div>
            </div>
        </Popup>

    );
}

export default DeleteSkater;