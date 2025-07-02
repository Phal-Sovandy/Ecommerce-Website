import React, { createContext, useState, useContext } from "react";
import ModalLogin from "../components/modals/ModalLogIn";
import ModalSignUp from "../components/modals/ModalSignUp";
import ModalForgotPassword from "../components/modals/ModalForgotPassword";

const UserAuthModalContext = createContext();

export function UserAuthModalProvider({ children }) {
  const [modalType, setModalType] = useState(null);

  const openLoginModal = () => setModalType("login");
  const openSignupModal = () => setModalType("signup");
  const openForgotPasswordModal = () => setModalType("forgot");
  const closeModal = () => setModalType(null);

  return (
    <UserAuthModalContext.Provider
      value={{
        openLoginModal,
        openSignupModal,
        openForgotPasswordModal,
        closeModal,
      }}
    >
      {children}
      {modalType === "login" && <ModalLogin onClose={closeModal} />}
      {modalType === "signup" && <ModalSignUp onClose={closeModal} />}
      {modalType === "forgot" && <ModalForgotPassword onClose={closeModal} />}
    </UserAuthModalContext.Provider>
  );
}

export function useUserAuthModal() {
  return useContext(UserAuthModalContext);
}
