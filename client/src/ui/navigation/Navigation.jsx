import styles from "./Navigation.module.css";
import Button from "../elements/button/Button.jsx";
import { useState } from "react";

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
        <ul className={styles.list}>
          <li>
            <Button to={"/"}>Home</Button>
          </li>
          <li>
            <Button to={"lessons"}>Lessons</Button>
          </li>
          <li>
            {/* <Button to={"/login"}>Login</Button> */}
            <Button type={"primary"} onClick={onLogin}>
              Login
            </Button>
          </li>
        </ul>
      </nav>
      <nav className={styles.mobileNav}>
        <Button onClick={toggleMobile} type={"primary"}>
          {isMobile ? "X" : "O"}
        </Button>
        <ul
          className={styles.listMobile}
          style={isMobile ? { display: "none" } : null}
        >
          <li>
            <Button to={"/"}>Home</Button>
          </li>
          <li>
            <Button to={"lessons"}>Lessons</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
