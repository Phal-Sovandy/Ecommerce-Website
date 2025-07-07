import React, { useState } from "react";
import { ALL_CATEGORIES } from "../../../data/products.js";
import "../../../styles/customer/component-styles/shops/SideBar.css";

// Filter products sidebar.
function SideBar({ setFilteredProducts, showSideBar }) {
  const [filters, setFilters] = useState({
    available: false,
    categories: [],
    priceRange: null,
    gender: [],
  });

  function handleAvailabilityChange() {
    setFilters((f) => ({ ...f, available: !f.available }));
  }

  function handleCategoryChange(category) {
    setFilters((f) => {
      const newCategories = f.categories.includes(category)
        ? f.categories.filter((c) => c !== category)
        : [...f.categories, category];
      return { ...f, categories: newCategories };
    });
  }


  function handlePriceRangeChange(priceRange) {
    setFilters((f) => ({ ...f, priceRange: priceRange }));
  }



  function handleGenderChange(gender) {
    setFilters((f) => {
      const newGender = f.gender.includes(gender)
        ? f.gender.filter((g) => g !== gender)
        : [...f.gender, gender];
      return { ...f, gender: newGender };
    });
  }


  return (
    <aside className={showSideBar ? "" : "hide-side-bar"}>
      <div>
        <div className="constraint available">
          <h3>By Availability</h3>
          <ul>
            <li>
              <label>
                <input type="checkbox" onChange={handleAvailabilityChange} />
                Available In Stock (123)
              </label>
            </li>
          </ul> 
        </div>
        <div className="constraint type">
          <h3>By Product Category</h3>
          <ul>
            {ALL_CATEGORIES.map((category) => (
              <li>
                <label key={category}>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category[0].toUpperCase() + category.slice(1)} (
                  {123})
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="constraint type">
          <h3>By Product Department</h3>
          <ul>
            {ALL_CATEGORIES.map((category) => (
              <li>
                <label key={category}>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category[0].toUpperCase() + category.slice(1)} (
                  {123})
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="constraint price">
          <h3>By Product Price</h3>
          <ul>
            <li key="none-selected-price-range">
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  onChange={() => handlePriceRangeChange(null)}
                />
                None
              </label>
            </li>
            {[
              [0, 10],
              [10, 50],
              [50, 100],
              [100, 150],
              [150, 200],
              [200, null],
            ].map((priceRange, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="priceRange"
                    onChange={() => handlePriceRangeChange(priceRange)}
                  />
                  {`$${priceRange[0]} - $${
                    priceRange[1] ? priceRange[1] : "above"
                  }`}{" "}
                  (123)
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button id="apply-filter-btn" onClick={() => {}}>
          Apply Filters
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
