import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/admin/ViewModal.css";
import ModalInfo from "../common/modals/ModalInfo.jsx";

const ViewModal = ({ show, onClose, info, title, type = "seller" }) => {
  const navigate = useNavigate();
  return (
    <ModalInfo head={false} show={show} onClose={onClose}>
      <div className="inner information">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <h3>{title} Information</h3>
        <div>
          <div className="image-holder">
            <img
              src={
                info.profile_picture ||
                "https://dokan.co/app/uploads/2023/05/How-to-Become-an-eCommerce-Seller-7-Tips-from-Experts.png"
              }
            />
          </div>
          <div className="info-wrapper">
            {type !== "seller" ? (
              <>
                <div className="info">
                  <h4>Firstname</h4>
                  <p>{info.first_name || "No Record"}</p>
                </div>
                <div className="info">
                  <h4>Lastname</h4>
                  <p>{info.last_name || "No Record"}</p>
                </div>
              </>
            ) : null}
            <div className="info">
              <h4>Username</h4>
              <p>{info.username || "No Record"}</p>
            </div>
            <div className="info">
              <h4>Email</h4>
              {info.email ? (
                <a href={`mailto:${info.email}`}>{info.email}</a>
              ) : (
                <p>No Record</p>
              )}
            </div>
            <div className="info">
              <h4>Phone Number</h4>
              <p>{info.phone || "No Record"}</p>
            </div>
            {type === "seller" && (
              <>
                <div className="info bio">
                  <h4>Contact Person</h4>
                  <p>{info.contact_person || "No Record"}</p>
                </div>
                <div className="info bio">
                  <h4>Bio</h4>
                  <p>{info.bio || "No Record"}</p>
                </div>
              </>
            )}

            {type !== "seller" ? (
              <>
                <div className="info">
                  <h4>Gender</h4>
                  <p>{info.gender || "No Record"}</p>
                </div>
                <div className="info">
                  <h4>Birthdate</h4>
                  <p>{info.birth_date || "No Record"}</p>
                </div>
              </>
            ) : null}
            <div className="info">
              <h4>Country</h4>
              <p>{info.country || "No Record"}</p>
            </div>
            <div className="info">
              <h4>State</h4>
              <p>{info.state || "No Record"}</p>
            </div>
            <div className="info">
              <h4>City</h4>
              <p>{info.city || "No Record"}</p>
            </div>
            <div className="info">
              <h4>ZIP Code</h4>
              <p>{info.zipcode || "No Record"}</p>
            </div>
            <div className="info">
              <h4>Address Line 1</h4>
              <p>{info.address_line1 || "No Record"}</p>
            </div>
            <div className="info">
              <h4>Address Line 2</h4>
              <p>{info.address_line2 || "No Record"}</p>
            </div>
            <div className="info">
              <h4>Joined Date</h4>
              <p>{info.registration_date || "No Record"}</p>
            </div>
            {title.toLowerCase() === "seller" && (
              <button
                type="button"
                onClick={() => navigate(`/sellerShop/${info.seller_id}`)}
              >{`Visit ${info.name || "Seller"}'s Store`}</button>
            )}
          </div>
        </div>
      </div>
    </ModalInfo>
  );
};

export default ViewModal;
