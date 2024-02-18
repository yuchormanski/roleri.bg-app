import { NavLink } from "react-router-dom";
import styles from "./AsideMenu.module.css";
import { useLanguage } from "../../../context/Language.jsx";
import {
  PiUsersThin,
  PiCalendarBlankThin,
  PiNotePencilThin,
} from "react-icons/pi";
import { usePath } from "../../../context/PathContext.jsx";

function AsideMenu() {
  const { lang } = useLanguage();
  const { path } = usePath();

  const links = [
    {
      path: path === "profile" ? "edit" : "/profile",
      label: path === "profile" ? lang.edit : lang.profile,
      icon: <PiNotePencilThin />,
    },
    { path: "skaters", label: lang.skaters, icon: <PiUsersThin /> },
    { path: "history", label: lang.history, icon: <PiCalendarBlankThin /> },
  ];
  console.log(path);
  return (
    <aside className={styles.aside}>
      <nav>
        <ul className={styles.list}>
          {links.map((link, i) => (
            <li className={styles.listItem} key={i}>
              <NavLink to={link.path} className={styles.profileLink}>
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
