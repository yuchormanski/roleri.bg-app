import { Outlet } from "react-router-dom";
import Navigation from "./navigation/Navigation.jsx";
import Footer from "./footer/Footer.jsx";
import styles from "./AppLayout.module.css";
import Login from "../pages/auth/Login.jsx";
import { useState } from "react";
import Popup from "./elements/popupModal/Popup.jsx";

function AppLayout() {
  const [background, setBackground] = useState(false);

  function open() {
    setBackground(true);
  }

  function close() {
    setBackground(false);
  }

  return (
    <>
      <Navigation onLogin={open} />
      <main className={styles.main}>
        {background && (
          <Popup onClose={close}>
            <Login onClose={close} />
          </Popup>
        )}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
