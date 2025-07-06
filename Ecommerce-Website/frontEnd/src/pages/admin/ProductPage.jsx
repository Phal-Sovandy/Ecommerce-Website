import React, { useState, useEffect, useRef, useCallback } from "react";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import "../../styles/admin/ProductPage.css";

const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

const allProducts = Array.from({ length: 5000 }, (_, i) => ({
  product_id: i + 1,
  asin: `ASIN${String(i + 1).padStart(6, "0")}`,
  seller_id: `SELLER${(i % 100) + 1}`,
  title: `Product ${i + 1}`,
  brand: ["Sony", "Nike", "Apple", "Samsung", "Adidas"][i % 5],
  category: i % 3 === 0 ? "Electronics" : i % 3 === 1 ? "Clothing" : "Home",
  price: (Math.random() * 100).toFixed(2),
  currency: currencies[i % currencies.length],
  discount: `${(Math.random() * 30).toFixed(0)}%`,
  rating: (Math.random() * 5).toFixed(1),
  sold: Math.floor(Math.random() * 1000),
  badge: i % 4 === 0 ? "Amazon's Choice" : "",
  firstAvailableDate: "2025-07-25",
}));

const PAGE_SIZE = 20;

const ProductPage = () => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [products, setProducts] = useState(allProducts);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingBadges, setLoadingBadges] = useState([]);
  const observer = useRef();

  useEffect(() => {
    const loadProducts = () => {
      setLoading(true);

      setTimeout(() => {
        const filtered = products.filter(
          (p) =>
            p.title.toLowerCase().includes(search.toLowerCase().trim()) ||
            p.seller_id.toLowerCase().includes(search.toLowerCase().trim()) ||
            p.asin.toLowerCase().includes(search.toLowerCase().trim()) ||
            p.firstAvailableDate
              .toLowerCase()
              .includes(search.toLowerCase().trim())
        );
        const start = 0;
        const end = PAGE_SIZE * page;
        setVisibleProducts(filtered.slice(start, end));
        setLoading(false);
      }, 600); // Simulate network delay
    };

    loadProducts();
  }, [page, search, products]);

  const toggleBadge = async (productId) => {
    setLoadingBadges((l) => [...l, productId]);

    setProducts((p) =>
      p.map((p) =>
        p.product_id === productId
          ? { ...p, badge: p.badge ? "" : "Amazon's Choice" }
          : p
      )
    );

    // Testing
    await new Promise((resolve) => setTimeout(resolve, 600));

    setLoadingBadges((l) => l.filter((id) => id !== productId));
  };

  const filteredTotal = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      p.seller_id.toLowerCase().includes(search.toLowerCase().trim()) ||
      p.asin.toLowerCase().includes(search.toLowerCase().trim()) ||
      p.firstAvailableDate.toLowerCase().includes(search.toLowerCase().trim())
  ).length;

  const lastProductRef = useCallback(
    (node) => {
      if (loading || visibleProducts.length >= filteredTotal) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleProducts.length, filteredTotal]
  );

  return (
    <div className="listing-page">
      <header className="listing-page-head">
        <h1>Product Management</h1>
        <input
          type="text"
          placeholder="Search by ASIN or title or Seller ID or Available Date..."
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
            <option value="">Filter Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select defaultValue={""}>
            <option value="">Filter Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select defaultValue={"nameAsc"}>
            <option value="titleAsc">Sort By Title ↑</option>
            <option value="titleDesc">Sort By Title ↓</option>
            <option value="priceAsc">Sort By Price ↑</option>
            <option value="priceDesc">Sort By Price ↓</option>
            <option value="soldAsc">Sort By Sold Unit ↑</option>
            <option value="soldDesc">Sort By Sold Unit ↓</option>
            <option value="dateAsc">Sort By Date ↑</option>
            <option value="dateDesc">Sort By Date ↓</option>
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
                  <td>{product.seller_id}</td>
                  <td>{product.title}</td>
                  <td className="product-price">
                    {product.price} <span>{product.currency}</span>
                  </td>
                  <td>{product.discount}</td>
                  <td>{product.rating}</td>
                  <td>{product.sold}</td>
                  <td>{product.brand}</td>
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
                  <td>{product.firstAvailableDate}</td>
                  <td>
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
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

        {!loading && visibleProducts.length >= filteredTotal && (
          <p className="end-loading-list">No more products to load.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
