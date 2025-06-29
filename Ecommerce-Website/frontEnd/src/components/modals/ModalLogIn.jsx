import React from "react";
import { Link } from "react-router-dom";
import "../../styles/component-styles/modals/ModalLogin.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLock } from "@fortawesome/free-solid-svg-icons";

function ModalLogin({ show }) {
  if (!show) return null;
  return (
    <div className="modal-login-window">
      <div className="modal-content">
        <div className="modal-head login">
          <h2>🛒 Welcome to Our Shop! 🛍️</h2>
        </div>
        <form method="POST">
          <div className="input-wrapper">
            <input type="email" placeholder="Enter your email" required />
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="input-wrapper">
            <input type="tel" placeholder="Enter your phone number" required />
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className="input-wrapper">
            <input type="password" placeholder="Enter your password" required />
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="remember-forgot">
            <div className="remember">
              <input type="checkbox" id="rememberLogin" />
              <label htmlFor="rememberLogin">Remember Me?</label>
            </div>
            <Link to="/forgetpassword">Forgot Password?</Link>
          </div>
          <div className="btn-wrapper">
            <button type="submit">Login</button>
            <button type="button" onClick={() => {}}>Login later</button>
          </div>
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;
