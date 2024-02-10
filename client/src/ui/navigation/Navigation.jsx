import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img
          className="logo-img"
          src="https://roleri.bg/wp-content/uploads/2019/11/vertigoschool_logo_top-1.png"
          alt="Училище за кънки Вертиго"
          data-rjs="2"
        />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>tesff</li>
          <li>asds</li>
          <li>sd fgsd</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
