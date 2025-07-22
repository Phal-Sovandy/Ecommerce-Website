import React, { useState, useEffect } from "react";
import { useUserAuthModal } from "../../../context/UserAuthModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { checkContactExists, resetPassword } from "../../../api/authApi";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import "../../../styles/customer/component-styles/modals/ModalForgotPassword.css";

const ModalForgotPassword = () => {
  const VERIFY_CODE = "123210"; // Future Implementation

  const [step, setStep] = useState("forgot");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [inputType, setInputType] = useState("password");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { openLoginModal } = useUserAuthModal();

  const handleSixDigitCodeChange = (e) => {
    const val = e.target.value;
    setSixDigitCode(val);

    if (val.length === 6 && val !== VERIFY_CODE) {
      setCodeError("Verification code is incorrect.");
    } else {
      setCodeError("");
    }
  };

  useEffect(() => {
    if (confirmPassword.length > 0 && newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  }, [newPassword, confirmPassword]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setContactError("");
    setErrorMsg("");
    setSuccessMsg("");
    setCodeError("");
    setSixDigitCode("");
    setPasswordError("");
    setNewPassword("");
    setConfirmPassword("");

    try {
      const exists = await checkContactExists(contact.trim());
      if (exists) {
        setStep("reset");
      } else {
        setContactError("Contact not found. Please check and try again.");
      }
    } catch {
      setContactError("Server error. Please try again later.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (codeError || passwordError) return;

    setIsLoading(true);

    try {
      const res = await resetPassword(contact, newPassword);
      setSuccessMsg(res.message || "Password reset successfully!");
      setTimeout(() => openLoginModal(), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-forgotpass-window">
      <div className="modal-content">
        <div className={`send-verification-code ${step === "forgot" ? "active" : "leave"}`}>
          <div className="modal-head login">
            <h2>Forgot Your Password?</h2>
          </div>
          <form onSubmit={handleSendCode}>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your Email or Phone Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faUser} />
            </div>
            {contactError && <p className="error-messages">{contactError}</p>}
            <p>Enter your contact info and we’ll send a reset code.</p>
            <div className="btn-wrapper">
              <button type="submit">Send Code</button>
              <button type="button" onClick={openLoginModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className={`reset-password ${step === "reset" ? "active" : "leave"}`}>
          <div className="modal-head login">
            <h2>Enter the following</h2>
          </div>
          <form onSubmit={handleResetPassword}>
            <p>We've sent a code to your contact method. Please enter it.</p>

            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter the 6-digit code"
                value={sixDigitCode}
                onChange={handleSixDigitCodeChange}
                maxLength={6}
                required
              />
              <FontAwesomeIcon icon={faBell} />
            </div>
            {codeError && <p className="error-messages">{codeError}</p>}

            {sixDigitCode === VERIFY_CODE && (
              <>
                <div className="input-wrapper">
                  <input
                    type={inputType}
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    icon={inputType === "password" ? faEyeSlash : faEye}
                    onClick={() =>
                      setInputType((prev) =>
                        prev === "password" ? "text" : "password"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <div className="input-wrapper last">
                  <input
                    type={inputType}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <FontAwesomeIcon
                    icon={inputType === "password" ? faEyeSlash : faEye}
                    onClick={() =>
                      setInputType((prev) =>
                        prev === "password" ? "text" : "password"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </>
            )}

            {passwordError && <p className="error-messages">{passwordError}</p>}
            {errorMsg && <p className="error-messages">{errorMsg}</p>}
            {successMsg && <p className="success-messages">{successMsg}</p>}

            <div className="btn-wrapper">
              <button
                type="submit"
                disabled={
                  isLoading ||
                  codeError !== "" ||
                  passwordError !== "" ||
                  !newPassword ||
                  newPassword !== confirmPassword
                }
              >
                {isLoading ? (
                  <Quantum size="20" speed="1.75" color="white" />
                ) : (
                  "Reset Password"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSixDigitCode("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setErrorMsg("");
                  setSuccessMsg("");
                  setCodeError("");
                  setPasswordError("");
                  setStep("forgot");
                }}
              >
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
