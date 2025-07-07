import React, { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../../context/CartContext.jsx";
import ProductCard from "../../components/customer/shops/ProductCard.jsx";
import SideBar from "../../components/customer/shops/SideBar.jsx";
import ProductWindow from "../../components/customer/shops/ProductWindow.jsx";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faGlobe } from "@fortawesome/free-solid-svg-icons";
import "../../styles/customer/Shopping.css";

const sampleProductInfo = {
  title: "Men's Athletic Sneakers",
  categories: ["footwear"],
  departments: ["men", "sportswear"],
  images: [
    "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
  ],
  image:
    "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740",
  rating: 4.5,
  sold: 128,
  model_number: "SNKR-2025-XL",
  brand: "ZoomStep",
  manufacturer: "ZoomStep Inc.",
  weight: "950g",
  dimension: "30 x 18 x 12 cm",
  date_first_available: new Date("2025-06-01T00:00:00Z"),
  variations: ["Red", "Blue", "Black"],
  currency: "$",
  price: 69.99,
  discount: "10% off",
  description:
    "These men's athletic sneakers combine performance and style, featuring breathable mesh and durable soles. Perfect for running, walking, and gym workouts.",
  features: [
    "Breathable mesh upper",
    "Durable rubber sole",
    "Lightweight design",
    "Available in multiple colors",
    "Designed for sports and casual wear",
  ],
  sellerId: "SEL1234",
  seller_name: "Johny Bloke",
  badge: "Amazon's choice",
  root_bs_rank: 123,
  bs_rank: 12,
  subcategory_rank: [
    { subcategory_name: "Automotive", subcategory_rank: 12 },
    { subcategory_name: "Wheel & Repair", subcategory_rank: 120 },
  ],
  availability: "Only 5 available in stock"
};

const PAGE_SIZE = 50;
const fullProductArray = Array.from({ length: 5000 }, () => sampleProductInfo);

function Shopping() {
  const { addToCart } = useCart();
  const [showFilter, setShowFilter] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [windowProduct, setWindowProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  useEffect(() => {
    document.title = "Shops at Sooner";
  }, []);

  useEffect(() => {
    const loadProducts = () => {
      setLoading(true);

      setTimeout(() => {
        const start = 0;
        const end = PAGE_SIZE * page;
        setDisplayedProducts(fullProductArray.slice(start, end));
        setLoading(false);
      }, 1000);
    };

    loadProducts();
  }, [page]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading || displayedProducts.length >= fullProductArray.length)
        return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, displayedProducts.length]
  );

  return (
    <div>
      {showWindow && (
        <ProductWindow product={windowProduct} setShowState={setShowWindow} />
      )}
      <header>Shops</header>
      <main>
        <div id="top-product-menu">
          <div id="show-hide-filter" onClick={() => setShowFilter(!showFilter)}>
            <FontAwesomeIcon icon={showFilter ? faFilter : faGlobe} size="xl" />
            <h2>{showFilter ? "Filter Items" : "Show All Items"}</h2>
          </div>
          <input type="text" className="search-product" placeholder="Search Product by ASIN or Title" />
        </div>
        <section
          className={`shopping ${showFilter ? "" : "hide-side-bar-section"}`}
        >
          <SideBar setFilteredProducts={[]} showSideBar={showFilter} />
          <div className="products-container">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => {
                const isLast = index === displayedProducts.length - 1;
                return (
                  <div key={index} ref={isLast ? lastProductRef : null} className="loader">
                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                      showDetails={setShowWindow}
                      setShowItem={setWindowProduct}
                    />
                  </div>
                );
              })
            ) : (
              <h4 style={{ color: "grey" }}>No Product Found</h4>
            )}

            {loading && (
              <div className="loading-ui">
                <Quantum size="40" speed="1.75" color="black" />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Shopping;
