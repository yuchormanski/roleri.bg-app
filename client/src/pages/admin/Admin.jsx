import styles from './Admin.module.css'

import { Outlet } from 'react-router-dom';

import { useLanguage } from '../../context/Language.jsx';

import AsideMenu from '../../ui/elements/asideMenu/AsideMenu.jsx';

function Admin() {
  const { lang } = useLanguage();

  const links = [
    {
      path: "skates",
      label: lang.skaterSkateSize,
    },
    {
      path: "protections",
      label: lang.skaterProtections,
    },
    {
      path: "levels",
      label: lang.level,
    },
    {
      path: "age-range",
      label: lang.ageGroup,
    },
    {
      path: "payments",
      label: lang.subscription,
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
