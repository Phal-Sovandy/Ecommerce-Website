import React, { useState, useEffect } from "react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import ProductCard from "../components/shops/ProductCard.jsx";
import SideBar from "../components/shops/SideBar.jsx";
import ProductWindow from "../components/shops/ProductWindow.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faGlobe } from "@fortawesome/free-solid-svg-icons";

import "../styles/Shopping.css";

function Shopping() {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilter, setShowFilter] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [windowProduct, setWindowProduct] = useState(null);

  useEffect(() => {
    document.title = "Shops at Sooner";
  });

  return (
    <div>
      {showWindow ? (
        <ProductWindow product={windowProduct} setShowState={setShowWindow} />
      ) : null}
      <header>Shops</header>
      <main>
        <div id="top-product-menu">
          <div id="show-hide-filter" onClick={() => setShowFilter(!showFilter)}>
            {showFilter ? (
              <FontAwesomeIcon icon={faFilter} size="xl"></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faGlobe} size="xl"></FontAwesomeIcon>
            )}
            {showFilter ? <h2>Filter Items</h2> : <h2>Show All Items</h2>}
          </div>
        </div>
        <section className={`shopping ${showFilter ? "" : "hide-side-bar-section"}`}>
          <SideBar
            products={products}
            setFilteredProducts={setFilteredProducts}
            showSideBar={showFilter}
          ></SideBar>
          <div className="products-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  showDetails={setShowWindow}
                  setShowItem={setWindowProduct}
                />
              ))
            ) : (
              <h4 style={{ color: "grey" }}>No Product Found</h4>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
export default Shopping;
