import styles from "./Popup.module.css";

function Popup({
  children,
  onClose,
  noBackground = false,
  backgroundClick,
  userWidth = null,
}) {
  return (
    <div className={styles.modalBg} onClick={backgroundClick ? onClose : null}>
      <figure
        className={`${styles.fullInfo} ${noBackground && styles.noBackground} ${
          userWidth && styles[userWidth]
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeIcon} onClick={onClose}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
        {children}
      </figure>
    </div>
  );
}

export default Popup;
