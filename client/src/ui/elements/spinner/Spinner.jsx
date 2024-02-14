import Popup from "../popupModal/Popup.jsx";
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div style={{ zIndex: 999 }}>
      <Popup noBackground={true}>
        <img src="/wheel.png" alt="Loading image" className={styles.rotate} />
      </Popup>
    </div>
  );
}

export default Spinner;
