import { Outlet } from "react-router-dom";
import styles from "./OnDuty.module.css";
import AsideMenu from "../../ui/elements/asideMenu/AsideMenu.jsx";
import { useLanguage } from "../../context/Language.jsx";
import { usePath } from "../../context/PathContext.jsx";

function OnDuty() {
  const { lang } = useLanguage();
  const { path } = usePath();
  const urlPath = path === "lessons";

  const links = [
    {
      path: urlPath ? "equipment" : "/on-duty",
      label: urlPath ? lang.i_equipment : lang.s_lessons,
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

export default OnDuty;
