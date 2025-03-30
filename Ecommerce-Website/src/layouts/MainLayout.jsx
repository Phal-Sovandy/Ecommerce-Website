import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import PageFooter from "../components/PageFooter.jsx";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <PageFooter />
    </>
  );
}

export default MainLayout;
