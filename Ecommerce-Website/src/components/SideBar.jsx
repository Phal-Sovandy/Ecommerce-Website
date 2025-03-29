import React, { useState } from "react";

import "../styles/component-styles/SideBar.css";
import { ALL_CATEGORIES } from "../data/products.js";

function SideBar({ products, setFilteredProducts, showSideBar }) {
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

  function isInPriceRange(product, selectedPriceRange) {
    const [min, max] = selectedPriceRange;
    return max !== null
      ? product.priceCents / 100 >= min && product.priceCents / 100 <= max
      : product.priceCents / 100 >= min;
  }

  function hasMatchingCategory(product, selectedCategories) {
    for (let category of selectedCategories) {
      if (product.keywords.includes(category)) {
        return true;
      }
    }
    return false;
  }

  function handleGenderChange(gender) {
    setFilters((f) => {
      const newGender = f.gender.includes(gender)
        ? f.gender.filter((g) => g !== gender)
        : [...f.gender, gender];
      return { ...f, gender: newGender };
    });
  }
  function handleMatchingGender(product, targetGender) {
    for (let gender of targetGender) {
      {
        /*product contains its gender in its keyword, so if the product have the target gender in thier keywords or doesn't contain any gender in their keywords return true*/
      }
      if (
        product.keywords.includes(gender) ||
        (!product.keywords.includes("mens") &&
          !product.keywords.includes("womens"))
      ) {
        return true;
      }
    }
    return false;
  }

  function applyFilters() {
    let filtered = products;

    if (filters.available) {
      filtered = filtered.filter((p) => p.stock > 0);
    }
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        hasMatchingCategory(p, filters.categories)
      );
    }
    if (filters.priceRange) {
      filtered = filtered.filter((p) => isInPriceRange(p, filters.priceRange));
    }
    if (filters.gender.length > 0) {
      filtered = filtered.filter((p) =>
        handleMatchingGender(p, filters.gender)
      );
    }
    setFilteredProducts(filtered);
  }

  function countAvailableProduct() {
    let filtered = products;
    filtered = filtered.filter((p) => p.stock > 0);
    return filtered.length;
  }
  function countProductInFilter(category) {
    let filtered = products;
    filtered = filtered.filter((p) => p.keywords.includes(category));
    return filtered.length;
  }
  function countProductInPriceRange(priceRange) {
    let filtered = products;
    filtered = filtered.filter((p) => isInPriceRange(p, priceRange));
    return filtered.length;
  }
  function countProductByGender(category) {
    let filtered = products;
    filtered = filtered.filter(
      (p) =>
        p.keywords.includes(category) ||
        (!p.keywords.includes("mens") && !p.keywords.includes("womens"))
    );
    return filtered.length;
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
                Available In Stock ({countAvailableProduct()})
              </label>
            </li>
          </ul>
        </div>
        <div className="constraint type">
          <h3>By Product Type</h3>
          <ul>
            {ALL_CATEGORIES.map((category) => (
              <li>
                <label key={category}>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category[0].toUpperCase() + category.slice(1)} (
                  {countProductInFilter(category)})
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
                  ({countProductInPriceRange(priceRange)})
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="constraint gender">
          <h3>By Gender</h3>
          <ul>
            {["mens", "womens"].map((gender, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleGenderChange(gender)}
                  />
                  {gender} ({countProductByGender(gender)})
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button id="apply-filter-btn" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
