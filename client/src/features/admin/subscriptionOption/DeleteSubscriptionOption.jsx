import styles from "./DeleteSubscriptionOption.module.css"

import { GoX } from "react-icons/go";

import { useLanguage } from "../../../context/Language.jsx";
import { useTranslate } from "../../../hooks/useTranslate.js";
import { useDeleteOptionsQuery } from "../useDeleteOptionsQuery.js";

import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";

function DeleteSubscriptionOption({ onClose, subscriptionData }) {
    const { lang } = useLanguage();
    const { translatePhrase: translate } = useTranslate();

    const { mutate, isPending } = useDeleteOptionsQuery("subscription");

    function onDelete() {
        mutate(subscriptionData);
        onClose();
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
                    <span>{translate(subscriptionData.typePayment)}?</span>
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

export default DeleteSubscriptionOption;