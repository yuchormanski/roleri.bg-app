import styles from "./History.module.css";

import { useLanguage } from "../../context/Language.jsx";

function History() {
  const { lang } = useLanguage();

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.history}</h3>
      <p>History</p>
    </div>
  );
}

export default History;
