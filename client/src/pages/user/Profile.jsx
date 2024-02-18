import styles from "./Profile.module.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLanguage } from "../../context/Language.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import AsideMenu from "../../ui/elements/asideMenu/AsideMenu.jsx";

function Profile() {
  const { lang } = useLanguage();
  const { getUserHandler } = useAuthContext();
  const { firstName, lastName, phone, role, id, email } = getUserHandler();

  const [path, setPath] = useState("profile");

  return (
    <>
      <div className={styles.profileContent}>
        <section className={styles.section}>
          <h2 className={styles.heading}>{`${lang.hello}, ${firstName}`}</h2>
          <Outlet />
        </section>

        <AsideMenu />
      </div>
    </>
  );
}

export default Profile;
