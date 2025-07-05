import React, { useState, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/seller/ProductInfo.css";
import ModalInfo from "../common/modals/ModalInfo";
import ListInput from "../common/ListInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faScaleBalanced,
  faTape,
  faTable,
  faBarcode,
  faNewspaper,
  faSun,
  faCodeBranch,
  faCodeFork,
  faPenToSquare,
  faMoneyBill,
  faCoins,
  faTag,
  faFlask,
  faFlag,
  faCube,
  faIndustry,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const ProductInfo = ({ show, onClose, productInfo = {}, add }) => {
  const [variations, setVariations] = useState(productInfo.variations || []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(productInfo.description || "");
  const [price, setPrice] = useState(productInfo.price || "");
  const [currency, setCurrency] = useState(productInfo.currency || "");
  const [discount, setDiscount] = useState(productInfo.discount || "");
  const [modelNumber, setModelNumber] = useState(
    productInfo.model_number || ""
  );
  const [department, setDepartment] = useState(productInfo.department || "");
  const [weight, setWeight] = useState(productInfo.weight || "");
  const [dimensions, setDimensions] = useState(productInfo.dimensions || "");
  const [state, setState] = useState(productInfo.state || "");
  const [parentAsin, setParentAsin] = useState(productInfo.parent_asin || "");
  const [inputAsin, setInputAsin] = useState(productInfo.input_asin || "");
  const [selectedDate, setSelectedDate] = useState(
    productInfo.date_first_available || null
  );

  const departmentOptions = [
    { value: "technology", label: "Technologies" },
    { value: "kitchen", label: "Kitchen" },
  ];

  const [departmentSelect, setDepartmentSelect] = useState(
    departmentOptions.find((option) => option.value === "kitchen")
  );

  const mainImageRef = useRef(null);
  const additionalImageRefs = [useRef(null), useRef(null), useRef(null)];

  const handleMainImageClick = () => mainImageRef.current.click();
  const handleAdditionalImageClick = (index) =>
    additionalImageRefs[index].current.click();

  const blankStyles = {
    control: () => ({
      height: "30px",
      width: "100%",
      marginBottom: "25px",
    }),
    valueContainer: () => ({
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "10px 40px 10px 12px",
      height: "30px",
      width: "100%",
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
      marginTop: "-15px",
      backgroundColor: "#fff",
      fontSize: "13px",
      zIndex: 10000,
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
    <ModalInfo head={false} show={show} onClose={onClose}>
      <div className="inner edit-product">
        <h3>{add ? "Add Product To Shop" : "Edit Product Information"}</h3>

        {/* Image Upload Section */}
        <section className="image-section">
          {/* Main Image */}
          <div
            className="main-image-holder image-holder"
            onClick={handleMainImageClick}
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
              alt="Main Product"
              className="product-image"
            />
            <div className="change-image" title="Main Image">
              <FontAwesomeIcon icon={faImage} />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={mainImageRef}
              style={{ display: "none" }}
            />
          </div>

          {/* Additional Images */}
          <div className="additional-images">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="additional-image-holder image-holder"
                onClick={() => handleAdditionalImageClick(index)}
              >
                <img
                  src={`https://iso.500px.com/wp-content/uploads/2023/01/By-Donghao-2.jpeg`}
                  alt={`Additional ${index + 1}`}
                  className="product-image"
                />
                <div
                  className="change-image"
                  title={`Additional Image ${index + 1}`}
                >
                  <FontAwesomeIcon icon={faImage} />
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={additionalImageRefs[index]}
                  style={{ display: "none" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Product Form */}
        <form action="" onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div className={`form-group ${title ? "has-value" : ""}`}>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="title">Title</label>
            <FontAwesomeIcon icon={faSun} />
          </div>

          {/* Description */}
          <div className={`form-group ${description ? "has-value" : ""}`}>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="description">Description</label>
            <FontAwesomeIcon icon={faNewspaper} />
          </div>

          {/* Price */}
          <div className={`form-group ${price ? "has-value" : ""}`}>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="price">Price</label>
            <FontAwesomeIcon icon={faMoneyBill} />
          </div>

          {/* Currency */}
          <div className={`form-group ${currency ? "has-value" : ""}`}>
            <input
              type="text"
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="currency">Currency</label>
            <FontAwesomeIcon icon={faCoins} />
          </div>

          {/* Discount */}
          <div className={`form-group ${discount ? "has-value" : ""}`}>
            <input
              type="text"
              id="discount"
              value={price}
              onChange={(e) => setDiscount(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="discount">Discount</label>
            <FontAwesomeIcon icon={faTag} />
          </div>

          {/* Model Number */}
          <div className={`form-group ${modelNumber ? "has-value" : ""}`}>
            <input
              type="text"
              id="modelNumber"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="modelNumber">Model Number</label>
            <FontAwesomeIcon icon={faBarcode} />
          </div>

          {/* Brand */}
          <div className={`form-group ${modelNumber ? "has-value" : ""}`}>
            <input
              type="text"
              id="brand"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="brand">Brand</label>
            <FontAwesomeIcon icon={faFlag} />
          </div>

          {/* Manufacturer */}
          <div className={`form-group ${modelNumber ? "has-value" : ""}`}>
            <input
              type="text"
              id="manufacturer"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="manufaturer">Manufacturer</label>
            <FontAwesomeIcon icon={faIndustry} />
          </div>

          {/* Department */}
          <div
            className={`form-group ${
              department ? "has-value" : ""
            } react-select-wrapper department`}
          >
            <label className="floating-label">Department</label>
            <Select
              options={departmentOptions}
              value={department}
              onChange={setDepartment}
              placeholder=""
              classNamePrefix="react-select"
              styles={blankStyles}
            />
            <FontAwesomeIcon icon={faTable} />
          </div>

          {/* Cateogory */}
          <ListInput
            isKeyValue={false}
            data={department}
            setData={setDepartment}
            label="Add Category"
          />

          {/* Weight */}
          <div className={`form-group ${weight ? "has-value" : ""}`}>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="weight">Product Weight</label>
            <FontAwesomeIcon icon={faScaleBalanced} />
          </div>

          {/* Dimensions */}
          <div className={`form-group ${dimensions ? "has-value" : ""}`}>
            <input
              type="text"
              id="dimensions"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="dimensions">Product Dimensions</label>
            <FontAwesomeIcon icon={faTape} />
          </div>

          {/* Ingredients / State */}
          <div className={`form-group ${state ? "has-value" : ""}`}>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="state">Ingredients</label>
            <FontAwesomeIcon icon={faFlask} />
          </div>

          {/* Feature */}
          <div className={`form-group ${weight ? "has-value" : ""}`}>
            <input
              // TODO: Change to feature
              type="text"
              id="feature"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="feature">Features</label>
            <FontAwesomeIcon icon={faCube} />
          </div>

          {/* Product Variation */}
          <ListInput
            isKeyValue={true}
            data={variations}
            setData={setVariations}
            label="Add Variation"
          />

          {/* Parent ASIN */}
          <div className={`form-group ${parentAsin ? "has-value" : ""}`}>
            <input
              type="text"
              id="parentAsin"
              value={parentAsin}
              onChange={(e) => setParentAsin(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="parentAsin">Parent ASIN (Separated by comma)</label>
            <FontAwesomeIcon icon={faCodeBranch} />
          </div>

          {/* Input ASIN */}
          <div className={`form-group ${inputAsin ? "has-value" : ""}`}>
            <input
              type="text"
              id="inputAsin"
              value={inputAsin}
              onChange={(e) => setInputAsin(e.target.value)}
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="inputAsin">Input ASIN (Separated by comma)</label>
            <FontAwesomeIcon icon={faCodeFork} />
          </div>

          {/* Date First Available */}
          {!add ? (
            <div
              className={`form-group ${
                selectedDate ? "has-value" : ""
              } datepicker-wrapper`}
            >
              <label className="floating-label">Date First Available</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText=""
                className="form-control"
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
              />
              <FontAwesomeIcon icon={faCalendar} />
            </div>
          ) : null}

          {/* Submit Button */}
          <button id="edit-btn" type="submit">
            {add ? "Add Product" : "Edit Product"}{" "}
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </form>
      </div>
    </ModalInfo>
  );
};

export default ProductInfo;
