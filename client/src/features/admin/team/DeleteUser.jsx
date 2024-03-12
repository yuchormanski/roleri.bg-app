import styles from "./DeleteUser.module.css";
import { GoX } from "react-icons/go";
import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import { useLanguage } from "../../../context/Language.jsx";

function DeleteUser({ selectedOption, onClose }) {
  const { lang } = useLanguage();
  return (
    <Popup onClose={onClose} backgroundClick={false}>
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>

        <figure className={styles.figure}>
          <header className={styles.header}>
            <div>You&apos;re about to delete </div>
            <h3 className={styles.figureHeading}>
              {`${selectedOption.firstName} ${selectedOption.lastName}`}
            </h3>
          </header>

          <div style={{ marginLeft: "auto" }}>
            <Button type="primary">Delete</Button>
          </div>
        </figure>
      </div>
    </Popup>
  );
}

export default DeleteUser;
