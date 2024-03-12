import styles from "./DeleteUser.module.css";
import { GoX } from "react-icons/go";
import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import Button from "../../../ui/elements/button/Button.jsx";
import { useLanguage } from "../../../context/Language.jsx";
import { useMoveBack } from "../../../hooks/useMoveBack.js";

function DeleteUser({ selectedOption, onClose }) {
  const { lang } = useLanguage();
  const { redirectTo } = useMoveBack();

  function deleteUser() {
    if (
      window.confirm("You can't undone that! If you understand that - proceed")
    ) {
      console.log("done");
      redirectTo("/settings");
    }
  }
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
            <div className={styles.confirmContainer}>
              You&apos;re about to delete{" "}
              <h3 className={styles.figureHeading}>
                {`${selectedOption.firstName} ${selectedOption.lastName}`}
              </h3>
              <p>Are you sure?</p>
            </div>
          </header>

          <div style={{ marginLeft: "auto" }}>
            <Button type="primary" onClick={deleteUser}>
              Delete
            </Button>
          </div>
        </figure>
      </div>
    </Popup>
  );
}

export default DeleteUser;
