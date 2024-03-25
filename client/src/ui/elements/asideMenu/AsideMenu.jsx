import styles from "./AsideMenu.module.css";

import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  PiCaretDoubleDownDuotone,
  PiCaretDoubleUpDuotone,
} from "react-icons/pi";
import { usePath } from "../../../context/PathContext.jsx";

function AsideMenu({ links }) {
  const [isMobile, setIsMobile] = useState(true);
  const { path, newPath } = usePath();

  return (
    <aside className={styles.aside}>
      <button
        onClick={() => setIsMobile((x) => !x)}
        className={`${styles.mobileMenuBtn} ${
          isMobile ? styles.notClicked : styles.clicked
        }`}
      >
        {isMobile ? <PiCaretDoubleDownDuotone /> : <PiCaretDoubleUpDuotone />}
      </button>
      <nav className={`${styles.web} ${isMobile ? styles.mobile : ""}`}>
        <ul className={styles.list}>
          {links.map((link, i) => (
            <li className={styles.listItem} key={i}>
              <NavLink
                to={link.path}
                className={styles.profileLink}
                onClick={() => {
                  setIsMobile((x) => !x);
                  // newPath(link.path);
                }}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default AsideMenu;
