import React, { useState, useEffect, useRef, useCallback, use } from "react";
import ProductWindow from "../../components/customer/shops/ProductWindow";
import ProductInfo from "../../components/seller/ProductInfo";
import { Quantum } from "ldrs/react";
import {
  getAllProducts,
  getAProductsInfo,
  filterProduct,
  changeProductBadge,
} from "../../api/admin/productsPage.js";
import "ldrs/react/Quantum.css";
import "../../styles/admin/ProductPage.css";

const sampleProductInfo = {
  title: "Wireless Bluetooth Headphones",
  description: "Noise-cancelling over-ear headphones with long battery life.",
  model_number: "WBH-100X",
  feature: "Something Blah Blah Blah",
  weight: "250g",
  dimensions: "20 x 18 x 8 cm",
  department: ["technology", "kitchen", "bedroom"],
  variations: ["FJDDFDE:black", "FLENEFEF:blue", "FNELENFLE:red"],
  parent_asin: "B09XKXY1R9,B09XKXY1S1",
  input_asin: "B09XKXY2T2,B09XKXY3T3",
  state: "Battery, Plastic, Circuit Board",
  date_first_available: new Date("2024-08-15"),
};

const PAGE_SIZE = 20;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingBadges, setLoadingBadges] = useState([]);
  const observer = useRef();

  const [search, setSearch] = useState("");
  const [badge, setBadge] = useState("");
  const [discount, setDiscount] = useState("");
  const [sort, setSort] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [windowProduct, setWindowProduct] = useState(null);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const data = await filterProduct();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, [search, badge, discount, sort]);

  useEffect(() => {
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleProducts(products.slice(start, end));
  }, [page, products]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading || visibleProducts.length >= products.length) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleProducts.length, products]
  );

  const badgeClass = (product) => {
    const badge = product.badge?.toLowerCase().trim();
    if (badge === "amazon's  choice") return "amazon-choice";
    if (badge === "#1 best seller") return "best-seller";
    if (badge === "#1 new release") return "new-release";
    return "";
  };

  return (
    <div className="listing-page">
      {showWindow ? (
        <ProductWindow product={windowProduct} setShowState={setShowWindow} />
      ) : null}
      <ProductInfo
        show={showEdit}
        onClose={() => setShowEdit(false)}
        productInfo={sampleProductInfo}
        add={false}
      />
      <header className="listing-page-head">
        <h1>Product Management</h1>
        <input
          type="text"
          placeholder="Search by ASIN or title, Seller ID, Brand, Category or Available Date..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="listing-search"
          autoComplete="true"
          autoCorrect="true"
        />
        <div className="listing-action">
          <select
            defaultValue={badge}
            onChange={(e) => setBadge(e.target.value)}
          >
            <option value="">Filter Badge</option>
            <option value="no badge">No Badge</option>
            <option value="Amazon's  Choice">Amazon's Choice</option>
            <option value="#1 Best Seller">#1 Best Seller</option>
            <option value="#1 New Release">#1 New Release</option>
          </select>
          <select
            defaultValue={discount}
            onChange={(e) => setDiscount(e.target.value)}
          >
            <option value="">Filter Discount</option>
            <option value="discount">Discount</option>
            <option value="noDiscount">No Discount</option>
          </select>
          <select defaultValue={sort} onChange={(e) => setSort(e.target.value)}>
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
      </header>
      <div className="table-wrapper product">
        <table className="listing-table">
          <thead>
            <tr>
              <th>ASIN</th>
              <th>Seller ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Sold</th>
              <th>Brand</th>
              <th>Badge</th>
              <th>First Available Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleProducts.map((product, index) => {
              const isLast = index === visibleProducts.length - 1;
              return (
                <tr
                  key={product.product_id}
                  ref={isLast ? lastProductRef : null}
                >
                  <td className="entity-id">{product.asin}</td>
                  <td className={product.seller_id ? "" : "null"}>
                    {product.seller_id || "NO RECORD"}
                  </td>
                  <td className="long-content-cell">{product.title}</td>
                  <td className={`product-price ${!product.price && "null"}`}>
                    {product.price ? (
                      <>
                        {product.price} <span>{product.currency}</span>
                      </>
                    ) : (
                      "NO RECORD"
                    )}
                  </td>
                  <td>{product.discount}</td>
                  <td>{product.rating}</td>
                  <td>{product.sold}</td>
                  <td className={product.brand ? "" : "null"}>
                    {product.brand || "NO RECORD"}
                  </td>
                  <td className="badge">
                    <select
                      className={`badge-select ${badgeClass(product)}`}
                      onChange={async (e) => {
                        try {
                          await changeProductBadge(
                            product.asin,
                            e.target.value
                          );
                          const data = await filterProduct();
                          setProducts(data);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      value={product.badge || "No Badge"}
                    >
                      <option value="No Badge">No Badge</option>
                      <option value="Amazon's  Choice">Amazon's Choice</option>
                      <option value="#1 Best Seller">#1 Best Seller</option>
                      <option value="#1 New Release">#1 New Release</option>
                    </select>
                  </td>
                  <td className={product.firstAvailableDate ? "" : "null"}>
                    {product.firstAvailableDate || "NO RECORD"}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={async () => {
                        try {
                          const data = await getAProductsInfo(product.asin);
                          setWindowProduct(data);
                          setShowWindow(true);
                        } catch (err) {
                          setError(err);
                        }
                      }}
                    >
                      View
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => setShowEdit(true)}
                    >
                      Edit
                    </button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {loading && (
          <div className="loader">
            <Quantum size="40" speed="1.75" color="black" />
          </div>
        )}

        {!loading && visibleProducts.length >= products && (
          <p className="end-loading-list">No more products to load.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
