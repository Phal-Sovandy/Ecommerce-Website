import React, { useState } from "react";
import { useUserAuthModal } from "../../../context/UserAuthModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/customer/component-styles/modals/ModalForgotPassword.css";

const ModalForgotPassword = () => {
  const VERIFY_CODE = "123210";
  const [step, setStep] = useState("forgot");
  const [sixDigitCode, setSixDigitCode] = useState("");
  const { openLoginModal, openForgotPasswordModal, closeModal } =
    useUserAuthModal();
    const [inputType, setInputType] = useState("password");

  return (
    <div className="modal-forgotpass-window">
      <div className="modal-content">
        <div
          className={`send-verification-code ${
            step === "forgot" ? "active" : "leave"
          }`}
        >
          <div className="modal-head login">
            <h2>Forgot Your Password?</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep("reset");
            }}
          >
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your Email or Phone Number"
                required
              />
              <FontAwesomeIcon icon={faUser} />
            </div>
            <p>Enter your contact info and we’ll send a reset code.</p>
            <div className="btn-wrapper">
              <button type="submit">Send Code</button>
              <button type="button" onClick={() => openLoginModal()}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div
          className={`reset-password ${step === "reset" ? "active" : "leave"}`}
        >
          <div className="modal-head login">
            <h2>Enter the following</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openLoginModal();
            }}
          >
            <p>We've sent a code to your contact method. Please enter it.</p>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter the 6-digits code"
                value={sixDigitCode}
                onChange={(e) => setSixDigitCode(() => e.target.value)}
                maxLength={6}
                required
              />
              <FontAwesomeIcon icon={faBell} />
            </div>
            {sixDigitCode === VERIFY_CODE ? (
              <>
                <div className="input-wrapper">
                  <input
                    type={inputType}
                    placeholder="Enter New Password"
                    required
                  />
                  <FontAwesomeIcon icon={inputType === "password" ? faEyeSlash : faEye} onClick={() => setInputType(i => i === "password" ? "text" : "password")}/>
                </div>

                <div className="input-wrapper last">
                  <input
                    type={inputType}
                    placeholder="Confirm New Password"
                    required
                  />
                  <FontAwesomeIcon icon={inputType === "password" ? faEyeSlash : faEye} onClick={() => setInputType(i => i === "password" ? "text" : "password")}/>
                </div>
              </>
            ) : null}
            <p className="error-messages">Password Not Match</p>
            <div className="btn-wrapper">
              <button type="submit">Reset Password</button>
              <button type="button" onClick={() => {}}>
                Send Again
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForgotPassword;
