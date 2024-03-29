import styles from "./NavigationMenu.module.css";

import { Link, NavLink } from "react-router-dom";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { useTheme } from "../../context/DarkMode.jsx";
import { useLanguage } from "../../context/Language.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";

import { useAuthQueries } from "../../pages/auth/useAuthQueries.js";
import { useState } from "react";
import Popup from "../elements/popupModal/Popup.jsx";
import Login from "../../pages/auth/Login.jsx";
import Register from "../../pages/auth/Register.jsx";

function NavigationMenu({ onLogin, isMobile = true, toggleMobile = null }) {
  const { isDark, themeToggle } = useTheme();
  const { lang, langChanger, toggle: language } = useLanguage();
  const [background, setBackground] = useState(false);
  const [authToggle, setAuthToggle] = useState(true);

  const {
    checkIsUserLoggedIn,
    checkIsUserAdmin,
    checkIsUserInstructor,
    checkIsUser,
  } = useAuthContext();

  const { logoutMutation } = useAuthQueries();

  async function onLogout() {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error.message);
    } finally {
      if (isMobile) {
        toggleMobile ? toggleMobile() : null;
      }
    }
  }

  const links = [
    {
      path: "home",
      label: lang.home,
    },
    {
      path: "booking",
      label: lang.booking,
    },
    {
      path: "lessons",
      label: lang.lessons,
    },
  ];

  return (
    <>
      {background && (
        <Popup backgroundClick={false}>
          {authToggle ? (
            <Login
              onOut={toggleMobile}
              onClose={() => {
                setBackground(false);
                if (!isMobile) toggleMobile();
              }}
              authToggle={setAuthToggle}
            />
          ) : (
            <Register
              onOut={toggleMobile}
              onClose={() => {
                setBackground(false);
                if (!isMobile) toggleMobile();
              }}
              authToggle={setAuthToggle}
            />
          )}
        </Popup>
      )}

      {/* next line is for keeping nav menu closed on initial render.
      If missing the menu will be permanently open */}
      {isMobile && (
        <div
          className={`${styles.menuPanel} ${isDark && styles.isMobileBorder}`}
        >
          <ul className={styles.list}>
            {links.map((link, i) =>
              link.path === "home" &&
              (checkIsUserAdmin() || checkIsUserInstructor()) ? null : (
                <li className={styles.listItem} key={i}>
                  <NavLink
                    to={link.path}
                    className={styles.link}
                    onClick={toggleMobile}
                  >
                    {link.label}
                    <span className={styles.linkBorder}></span>
                  </NavLink>
                </li>
              )
            )}

            {(checkIsUserInstructor() || checkIsUserAdmin()) && (
              <li className={styles.listItem}>
                <NavLink
                  to={"on-duty"}
                  className={styles.link}
                  onClick={toggleMobile}
                >
                  {lang.onDuty}
                  <span className={styles.linkBorder}></span>
                </NavLink>
              </li>
            )}

            {checkIsUserAdmin() && (
              <li className={styles.listItem}>
                <NavLink
                  to={"settings"}
                  className={styles.link}
                  onClick={toggleMobile}
                >
                  {lang.settings}
                  <span className={styles.linkBorder}></span>
                </NavLink>
              </li>
            )}

            {checkIsUserLoggedIn() ? (
              <>
                <li className={styles.listItem}>
                  <NavLink
                    to={"profile"}
                    className={styles.link}
                    onClick={toggleMobile}
                  >
                    {lang.profile}
                    <span className={styles.linkBorder}></span>
                  </NavLink>
                </li>

                <li className={styles.listItem}>
                  <NavLink onClick={onLogout} className={styles.link} to="">
                    {lang.logout}
                    <span className={styles.linkBorder}></span>
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={styles.listItem}>
                <Link
                  onClick={() => {
                    setBackground(true);
                  }}
                  className={`${styles.link}`}
                  to={undefined}
                >
                  {lang.login}
                  <span className={styles.linkBorder}></span>
                </Link>
                {/* <button
                  onClick={() => {
                    if (!isMobile) toggleMobile();
                    onLogin();
                  }}
                  className={`${styles.link} ${styles.loginBtn}`}
                  // to={undefined}
                >
                  {lang.login}
                  <span className={styles.linkBorder}></span>
                </button> */}
              </li>
            )}

            {checkIsUserAdmin() || checkIsUserInstructor() ? null : (
              <li className={styles.listItem}>
                {/* TODO: ADD About Us Page */}
                <NavLink
                  onClick={() => {
                    if (!isMobile) toggleMobile();
                  }}
                  className={styles.link}
                  to="todo-please-add-about-us-page"
                >
                  {lang.about}
                  <span className={styles.linkBorder}></span>
                </NavLink>
              </li>
            )}

            {/* <li className={`${styles.listItem} ${styles.themeChanger}`}> */}
            <li className={`${styles.themeChanger}`}>
              <div className={`${styles.listItemBtn}`}>
                <button onClick={langChanger} className={styles.lang}>
                  {language ? (
                    <img
                      src={"/Flag-of-Bulgaria-28.svg"}
                      alt="Bulgarian flag"
                    />
                  ) : (
                    <img src={"/Flag-of-Great-Britain-28.svg"} alt="UK flag" />
                  )}
                </button>
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
