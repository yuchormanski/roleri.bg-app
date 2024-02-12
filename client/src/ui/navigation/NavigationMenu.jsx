import styles from "./NavigationMenu.module.css";

import { useQuery } from "@tanstack/react-query";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { getLanguage } from "../../services/language.js";
import { languageSet } from "../../util/lang.js";
import { useTheme } from "../../context/DarkMode.jsx";

function NavigationMenu({ onLogin, isMobile = true }) {
  const { isDark, themeToggle } = useTheme();
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["language"],
    queryFn: getLanguage,
  });
  const [language, setLanguage] = useState(true);

  function handleLanguage() {
    setLanguage((l) => !l);
  }
  function lang(p) {
    return languageSet(language, p);
  }

  return (
    <>
      {isMobile && (
        <div className={styles.menuPanel}>
          <button onClick={handleLanguage} className={styles.lang}>
            {language ? (
              <img
                src={"/united_kingdom_fluttering_flag_64.png"}
                alt="UK flag"
              />
            ) : (
              <img
                src={"/bulgaria_fluttering_flag_64.png"}
                alt="Bulgarian flag"
              />
            )}
          </button>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <NavLink to={"/"} className={styles.link}>
                Home
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink to={"lessons"} className={styles.link}>
                {lang("lessons")}
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <button onClick={onLogin} className={styles.listItemBtn}>
                {lang("login")}
              </button>
            </li>
            <li className={styles.listItem}>
              <div className={`${styles.listItemBtn} ${styles.lastInLine}`}>
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
