import styles from "./Admin.module.css";

import { Outlet } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";

import AsideMenu from "../../ui/elements/asideMenu/AsideMenu.jsx";

function Admin() {
  const { lang } = useLanguage();

  const links = [
    {
      path: "skates",
      label: lang.s_skates,
    },
    {
      path: "protections",
      label: lang.s_protections,
    },
    {
      path: "age-range",
      label: lang.ageGroup,
    },
    {
      path: "subscription",
      label: lang.subscription,
    },
    {
      path: "lessons",
      label: lang.s_lessons,
    },
    {
      path: "activeDays",
      label: lang.a_active_days,
    },
    {
      path: "users-management",
      label: lang.a_user_management,
    },
  ];

  return (
    <div className={styles.adminContent}>
      <section className={styles.section}>
        <Outlet />
      </section>

      <AsideMenu links={links} />
    </div>
  );
}

export default Admin;
