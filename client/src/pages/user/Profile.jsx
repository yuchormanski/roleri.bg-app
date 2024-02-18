import styles from "./Profile.module.css";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../context/Language.jsx";

function Profile() {
  const { lang } = useLanguage();

  const links = [
    { path: "edit", label: lang.edit },
    { path: "skaters", label: lang.skaters },
    { path: "history", label: lang.history },
  ];

  return (
    <div className={styles.profileContent}>
      <section className={styles.section}>main part</section>
      <aside className={styles.aside}>
        <nav>
          <ul className={styles.list}>
            {links.map((link, i) => (
              <li className={styles.listItem} key={i}>
                <NavLink to={link.path} className={styles.profileLink}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Profile;
