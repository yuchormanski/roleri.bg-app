import { Outlet } from "react-router-dom";
import Navigation from "./navigation/Navigation.jsx";
import Footer from "./footer/Footer.jsx";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <Navigation />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
