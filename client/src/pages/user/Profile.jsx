import styles from "./Profile.module.css";

import { Outlet } from "react-router-dom";
import {
  PiUsersThin,
  PiCalendarBlankThin,
  PiNotePencilThin,
  PiUserListThin,
} from "react-icons/pi";

import { useLanguage } from "../../context/Language.jsx";
import { usePath } from "../../context/PathContext.jsx";

import AsideMenu from "../../ui/elements/asideMenu/AsideMenu.jsx";

function Profile() {
  const { lang, index } = useLanguage();
  const { path } = usePath();
  const urlPath = path === "profile";

  const links = [
    {
      path: "skaters",
      label: lang.skaters,
      // icon: <PiUsersThin />,
    },
    {
      path: "history",
      label: lang.history,
      // icon: <PiCalendarBlankThin />,
    },
    {
      path: urlPath ? "edit" : "/profile",
      label: urlPath ? lang.edit : lang.profile,
      // icon: urlPath ? <PiNotePencilThin /> : <PiUserListThin />,
    },
  ];

  return (
    <div className={styles.profileContent}>
      <section className={styles.section}>
        <Outlet />
      </section>

      <AsideMenu links={links} />
    </div>
  );
}

export default Profile;
