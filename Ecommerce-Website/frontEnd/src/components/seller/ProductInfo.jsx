import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/seller/ProductInfo.css";
import ModalInfo from "../common/modals/ModalInfo";
import ListInput from "../common/ListInput";
import { getAllDepartments } from "../../api/common/departments";
import { editProductInfo } from "../../api/admin/productsPage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faScaleBalanced,
  faTape,
  faTable,
  faBarcode,
  faNewspaper,
  faSun,
  faPenToSquare,
  faMoneyBill,
  faCoins,
  faTag,
  faFlask,
  faFlag,
  faIndustry,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const ProductInfo = ({
  show,
  onClose,
  productInfo = {},
  setProductInfo = () => {},
  add,
  triggerRefetch
}) => {
  const [allDeparments, setAllDepartments] = useState([]);

  const [categories, setCategories] = useState(productInfo.categories || []);
  const [variations, setVariations] = useState(productInfo.variations || []);
  const [features, setFeatures] = useState(productInfo.features || []);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setCategories(productInfo.categories);
    setFeatures(productInfo.features);
    setVariations(productInfo.variations);
  }, [productInfo]);

  useEffect(() => {
    if (productInfo?.date_first_available) {
      const parsedDate = new Date(productInfo.date_first_available);
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(null);
    }
  }, [productInfo]);

  useEffect(() => {
    async function fetchDepartments() {
      let departmentOptions = await getAllDepartments();
      departmentOptions = departmentOptions.map((option) => ({
        value: option.department_id,
        label: option.name,
      }));
      setAllDepartments(departmentOptions);
    }
    fetchDepartments();
  }, []);

  const mainImageRef = useRef(null);
  const additionalImageRefs = [useRef(null), useRef(null), useRef(null)];

  const handleMainImageClick = () => mainImageRef.current.click();
  const handleAdditionalImageClick = (index) =>
    additionalImageRefs[index].current.click();

  const [mainImageFile, setMainImageFile] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([
    null,
    null,
    null,
  ]);
  const [updatedImageIndexes, setUpdatedImageIndexes] = useState([]);

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([
    null,
    null,
    null,
  ]);

  const clearImageInputs = () => {
    setAdditionalImagePreviews([null, null, null]);
    setMainImagePreview(null);
    setMainImageFile(null);
    setAdditionalImageFiles([null, null, null]);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFiles = [...additionalImageFiles];
      const updatedPreviews = [...additionalImagePreviews];

      updatedFiles[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);

      setAdditionalImageFiles(updatedFiles);
      setAdditionalImagePreviews(updatedPreviews);

      setUpdatedImageIndexes((u) => (u.includes(index) ? u : [...u, index]));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("asin", productInfo.asin);
    formData.append("title", productInfo.title || "");
    formData.append("description", productInfo.description || "");
    formData.append("price", productInfo.price || "No Price");
    formData.append("currency", productInfo.currency || "");
    formData.append("discount", productInfo.discount || "");
    formData.append("model_number", productInfo.model_number || "");
    formData.append("brand", productInfo.brand || "");
    formData.append("manufacturer", productInfo.manufacturer || "");
    formData.append("availability", productInfo.availability || "");
    formData.append("weight", productInfo.weight || "");
    formData.append("dimension", productInfo.dimension || "");
    formData.append("ingredients", productInfo.ingredients || "");
    if (
      productInfo.department_id !== null &&
      productInfo.department_id !== undefined
    ) {
      formData.append("department_id", productInfo.department_id);
    }
    formData.append("departments", productInfo.departments);
    formData.append(
      "date_first_available",
      selectedDate ? selectedDate.toISOString().split("T")[0] : ""
    );
    formData.append("categories", JSON.stringify(categories));
    formData.append("features", JSON.stringify(features));
    formData.append("variations", JSON.stringify(variations));

    if (mainImageFile) {
      formData.append("image_url", mainImageFile);
    }

    updatedImageIndexes.forEach((index) => {
      const file = additionalImageFiles[index];
      if (file) {
        formData.append("images", file);
      }
    });
    formData.append("imageIndexes", JSON.stringify(updatedImageIndexes));

    try {
      await editProductInfo(productInfo.asin, formData);
      alert("Product updated successfully");
      onClose();
      clearImageInputs();
      triggerRefetch();
      
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product");
    }
  };

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
    <ModalInfo
      head={false}
      show={show}
      onClose={() => {
        onClose();
        clearImageInputs();
      }}
    >
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
              src={mainImagePreview || productInfo.image}
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
              onChange={handleMainImageChange}
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
                  src={
                    additionalImagePreviews[index] ||
                    productInfo.images?.[index]
                  }
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
                  onChange={(e) => handleAdditionalImageChange(index, e)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Product Form */}
        <form
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          {/* Title */}
          <div className={`form-group ${productInfo.title ? "has-value" : ""}`}>
            <input
              type="text"
              id="title"
              value={productInfo.title}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, title: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="title">Title</label>
            <FontAwesomeIcon icon={faSun} />
          </div>

          {/* Description */}
          <div
            className={`form-group ${
              productInfo.description ? "has-value" : ""
            }`}
          >
            <input
              type="text"
              id="description"
              value={productInfo.description}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, description: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="description">Description</label>
            <FontAwesomeIcon icon={faNewspaper} />
          </div>

          {/* Availability */}
          <div
            className={`form-group ${
              productInfo.availability ? "has-value" : ""
            }`}
          >
            <input
              type="text"
              id="price"
              value={productInfo.availability}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, availability: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="price">Availability</label>
            <FontAwesomeIcon icon={faMoneyBill} />
          </div>
          {/* Price */}
          <div className={`form-group ${productInfo.price ? "has-value" : ""}`}>
            <input
              type="text"
              id="price"
              value={productInfo.price}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, price: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="price">Price</label>
            <FontAwesomeIcon icon={faMoneyBill} />
          </div>

          {/* Currency */}
          <div
            className={`form-group ${productInfo.currency ? "has-value" : ""}`}
          >
            <input
              type="text"
              id="currency"
              value={productInfo.currency}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, currency: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="currency">Currency</label>
            <FontAwesomeIcon icon={faCoins} />
          </div>

          {/* Discount */}
          <div
            className={`form-group ${productInfo.discount ? "has-value" : ""}`}
          >
            <input
              type="text"
              id="discount"
              value={productInfo.discount}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, discount: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="discount">Discount</label>
            <FontAwesomeIcon icon={faTag} />
          </div>

          {/* Model Number */}
          <div
            className={`form-group ${
              productInfo.model_number ? "has-value" : ""
            }`}
          >
            <input
              type="text"
              id="modelNumber"
              value={productInfo.model_number}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, model_number: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="modelNumber">Model Number</label>
            <FontAwesomeIcon icon={faBarcode} />
          </div>

          {/* Brand */}
          <div className={`form-group ${productInfo.brand ? "has-value" : ""}`}>
            <input
              type="text"
              id="brand"
              value={productInfo.brand}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, brand: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="brand">Brand</label>
            <FontAwesomeIcon icon={faFlag} />
          </div>

          {/* Manufacturer */}
          <div
            className={`form-group ${
              productInfo.manufacturer ? "has-value" : ""
            }`}
          >
            <input
              type="text"
              id="manufacturer"
              value={productInfo.manufacturer}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, manufacturer: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="manufaturer">Manufacturer</label>
            <FontAwesomeIcon icon={faIndustry} />
          </div>

          {/* Department */}
          <div
            className={`form-group ${
              productInfo.departments ? "has-value" : ""
            } react-select-wrapper department`}
          >
            <label className="floating-label">Department</label>
            <Select
              options={allDeparments}
              value={allDeparments.find(
                (option) => option.value === productInfo.department_id
              )}
              onChange={(option) =>
                setProductInfo((p) => ({
                  ...p,
                  departments: option.label,
                  department_id: option.value,
                }))
              }
              placeholder=""
              classNamePrefix="react-select"
              styles={blankStyles}
            />
            <FontAwesomeIcon icon={faTable} />
          </div>

          {/* Cateogory */}
          <ListInput
            isKeyValue={false}
            data={categories}
            setData={setCategories}
            label="Add Category"
          />

          {/* Weight */}
          <div
            className={`form-group ${productInfo.weight ? "has-value" : ""}`}
          >
            <input
              type="text"
              id="weight"
              value={productInfo.weight}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, weight: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="weight">Product Weight</label>
            <FontAwesomeIcon icon={faScaleBalanced} />
          </div>

          {/* Dimensions */}
          <div
            className={`form-group ${productInfo.dimension ? "has-value" : ""}`}
          >
            <input
              type="text"
              id="dimensions"
              value={productInfo.dimension}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, dimension: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="dimensions">Product Dimensions</label>
            <FontAwesomeIcon icon={faTape} />
          </div>

          {/* Ingredients / State */}
          <div
            className={`form-group ${
              productInfo.ingredients ? "has-value" : ""
            }`}
          >
            <input
              type="text"
              id="state"
              value={productInfo.ingredients}
              onChange={(e) =>
                setProductInfo((p) => ({ ...p, ingredients: e.target.value }))
              }
              className="form-control"
              autoComplete="off"
            />
            <label htmlFor="state">Ingredients</label>
            <FontAwesomeIcon icon={faFlask} />
          </div>

          {/* Feature */}
          <ListInput
            isKeyValue={false}
            data={features}
            setData={setFeatures}
            label="Add Features"
          />

          {/* Product Variation */}
          <ListInput
            isKeyValue={true}
            data={variations}
            setData={setVariations}
            label="Add Variation"
          />

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
                onChange={(date) => {
                  setSelectedDate(date);
                  setProductInfo((p) => ({
                    ...p,
                    date_first_available:
                      date?.toISOString().split("T")[0] || "",
                  }));
                }}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText=""
              />
              <FontAwesomeIcon icon={faCalendar} />
            </div>
          ) : null}

          {/* Submit Button */}
          <button id="edit-btn" type="submit" onClick={() => {}}>
            {add ? "Add Product" : "Edit Product"}{" "}
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </form>
      </div>
    </ModalInfo>
  );
};

export default ProductInfo;
