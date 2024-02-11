import { Outlet } from "react-router-dom";
import Navigation from "./navigation/Navigation.jsx";
import Footer from "./footer/Footer.jsx";
import styles from "./AppLayout.module.css";
import Login from "../pages/auth/Login.jsx";
import Popup from "./elements/popupModal/Popup.jsx";
import { useToggleModal } from "../hooks/useToggleModal.js";
import Register from "../pages/auth/Register.jsx";
import { useState } from "react";

function AppLayout() {
  const [background, toggle] = useToggleModal();
  const [authToggle, setAuthToggle] = useState(true);

  return (
    <>
      <Navigation onLogin={toggle} />
      <main className={styles.main}>
        {background && (
          <Popup onClose={toggle}>
            {authToggle ? (
              <Login onClose={toggle} authToggle={setAuthToggle} />
            ) : (
              <Register onClose={toggle} authToggle={setAuthToggle} />
            )}
          </Popup>
        )}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
