import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/admin/UserEnquiry.css";
import ModalInfo from "../common/modals/ModalInfo.jsx";

const EnquiryViewModal = ({
  show,
  onClose,
  title = "Enquirer's Details",
  info = {},
}) => {
  return (
    <ModalInfo head={true} show={show} title={title} onClose={onClose}>
      <div className="enquiry-details">
        <div className="enquirer-info">
          <div className="info-wrapper">
            <h3>Enquiry ID</h3>
            <p>{info.enquiry_id}</p>
          </div>
          <div className="info-wrapper">
            <h3>Full Name</h3>
            <p>{info.full_name}</p>
          </div>
          <div className="info-wrapper">
            <h3>Role</h3>
            <p>{info.role}</p>
          </div>
          <div className="info-wrapper">
            <h3>Gender</h3>
            <p>{info.gender}</p>
          </div>
          <div className="info-wrapper">
            <h3>Country</h3>
            <p>{info.country}</p>
          </div>
          <div className="info-wrapper">
            <h3>Region</h3>
            <p>{info.region}</p>
          </div>
          <div className="info-wrapper">
            <h3>Email</h3>
            <a href={`mailto:${info.email}`}>{info.email}</a>
          </div>
          <div className="info-wrapper">
            <h3>Phone Number</h3>
            <p>{info.phone}</p>
          </div>
          <div className="info-wrapper">
            <h3>Enquiry Date</h3>
            <p>{info.enquiry_date}</p>
          </div>
          <div
            className={`badge ${info.badge === "Priority" ? "priority" : ""}`}
          >
            {info.badge}
          </div>
        </div>
        <div className="enquiry-comment">
          <h3>Comment</h3>
          <div>{info.comment}</div>
        </div>
      </div>
    </ModalInfo>
  );
};

export default EnquiryViewModal;
