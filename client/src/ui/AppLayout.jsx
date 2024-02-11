import { Outlet } from "react-router-dom";
import Navigation from "./navigation/Navigation.jsx";
import Footer from "./footer/Footer.jsx";
import styles from "./AppLayout.module.css";
import Login from "../pages/auth/Login.jsx";
import { useState } from "react";
import Popup from "./elements/popupModal/Popup.jsx";
import { useToggleModal } from "../hooks/useToggleModale.js";

function AppLayout() {
  const [background, toggle] = useToggleModal();

  return (
    <>
      <Navigation onLogin={toggle} />
      <main className={styles.main}>
        {background && (
          <Popup onClose={toggle}>
            <Login onClose={toggle} />
          </Popup>
        )}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
