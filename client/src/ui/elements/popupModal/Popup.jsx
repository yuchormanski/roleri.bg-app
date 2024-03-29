import styles from "./Popup.module.css";
import { CgClose } from "react-icons/cg";

function Popup({
  children,
  onClose,
  noBackground = false,
  backgroundClick,
  userWidth = null,
  userHeight = false,
}) {
  return (
    <div className={styles.modalBg} onClick={backgroundClick ? onClose : null}>
      <figure
        className={`${styles.fullInfo} ${
          noBackground ? styles.noBackground : ""
        } ${userWidth && styles[userWidth]} 
        ${userHeight && styles["userHeight"]}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button className={styles.closeIcon} onClick={onClose}>
          <ion-icon name="close-outline"></ion-icon>
          <CgClose />
        </button> */}
        {children}
      </figure>
    </div>
  );
}

export default Popup;
