import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useUserAuthModal } from "../../context/UserAuthModalContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

import sonnerLogo from "../../assets/logo/Sooner_Logo(white).png";
import "../../styles/customer/component-styles/Navigation.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const { isLoggedIn, role } = useAuth();
  const { openLoginModal } = useUserAuthModal();
  const { cart } = useCart();
  const itemsInCart = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const navigate = useNavigate();

  return (
    <nav>
      <div id="left-nav">
        <Link to="/">
          <img src={sonnerLogo} alt="logo" />
        </Link>
      </div>
      <div id="right-nav">
        <NavLink
          className={({ isActive }) => (isActive ? "active-page" : "")}
          to="/"
        >
          HOME
        </NavLink>

        {isLoggedIn && role == "customer" && (
          <NavLink
            className={({ isActive }) => (isActive ? "active-page" : "")}
            to="/shopping"
          >
            SHOPS
          </NavLink>
        )}

        {isLoggedIn && role == "seller" && (
          <NavLink
            className={({ isActive }) => (isActive ? "active-page" : "")}
            to="/myshop"
          >
            MY SHOPS
          </NavLink>
        )}

        {isLoggedIn && role === "customer" && (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? "active-page" : "")}
              to="/wishlist"
            >
              WISHLIST
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active-page" : "")}
              to="/check-out"
            >
              {cart.length > 0 && (
                <div className="cart-item-count">{itemsInCart}</div>
              )}
              CHECKOUT
            </NavLink>
          </>
        )}
        {role !== "admin" && (
          <NavLink
            className={({ isActive }) => (isActive ? "active-page" : "")}
            to="/contacts"
          >
            CONTACTS
          </NavLink>
        )}

        {isLoggedIn ? (
          <div
            className="profile login"
            id="profile"
            onClick={() =>
              navigate(role === "customer" ? "/profile" : "/sellerprofile")
            }
          >
            <div>
              <img
                src="https://tinypng.com/images/social/website.jpg"
                alt="profile"
              />
            </div>
          </div>
        ) : (
          <div className="profile not-login">
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              onClick={openLoginModal}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
