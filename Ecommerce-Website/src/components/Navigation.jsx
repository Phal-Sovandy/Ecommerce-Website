import { NavLink, Link } from "react-router-dom";
import sonnerLogo from "../assets/logo/Sooner_Logo(white).png";
import "../styles/component-styles/Navigation.css";

function Navigation() {
  return (
    <nav>
      <div id="left-nav">
        <Link to="/">
          <img src={sonnerLogo}></img>
        </Link>
      </div>
      <div id="right-nav">
        <NavLink
          className={({ isActive }) => (isActive ? "active-page" : "")}
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-page" : "")}
          to="/shopping"
        >
          SHOPS
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-page" : "")}
          to="/check-out"
        >
          CHECKOUT
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-page" : "")}
          to="/contacts"
        >
          CONTACTS
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;