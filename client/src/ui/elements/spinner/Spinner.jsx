import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerBlock}>
      <img src="/wheel2.png" alt="Loading image" className={styles.rotate} />
    </div>
  );
}

export default Spinner;
