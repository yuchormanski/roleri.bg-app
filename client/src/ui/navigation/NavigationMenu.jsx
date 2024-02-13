import styles from "./NavigationMenu.module.css";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { useTheme } from "../../context/DarkMode.jsx";
import { useLanguage } from "../../context/Language.jsx";

import { NavLink } from "react-router-dom";

function NavigationMenu({ onLogin, isMobile = true, toggleMobile }) {
  const { isDark, themeToggle } = useTheme();
  const { lang, langChanger, toggle: language } = useLanguage();

  return (
    <>
      {isMobile && (
        <div
          className={styles.menuPanel}
          style={isDark ? { border: "1px solid var(--input-border)" } : null}
        >
          <button onClick={langChanger} className={styles.lang}>
            {language ? (
              <img
                src={"/bulgaria_fluttering_flag_64.png"}
                alt="Bulgarian flag"
              />
            ) : (
              <img
                src={"/united_kingdom_fluttering_flag_64.png"}
                alt="UK flag"
              />
            )}
          </button>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <NavLink to={"/"} className={styles.link} onClick={toggleMobile}>
                {lang.home}
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                to={"lessons"}
                className={styles.link}
                onClick={toggleMobile}
              >
                {lang.lessons}
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <button
                onClick={() => {
                  onLogin();
                  toggleMobile();
                }}
                className={styles.listItemBtn}
              >
                {lang.login}
              </button>
            </li>
            <li className={styles.listItem}>
              <div className={`${styles.listItemBtn}`}>
                <button className={`${styles.iconBtn}`} onClick={themeToggle}>
                  {isDark ? <IoSunnyOutline /> : <IoMoonOutline />}
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default NavigationMenu;
