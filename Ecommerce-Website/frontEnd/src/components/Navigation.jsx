import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import sonnerLogo from "../assets/logo/Sooner_Logo(white).png";
import "../styles/component-styles/Navigation.css";

function Navigation() {
  const { cart } = useCart();
  const itemsInCart = cart.reduce((acc, cur) => acc + cur.quantity, 0);

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
          to="/wishlist"
        >
          WISHLIST
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-page" : "")}
          to="/profile"
        >
          PROFILE
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
          {cart.length > 0 ? (
            <div className="cart-item-count">{itemsInCart}</div>
          ) : null}
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
