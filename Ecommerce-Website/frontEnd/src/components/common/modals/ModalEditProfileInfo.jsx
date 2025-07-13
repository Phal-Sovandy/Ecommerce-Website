import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { getData } from "country-list";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/customer/component-styles/modals/ModalEditProfileInfo.css";
import ModalInfo from "./ModalInfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faUserPen,
  faEnvelope,
  faCaretDown,
  faUser,
  faLocationDot,
  faCalendar,
  faGlobe,
  faTreeCity,
  faMapLocationDot,
  faPhone,
  faHouseFlag,
} from "@fortawesome/free-solid-svg-icons";

const ModalEditProfileInfo = ({ show, onClose, profileInfo }) => {
  const countries = getData().map((country) => ({
    value: country.code,
    label: country.name,
  }));
  const blankStyles = {
    control: () => ({
      all: "unset", // strip everything
      borderBottom: "1px solid #333",
      height: "30px",
      width: "100%",
      marginBottom: "25px",
    }),
    valueContainer: () => ({
      padding: 0,
      height: "30px",
      display: "flex",
      alignItems: "center",
    }),
    placeholder: () => ({
      color: "#333",
      fontSize: "13px",
      lineHeight: "30px",
    }),
    singleValue: () => ({
      color: "#000",
      fontSize: "13px",
      lineHeight: "30px",
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: () => ({
      backgroundColor: "#fff",
      fontSize: "13px",
      zIndex: 1001,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    }),
    option: () => ({
      padding: "4px 8px",
      cursor: "pointer",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#035a52",
        color: "#e8eae5",
      },
    }),
  };

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <ModalInfo head={false} show={show} onClose={onClose}>
      <div className="inner edit">
        <h3>Edit Your Information</h3>
        <div>
          <div className="image-holder">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" />
            <div className="change-image" onClick={handleIconClick}>
              <FontAwesomeIcon icon={faImage} />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
          <form action="">
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={profileInfo.first_name}
                className="form-control"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={profileInfo.last_name}
                className="form-control"
              />
            </div>
            <div className="form-wrapper">
              <input
                type="text"
                placeholder="Username"
                value={profileInfo.username}
                className="form-control"
              />
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="form-wrapper">
              <input
                type="email"
                placeholder="Email Address"
                value={profileInfo.email}
                className="form-control"
              />
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="form-wrapper">
              <input
                type="tel"
                placeholder="Phone Number (eg. 012345678)"
                pattern="0\d{8,9}"
                maxLength={10}
                value={profileInfo.phone_number}
                className="form-control"
              />
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="form-group">
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="Address Line 1 (eg. 123 Main Street)"
                  value={profileInfo.address_line1}
                  className="form-control"
                />
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="Address Line 2 (eg. House No.123)"
                  value={profileInfo.address_line2}
                  className="form-control"
                />
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
            </div>
            <div className="form-group">
              <div className="form-wrapper">
                <select
                  name=""
                  id=""
                  className="form-control"
                  defaultValue={profileInfo.gender}
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="femal">Female</option>
                </select>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <div className="form-wrapper birthdate">
                <DatePicker
                  selected={profileInfo.birthdate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select your birth date"
                  className="form-control"
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                />
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
            <div className="form-wrapper">
              <Select
                options={countries}
                value={profileInfo.country}
                // onChange={setSelectedCountry}
                placeholder="Select a country"
                styles={blankStyles}
                className="form-control country-selector"
              />
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className="form-group three">
              <div className="form-wrapper">
                <input
                  type="text"
                  value={profileInfo.state}
                  placeholder="State"
                  className="form-control"
                />
                <FontAwesomeIcon icon={faHouseFlag} />
              </div>
              <div className="form-wrapper">
                <input
                  type="text"
                  value={profileInfo.city}
                  placeholder="City"
                  className="form-control"
                />
                <FontAwesomeIcon icon={faTreeCity} />
              </div>
              <div className="form-wrapper">
                <input
                  type="text"
                  value={profileInfo.zipcode}
                  placeholder="ZIP Code"
                  maxLength={10}
                  className="form-control"
                />
                <FontAwesomeIcon icon={faMapLocationDot} />
              </div>
            </div>
            <button id="signup-btn">
              Edit
              <FontAwesomeIcon icon={faUserPen} />
            </button>
          </form>
        </div>
      </div>
    </ModalInfo>
  );
};

export default ModalEditProfileInfo;
