import React, { useState, useEffect, useRef } from "react";
import { editSellerProfileInfo } from "../../api/admin/sellersPage.js"; // For seller (default)
import DatePicker from "react-datepicker";
import Select from "react-select";
import { getData } from "country-list";
import "react-datepicker/dist/react-datepicker.css";
import ModalInfo from "../common/modals/ModalInfo.jsx";

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
  faFeather,
} from "@fortawesome/free-solid-svg-icons";

const EditModal = ({
  show,
  onClose,
  info,
  title,
  refetch = () => {},
  type = "seller",
  onSubmitProfileInfo,
}) => {
  const countries = getData().map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const [form, setForm] = useState({
    ...info,
    country: countries.find((c) => c.label === info?.country) || null,
    birth_date: info?.birth_date ? new Date(info.birth_date) : null,
  });

  useEffect(() => {
    setForm({
      ...info,
      country: countries.find((c) => c.label === info?.country) || null,
      birth_date: info?.birth_date ? new Date(info.birth_date) : null,
    });
  }, [info]);

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

  const [profileInputFile, setProfileInputFile] = useState(null);
  const [profileInputPreview, setProfileInputPreview] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileInputFile(file);
      setProfileInputPreview(URL.createObjectURL(file));
    }
  };

  const clearImageInputs = () => {
    setProfileInputPreview(null);
    setProfileInputFile(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (type === "customer") {
      formData.append("first_name", form.first_name || "");
      formData.append("last_name", form.last_name || "");
    }

    formData.append("username", form.username || "");
    formData.append("email", form.email || "");
    formData.append("phone", form.phone || "");
    formData.append("contact_person", form.contact_person || "");
    formData.append("bio", form.bio || "");
    formData.append("address_line1", form.address_line1 || "");
    formData.append("address_line2", form.address_line2 || "");
    formData.append("country", form.country?.label || "");
    formData.append("state", form.state || "");
    formData.append("city", form.city || "");
    formData.append("zipcode", form.zipcode || "");

    if (type === "customer") {
      formData.append("gender", form.gender || "");
      formData.append(
        "birth_date",
        form.birth_date ? form.birth_date.toISOString().split("T")[0] : ""
      );
    }

    if (profileInputFile) {
      formData.append("profile_picture", profileInputFile);
    }

    try {
      if (onSubmitProfileInfo) {
        await onSubmitProfileInfo(info.customer_id || info.seller_id, formData);
      } else {
        await editSellerProfileInfo(info.seller_id, formData);
      }

      alert(`${title} updated successfully`);
      clearImageInputs();
      onClose();
      refetch();
    } catch (error) {
      console.error(`Failed to update ${title.toLowerCase()}:`, error);
      alert(`Failed to update ${title.toLowerCase()}`);
    }
  };

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ModalInfo
      head={false}
      show={show}
      onClose={() => {
        onClose();
        clearImageInputs();
      }}
    >
      <div className="inner edit">
        <h3>Edit {title} Information</h3>
        <div>
          <div className="image-holder">
            <img
              src={
                profileInputPreview ||
                form.profile_picture ||
                "https://dokan.co/app/uploads/2023/05/How-to-Become-an-eCommerce-Seller-7-Tips-from-Experts.png"
              }
              alt="Profile"
            />
            <div className="change-image" onClick={handleIconClick}>
              <FontAwesomeIcon icon={faImage} />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleProfileChange}
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            {type === "customer" && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  value={form.first_name || ""}
                  onChange={(e) => onChange("first_name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  value={form.last_name || ""}
                  onChange={(e) => onChange("last_name", e.target.value)}
                />
              </div>
            )}
            <div className="form-wrapper">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                value={form.username || ""}
                onChange={(e) => onChange("username", e.target.value)}
              />
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="form-wrapper">
              <input
                type="email"
                placeholder="Email Address"
                className="form-control"
                value={form.email || ""}
                onChange={(e) => onChange("email", e.target.value)}
              />
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="form-wrapper">
              <input
                type="tel"
                placeholder="Phone Number (eg. 012345678)"
                pattern="0\d{8,9}"
                maxLength={10}
                className="form-control"
                value={form.phone || ""}
                onChange={(e) => onChange("phone", e.target.value)}
              />
              <FontAwesomeIcon icon={faPhone} />
            </div>
            {type === "seller" && (
              <>
                <div className="form-wrapper">
                  <input
                    type="text"
                    placeholder="Contact Person"
                    className="form-control"
                    value={form.contact_person || ""}
                    onChange={(e) => onChange("contact_person", e.target.value)}
                  />
                  <FontAwesomeIcon icon={faFeather} />
                </div>
                <div className="form-wrapper">
                  <input
                    type="text"
                    placeholder="Bio"
                    className="form-control"
                    value={form.bio || ""}
                    onChange={(e) => onChange("bio", e.target.value)}
                  />
                  <FontAwesomeIcon icon={faFeather} />
                </div>
              </>
            )}
            {type === "customer" && (
              <div className="form-group">
                <div className="form-wrapper">
                  <select
                    className="form-control"
                    value={form.gender || ""}
                    onChange={(e) => onChange("gender", e.target.value)}
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                <div className="form-wrapper birthdate">
                  <DatePicker
                    selected={form.birth_date}
                    onChange={(date) => onChange("birth_date", date)}
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
            )}
            <div className="form-group">
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="Address Line 1 (eg. 123 Main Street)"
                  className="form-control"
                  value={form.address_line1 || ""}
                  onChange={(e) => onChange("address_line1", e.target.value)}
                />
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="Address Line 2 (eg. House No.123)"
                  className="form-control"
                  value={form.address_line2 || ""}
                  onChange={(e) => onChange("address_line2", e.target.value)}
                />
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
            </div>

            <div className="form-wrapper">
              <Select
                options={countries}
                value={form.country}
                onChange={(country) => onChange("country", country)}
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
                  placeholder="State"
                  className="form-control"
                  value={form.state || ""}
                  onChange={(e) => onChange("state", e.target.value)}
                />
                <FontAwesomeIcon icon={faHouseFlag} />
              </div>
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="City"
                  className="form-control"
                  value={form.city || ""}
                  onChange={(e) => onChange("city", e.target.value)}
                />
                <FontAwesomeIcon icon={faTreeCity} />
              </div>
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="ZIP Code"
                  maxLength={10}
                  className="form-control"
                  value={form.zipcode || ""}
                  onChange={(e) => onChange("zipcode", e.target.value)}
                />
                <FontAwesomeIcon icon={faMapLocationDot} />
              </div>
            </div>
            <button id="signup-btn" type="submit">
              Edit
              <FontAwesomeIcon icon={faUserPen} />
            </button>
          </form>
        </div>
      </div>
    </ModalInfo>
  );
};

export default EditModal;
