import React, { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../../context/CartContext.jsx";
import ProductCard from "../../components/customer/shops/ProductCard.jsx";
import SideBar from "../../components/customer/shops/SideBar.jsx";
import ProductWindow from "../../components/customer/shops/ProductWindow.jsx";
import {
  filterProduct,
  filterProductWithSidebar,
  getAProductsInfo,
} from "../../api/common/products.js";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faGlobe } from "@fortawesome/free-solid-svg-icons";
import "../../styles/customer/Shopping.css";

const PAGE_SIZE = 20;

function Shopping() {
  const { addToCart } = useCart();
  const [showFilter, setShowFilter] = useState(false);

  const [products, setProducts] = useState([]);

  // For Lazy-Loading implementation for web efficiency
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const observer = useRef();

  // For header functionalities
  const [search, setSearch] = useState("");
  const [badge, setBadge] = useState("");
  const [discount, setDiscount] = useState("");
  const [sort, setSort] = useState("");

  // For Sidebar filtering
  const [sideBarFilters, setSideBarFilters] = useState({
    available: false,
    categories: [],
    priceRange: null,
    department: [],
  });

  // For showing the product window
  const [showWindow, setShowWindow] = useState(false);
  const [windowProduct, setWindowProduct] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleShowProductWindow = async (asin) => {
    try {
      const data = await getAProductsInfo(asin);
      setWindowProduct(data);
      setShowWindow(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAllProducts = useCallback(async () => {
    setLoading(true); // Reset at start
    try {
      const data = await filterProductWithSidebar(
        search,
        badge,
        discount,
        sort,
        sideBarFilters
      );
      setProducts(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [search, badge, discount, sort, sideBarFilters]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts, refreshTrigger]);

  useEffect(() => {
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleProducts(products?.slice(start, end));
  }, [page, products]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading || visibleProducts?.length >= products?.length) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleProducts?.length, products]
  );

  return (
    <div className="customer-shop">
      {showWindow && (
        <ProductWindow product={windowProduct} setShowState={setShowWindow} />
      )}
      <header>Shops</header>
      <main>
        <div id="top-product-menu">
          <div>
            <div
              id="show-hide-filter"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FontAwesomeIcon
                icon={showFilter ? faFilter : faGlobe}
                size="xl"
              />
              <h2>{showFilter ? "Filter Items" : "Show All Items"}</h2>
            </div>
          </div>
          <input
            type="text"
            className="search-product"
            placeholder="Search Product by ASIN, title, department, category, seller,..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="listing-action">
            <select value={badge} onChange={(e) => setBadge(e.target.value)}>
              <option value="">Filter Badge</option>
              <option value="no badge">No Badge</option>
              <option value="Amazon's  Choice">Amazon's Choice</option>
              <option value="#1 Best Seller">#1 Best Seller</option>
              <option value="#1 New Release">#1 New Release</option>
            </select>
            <select
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option value="">Filter Discount</option>
              <option value="discount">Discount</option>
              <option value="noDiscount">No Discount</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="titleAsc">Sort By Title ↑</option>
              <option value="titleDesc">Sort By Title ↓</option>
              <option value="priceAsc">Sort By Price ↑</option>
              <option value="priceDesc">Sort By Price ↓</option>
              <option value="soldAsc">Sort By Sold Unit ↑</option>
              <option value="soldDesc">Sort By Sold Unit ↓</option>
              <option value="dateAsc">Sort By Date ↑</option>
              <option value="dateDesc">Sort By Date ↓</option>
              <option value="ratingAsc">Sort By Rating ↑</option>
              <option value="ratingDesc">Sort By Rating ↓</option>
            </select>
          </div>
        </div>
        <section
          className={`shopping ${showFilter ? "" : "hide-side-bar-section"}`}
        >
          <SideBar
            filters={sideBarFilters}
            setFilters={setSideBarFilters}
            showSideBar={showFilter}
          />

          <div className="products-container">
            {visibleProducts?.map((product, index) => {
              const isLast = index === visibleProducts?.length - 1;
              return (
                <div
                  key={index}
                  ref={isLast ? lastProductRef : null}
                  className="loader"
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    showDetails={() => handleShowProductWindow(product.asin)}
                  />
                </div>
              );
            })}
            {loading && (
              <div className="loader">
                <Quantum size="40" speed="1.75" color="black" />
              </div>
            )}

            {!loading && visibleProducts?.length >= products && (
              <p className="end-loading-list">No more products to load.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Shopping;
