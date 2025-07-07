import React, { useState, useEffect, useRef, useCallback } from "react";
import ViewModal from "../../components/admin/ViewModal";
import EditModal from "../../components/admin/EditModal";

import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import "../../styles/admin/SellerPage.css";

const countries = ["USA", "UK", "Canada", "Australia", "Germany", "Japan"];
const genders = ["Male", "Female"];

// Simulated seller data
const allSellers = Array.from({ length: 5000 }, (_, i) => ({
  seller_id: i + 1,
  name: `Seller ${i + 1}`,
  email: `seller${i + 1}@example.com`,
  phone: `096-727-${String(i + 1).padStart(4, "0")}`,
  gender: genders[i % genders.length],
  country: countries[i % countries.length],
  joined: "2025-02-01",
  status: i % 2 === 0 ? "Active" : "Inactive",
}));
const sampleSellerInfo = {
  first_name: "Alice",
  last_name: "Johnson",
  username: "alicej",
  email: "alice.johnson@example.com",
  phone_number: "012-345-678",
  address_line1: "123 Main Street",
  address_line2: "Apt 4B",
  gender: "female",
  birthdate: new Date("1995-06-15"), // IMPORTANT: use Date object, not string
  country: { value: "US", label: "United States" }, // for react-select
  state: "California",
  city: "Los Angeles",
  zipcode: "90001",
};

const PAGE_SIZE = 50;

const SellerPage = () => {
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const [showSellerEditInfo, setShowSellerEditInfo] = useState(false);
  const [visibleSellers, setVisibleSellers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const loadSellers = () => {
      setLoading(true);

      setTimeout(() => {
        const filtered = allSellers.filter(
          (s) =>
            s.name.toLowerCase().includes(search.toLowerCase().trim()) ||
            s.email.toLowerCase().includes(search.toLowerCase().trim()) ||
            s.country.toLowerCase().includes(search.toLowerCase().trim())
        );
        const start = 0;
        const end = PAGE_SIZE * page;
        setVisibleSellers(filtered.slice(start, end));
        setLoading(false);
      }, 500); // simulate delay
    };

    loadSellers();
  }, [page, search]);

  const filteredTotal = allSellers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      s.email.toLowerCase().includes(search.toLowerCase().trim()) ||
      s.country.toLowerCase().includes(search.toLowerCase().trim())
  ).length;

  const lastSellerRef = useCallback(
    (node) => {
      if (loading || visibleSellers.length >= filteredTotal) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleSellers.length, filteredTotal]
  );

  return (
    <div className="listing-page">
      <EditModal
        show={showSellerEditInfo}
        onClose={() => setShowSellerEditInfo(false)}
        info={sampleSellerInfo}
        titel="Seller"
      />
      <ViewModal
        show={showSellerInfo}
        onClose={() => setShowSellerInfo(false)}
        info={sampleSellerInfo}
        titel="Seller"
      />
      <header className="listing-page-head">
        <h1>Seller Management</h1>
        <input
          type="text"
          placeholder="Search by name or email or country..."
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
            <option value="nameAsc">Sort By Name ↑</option>
            <option value="nameDesc">Sort By Name ↓</option>
            <option value="joinedAsc">Sort By Joined Date ↑</option>
            <option value="joinedDesc">Sort By Joined Date ↓</option>
          </select>
        </div>
      </header>
      <div className="table-wrapper seller">
        <table className="listing-table">
          <thead>
            <tr>
              <th>seller ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleSellers.map((seller, index) => {
              const isLast = index === visibleSellers.length - 1;
              return (
                <tr key={seller.seller_id} ref={isLast ? lastSellerRef : null}>
                  <td className="entity-id">
                    SELLER{String(seller.seller_id).padStart(7, "0")}
                  </td>
                  <td>{seller.name}</td>
                  <td><a href="mailto:seller@gmail.com">{seller.email}</a></td>
                  <td>{seller.phone}</td>
                  <td>{seller.gender}</td>
                  <td>{seller.country}</td>
                  <td>{seller.joined}</td>
                  <td className="status">
                    <div
                      className={`status-toggle ${
                        seller.status === "Active" ? "active" : ""
                      }`}
                    >
                      {seller.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setShowSellerInfo(true)}
                    >
                      View
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => setShowSellerEditInfo(true)}
                    >
                      Edit
                    </button>
                    <button
                      className={
                        seller.status === "Inactive"
                          ? "activate-btn"
                          : "deactivate-btn"
                      }
                    >
                      {seller.status === "Inactive" ? "Activate" : "Deactivate"}
                      {/* Important: Activate or deactivate change only the status not delete the row from the database */}
                    </button>
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

        {!loading && visibleSellers.length >= filteredTotal && (
          <p className="end-loading-list">No more sellers to load.</p>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
