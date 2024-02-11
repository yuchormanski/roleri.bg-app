import styles from "./Navigation.module.css";
import Button from "../elements/button/Button.jsx";
import { useState } from "react";
import NavigationMenu from "./NavigationMenu.jsx";

function Navigation({ onLogin }) {
  const [isMobile, setIsMobile] = useState(true);

  function toggleMobile() {
    setIsMobile((isMobile) => !isMobile);
  }
  return (
    <div className={styles.wrapper}>
      <Button to={"/"}>
        <div className={styles.logo}>
          <img
            className="logo-img"
            src="https://roleri.bg/wp-content/uploads/2019/11/vertigoschool_logo_top-1.png"
            alt="Училище за кънки Вертиго"
            data-rjs="2"
          />
        </div>
      </Button>
      <nav className={styles.nav}>
        <NavigationMenu onLogin={onLogin} />
      </nav>
      <nav className={styles.mobileNav}>
        <Button onClick={toggleMobile} type={"primary"}>
          {isMobile ? "X" : "O"}
        </Button>
        <NavigationMenu onLogin={onLogin} />
      </nav>
    </div>
  );
}

export default Navigation;
