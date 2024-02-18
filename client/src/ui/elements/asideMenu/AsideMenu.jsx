import { NavLink } from "react-router-dom";
import styles from "./AsideMenu.module.css";
import { useLanguage } from "../../../context/Language.jsx";
import {
  PiUsersThin,
  PiCalendarBlankThin,
  PiNotePencilThin,
  PiUserListThin,
} from "react-icons/pi";
import { usePath } from "../../../context/PathContext.jsx";

function AsideMenu() {
  const { lang } = useLanguage();
  const { path } = usePath();
  const urlPath = path === "profile";

  const links = [
    {
      path: "skaters",
      label: lang.skaters,
      //  icon: <PiUsersThin />
    },
    {
      path: "history",
      label: lang.history,
      //  icon: <PiCalendarBlankThin />
    },
    {
      path: urlPath ? "edit" : "/profile",
      label: urlPath ? lang.edit : lang.profile,
      // icon: urlPath ? <PiNotePencilThin /> : <PiUserListThin />,
    },
  ];
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
