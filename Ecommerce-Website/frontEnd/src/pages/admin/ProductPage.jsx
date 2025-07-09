import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductWindow from "../../components/customer/shops/ProductWindow";
import ProductInfo from "../../components/seller/ProductInfo";
import { Quantum } from "ldrs/react";
import {
  getAllProducts,
  getAProductsInfo,
} from "../../api/admin/productsPage.js";
import "ldrs/react/Quantum.css";
import "../../styles/admin/ProductPage.css";

const sampleProduct = {
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c0",
  image:
    "https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg",
  name: "Men's Athestic Sweater Color Grey",
  rating: {
    stars: 4.5,
    count: 69,
  },
  priceCents: 1680,
  keywords: ["top", "sweater", "shirt", "apparel", "mens"],
  stock: 10,
};

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
  const [showProduct, setShowProducts] = useState({});
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingBadges, setLoadingBadges] = useState([]);
  const observer = useRef();

  const [showEdit, setShowEdit] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [windowProduct, setWindowProduct] = useState(null);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const data = await getAllProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleProducts(products.slice(start, end));
  }, [page, products]);

  const toggleBadge = async (productId) => {
    setLoadingBadges((l) => [...l, productId]);

    setProducts((p) =>
      p.map((p) =>
        p.asin === productId
          ? { ...p, badge: p.badge ? "" : "Amazon's Choice" }
          : p
      )
    );
    // Testing
    await new Promise((resolve) => setTimeout(resolve, 600));

    setLoadingBadges((l) => l.filter((id) => id !== productId));
  };

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
          <select defaultValue={""}>
            <option value="">Filter Badge</option>
            <option value="amzonChoice">Amazon's Choice</option>
            <option value="bestSeller">#1 Best Seller</option>
            <option value="newRelease">#1 New Release</option>
          </select>
          <select defaultValue={""}>
            <option value="">Filter Discount</option>
            <option value="discount">Discount</option>
            <option value="noDiscount">No Discount</option>
          </select>
          <select defaultValue={"titleAsc"}>
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
                    <button
                      className={`badge-toggle ${
                        product.badge ? "active" : ""
                      }`}
                      onClick={() => toggleBadge(product.product_id)}
                      disabled={loadingBadges.includes(product.product_id)}
                    >
                      {loadingBadges.includes(product.product_id) ? (
                        <Quantum size="15" speed="1.75" color="black" />
                      ) : product.badge ? (
                        "Amazon's Choice"
                      ) : (
                        "No Badge"
                      )}
                    </button>
                  </td>
                  <td className={product.firstAvailableDate ? "" : "null"}>
                    {product.firstAvailableDate || "NO RECORD"}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={async () => {
                        try {
                          console.log(product.asin)
                          const data = await getAProductsInfo(
                            product.asin
                          );
                          setShowProducts(data);
                          setShowWindow(true);
                          setWindowProduct(showProduct);
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
