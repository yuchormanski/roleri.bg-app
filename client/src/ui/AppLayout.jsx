import { Outlet } from "react-router-dom";
import Navigation from "./navigation/Navigation.jsx";
import Footer from "./footer/Footer.jsx";

function AppLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
