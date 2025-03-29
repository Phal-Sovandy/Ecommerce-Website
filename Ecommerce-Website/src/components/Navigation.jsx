import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { NavLink, Link } from "react-router-dom";
import "../styles/component-styles/Navigation.css";
import sonnerLogo from "../assets/logo/Sooner_Logo(white).png";

// <Navink to="/page1" className={({ isActive }) => isActive ? active-css-class : ""}> Page1 </NavLink>
function Navigation() {
  return (
    <nav>
      <div id="left-nav">
        <Link to="/">
          <img src={sonnerLogo}></img>
        </Link>
      </div>
      <div id="right-nav">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/shopping">SHOPS</NavLink>
        <NavLink to="/check-out">CHECKOUT</NavLink>
        <NavLink to="/contacts">CONTACTS</NavLink>
      </div>
      <div className="side-bar-btn">
        <FontAwesomeIcon icon={faBars} size="xl" />
      </div>
      <div id="drop-down-bar">
        <div>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>
        <ul>
          <li>
            <NavLink to="/">
              <h3>HOME</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/shopping">
              <h3>SHOPS</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/check-out">
              <h3>CHECK-OUT</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts">
              <h3>CONTACTS</h3>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
