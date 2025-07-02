import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { getData } from "country-list";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/customer/component-styles/modals/SignUpForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faCaretDown,
  faUser,
  faLock,
  faLocationDot,
  faCalendar,
  faGlobe,
  faTreeCity,
  faMapLocationDot,
  faPhone,
  faHouseFlag,
} from "@fortawesome/free-solid-svg-icons";

const SignUpForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
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
  return (
    <div className="inner">
      <div className="image-holder">
        <video src="../../public/signUp.mov" loop muted autoPlay />
      </div>
      <form action="">
        <h3>SignUp Form</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
          />
          <input type="text" placeholder="Last Name" className="form-control" />
        </div>
        <div className="form-wrapper">
          <input type="text" placeholder="Username" className="form-control" />
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="form-wrapper">
          <input
            type="email"
            placeholder="Email Address"
            className="form-control"
          />
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className="form-wrapper">
          <input
            type="tel"
            placeholder="Phone Number (eg. 012345678)"
            pattern="0\d{2}-?\d{3}-?\d{3}"
            maxLength={11}
            className="form-control"
          />
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div className="form-group">
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Address Line 1 (eg. 123 Main Street)"
              className="form-control"
            />
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Address Line 2 (eg. House No.123)"
              className="form-control"
            />
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-wrapper">
            <select name="" id="" className="form-control" defaultValue={""}>
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
              selected={selectedDate}
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
            // value={selectedCountry}
            // onChange={setSelectedCountry}
            placeholder="Select a country"
            styles={blankStyles}
            className="form-control country-selector"
          />
          <FontAwesomeIcon icon={faGlobe} />
        </div>
        <div className="form-group three">
          <div className="form-wrapper">
            <input type="text" placeholder="State" className="form-control" />
            <FontAwesomeIcon icon={faHouseFlag} />
          </div>
          <div className="form-wrapper">
            <input type="text" placeholder="City" className="form-control" />
            <FontAwesomeIcon icon={faTreeCity} />
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="ZIP Code"
              maxLength={10}
              className="form-control"
            />
            <FontAwesomeIcon icon={faMapLocationDot} />
          </div>
        </div>
        <div className="form-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
          />
          <FontAwesomeIcon icon={faLock} />
        </div>
        <div className="form-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
          />
          <FontAwesomeIcon icon={faLock} />
        </div>
        <button id="signup-btn">
          Sign Up
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
