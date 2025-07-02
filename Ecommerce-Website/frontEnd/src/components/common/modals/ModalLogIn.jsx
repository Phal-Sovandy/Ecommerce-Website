import React, { useState } from "react";
import { useUserAuthModal } from "../../../context/UserAuthModalContext";
import "../../../styles/customer/component-styles/modals/ModalLogin.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function ModalLogin() {
  const { openSignupModal, openForgotPasswordModal, closeModal } =
    useUserAuthModal();
  const [type, setType] = useState("password");
  return (
    <div className="modal-login-window">
      <div className="modal-content">
        <div className="modal-head login">
          <h2>🛒 Welcome to Our Shop! 🛍️</h2>
        </div>
        {/* // TODO */}
        <form method="POST" action="/hello">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your Email or Phone Number"
              required
            />
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="input-wrapper">
            <input type={type} placeholder="Enter your Password" required />
            <FontAwesomeIcon
              icon={type === "password" ? faEyeSlash : faEye}
              onClick={() => setType(type === "password" ? "text" : "password")}
            />
          </div>
          <div className="remember-forgot">
            <div className="remember">
              <input type="checkbox" id="rememberLogin" />
              <label htmlFor="rememberLogin">Remember Me?</label>
            </div>
            <p onClick={() => openForgotPasswordModal()}>Forgot Password?</p>
          </div>
          <div className="btn-wrapper">
            <button type="submit">Login</button>
            <button type="button" onClick={() => closeModal()}>
              Login later
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <span onClick={() => openSignupModal()}>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;
