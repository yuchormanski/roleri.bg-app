import styles from "./Profile.module.css";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../context/Language.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { PiUserThin, PiUsersThin } from "react-icons/pi";

function Profile() {
  const { lang } = useLanguage();
  const { getUserHandler } = useAuthContext();
  const { firstName, lastName, phone, role, id, email } = getUserHandler();

  const links = [
    { path: "edit", label: lang.edit },
    { path: "/skaters", label: lang.skaters, icon: <PiUsersThin /> },
    { path: "history", label: lang.history },
  ];

  return (
    <div className={styles.profileContent}>
      <section className={styles.section}>
        <h2 className={styles.heading}>{`${lang.hello}, ${firstName}`}</h2>

        <div>
          <div>
            <PiUserThin />
          </div>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
          vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra
          quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
          laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
          augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
          rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam
          semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
          blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio
          et ante tincidunt tempus. Donec vitae sapien ut libero venenatis
          faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus
          tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales
          sagittis magna. Sed consequat, l
        </p>
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
