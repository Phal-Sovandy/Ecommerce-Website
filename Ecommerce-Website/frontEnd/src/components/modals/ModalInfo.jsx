import React from "react";
import "../../styles/customer/component-styles/modals/ModalInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function ModalInfo({ show, onClose, title, children, head = true }) {
  if (!show) return null;
  return (
    <div className="modal-info-window" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {head ? (
          <div className="modal-head">
            <h2>{title}</h2>
            <button className="close-btn" onClick={onClose}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export default ModalInfo;
