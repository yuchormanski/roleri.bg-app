import styles from "./Profile.module.css";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../context/Language.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { PiUserThin, PiUsersThin } from "react-icons/pi";

function Profile() {
  const { lang } = useLanguage();
  const { getUserHandler } = useAuthContext();
  const { name, phone, role, id, email } = getUserHandler();

  const links = [
    { path: "edit", label: lang.edit },
    {
      path: "/skaters",
      label: (
        <>
          <PiUsersThin />
          <span>{lang.skaters}</span>
        </>
      ),
    },
    { path: "history", label: lang.history },
  ];

  return (
    <div className={styles.profileContent}>
      <section className={styles.section}>
        <h2 className={styles.heading}>{`${lang.hello}, ${name}`}</h2>

        <div>
          <div>
            <PiUserThin />
          </div>
        </div>
      </section>
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
