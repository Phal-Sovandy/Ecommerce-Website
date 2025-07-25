import React, { useState } from "react";
import { useUserAuthModal } from "../../../context/UserAuthModalContext";
import { useAuth } from "../../../context/AuthContext";
import { loginUser } from "../../../api/authApi";
import "../../../styles/customer/component-styles/modals/ModalLogin.css";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function ModalLogin() {
  const { openSignupModal, openForgotPasswordModal, closeModal } =
    useUserAuthModal();
  const { login } = useAuth();

  const [type, setType] = useState("password");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = await loginUser(emailOrPhone, password);
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      login(token);
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-login-window">
      <div className="modal-content">
        <div className="modal-head login">
          <h2>🛒 Welcome to Our Shop! 🛍️</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter your Email or Phone Number"
              required
            />
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className="input-wrapper">
            <input
              type={type}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            <FontAwesomeIcon
              icon={type === "password" ? faEyeSlash : faEye}
              onClick={() => setType(type === "password" ? "text" : "password")}
            />
          </div>
          {error && <p className="error">{error}</p>}

          <div className="remember-forgot">
            <div className="remember">
              <input
                type="checkbox"
                id="rememberLogin"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="rememberLogin">Remember Me?</label>
            </div>
            <p onClick={openForgotPasswordModal}>Forgot Password?</p>
          </div>

          <div className="btn-wrapper">
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Quantum size="20" speed="1.75" color="white" />
              ) : (
                "Login"
              )}
            </button>
            <button type="button" onClick={closeModal}>
              Login later
            </button>
          </div>

          <p>
            Don't have an account?{" "}
            <span onClick={openSignupModal}>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;
