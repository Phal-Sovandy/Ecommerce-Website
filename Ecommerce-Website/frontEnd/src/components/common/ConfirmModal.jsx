import React from "react";
import ModalInfo from "./modals/ModalInfo";

const ConfirmModal = ({ show, message, onCancel, onConfirm }) => {
  return (
    <ModalInfo show={show} onClose={onCancel} head={false}>
      <h2>{message}</h2>
      <div className="clarify-delete-button">
        <button type="button" onClick={onConfirm}>
          Yes
        </button>
        <button type="button" onClick={onCancel} autoFocus>
          No
        </button>
      </div>
    </ModalInfo>
  );
};

export default ConfirmModal;
