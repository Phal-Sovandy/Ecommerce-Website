import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/admin/ViewModal.css";
import ModalInfo from "../common/modals/ModalInfo.jsx";

const ViewModal = ({ show, onClose, info, title }) => {
  return (
    <ModalInfo head={false} show={show} onClose={onClose}>
      <div className="inner information">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <h3>{title} Information</h3>
        <div>
          <div className="image-holder">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" />
          </div>
          <div className="info-wrapper">
            <div className="info">
              <h4>Firstname</h4>
              <p>{info.first_name}</p>
            </div>
            <div className="info">
              <h4>Lastname</h4>
              <p>{info.last_name}</p>
            </div>
            <div className="info">
              <h4>Username</h4>
              <p>{info.username}</p>
            </div>
            <div className="info">
              <h4>Email</h4>
              <p>{info.email}</p>
            </div>
            <div className="info">
              <h4>Phone Number</h4>
              <p>{info.phone_number}</p>
            </div>

            <div className="info">
              <h4>Gender</h4>
              <p>{info.gender}</p>
            </div>
            <div className="info">
              <h4>Birthdate</h4>
              <p>{info.birthdate.toLocaleDateString()}</p>
            </div>
            <div className="info">
              <h4>Country</h4>
              <p>{info.country.label}</p>
            </div>
            <div className="info">
              <h4>State</h4>
              <p>{info.state}</p>
            </div>
            <div className="info">
              <h4>City</h4>
              <p>{info.city}</p>
            </div>
            <div className="info">
              <h4>ZIP Code</h4>
              <p>{info.zipcode}</p>
            </div>
            <div className="info">
              <h4>Address Line 1</h4>
              <p>{info.address_line1}</p>
            </div>
            <div className="info">
              <h4>Address Line 2</h4>
              <p>{info.address_line2}</p>
            </div>
          </div>
        </div>
      </div>
    </ModalInfo>
  );
};

export default ViewModal;
