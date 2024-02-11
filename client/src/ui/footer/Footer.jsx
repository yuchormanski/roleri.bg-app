import styles from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <div>Copyrights &copy; - {year}</div>
      <div className={styles.company}>
        <p>Yuchormanski & Yadkov as</p>
        <p className={styles.title}>
          <span>BELEV</span>studio
        </p>
      </div>
    </div>
  );
}

export default Footer;
