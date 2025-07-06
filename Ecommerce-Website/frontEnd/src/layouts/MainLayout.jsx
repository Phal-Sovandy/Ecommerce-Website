import { useAuth } from "../context/AuthContext.jsx";
import { Outlet } from "react-router-dom";
import Navigation from "../components/common/Navigation.jsx";
import PageFooter from "../components/common/PageFooter.jsx";

function MainLayout() {
  const { role } = useAuth();
  return (
    <>
      <Navigation />
      <Outlet />
      {role !== "admin" ? <PageFooter /> : null}
    </>
  );
}

export default MainLayout;
