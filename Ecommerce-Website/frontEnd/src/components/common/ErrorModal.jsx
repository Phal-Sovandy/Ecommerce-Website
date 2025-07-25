import React from "react";
import "../../styles/common/alert-modal.css";
import ModalInfo from "./modals/ModalInfo";

const ErrorModal = ({ show, onClose, errorMsg }) => {
  return (
    <ModalInfo
      show={show}
      onClose={onClose}
      head={true}
      title="Something went wrong."
    >
      <p style={{ color: "red" }}>
        <span style={{ fontWeight: "700" }}>Error: </span>
        {errorMsg}
      </p>
    </ModalInfo>
  );
};

export default ErrorModal;
