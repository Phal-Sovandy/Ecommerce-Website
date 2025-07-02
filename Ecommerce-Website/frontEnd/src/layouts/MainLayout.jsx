import { Outlet } from "react-router-dom";
import Navigation from "../components/common/Navigation.jsx";
import PageFooter from "../components/common/PageFooter.jsx";

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
