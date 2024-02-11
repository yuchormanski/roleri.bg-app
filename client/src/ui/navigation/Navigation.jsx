import styles from "./Navigation.module.css";
import { useState } from "react";
import { VscMenu, VscClose } from "react-icons/vsc";

import Button from "../elements/button/Button.jsx";
import NavigationMenu from "./NavigationMenu.jsx";

function Navigation({ onLogin }) {
  const [isMobile, setIsMobile] = useState(false);

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
        <div className={styles.mobileBtn}>
          <Button onClick={toggleMobile} type="menu" open={isMobile}>
            {isMobile ? <VscClose /> : <VscMenu />}
          </Button>
        </div>
        <NavigationMenu onLogin={onLogin} isMobile={isMobile} />
      </nav>
    </div>
  );
}

export default Navigation;
