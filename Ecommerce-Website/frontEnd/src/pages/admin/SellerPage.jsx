import React, { useState, useEffect, useRef, useCallback } from "react";
import ViewModal from "../../components/admin/ViewModal";
import EditModal from "../../components/admin/EditModal";
import { getAllSellers, filterSeller } from "../../api/admin/sellersPage.js";

import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import "../../styles/admin/SellerPage.css";

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
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const [showSellerEditInfo, setShowSellerEditInfo] = useState(false);
  const [visibleSellers, setVisibleSellers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  // For header functionalities
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const fetchAllSellers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await filterSeller(search, status, sort);
      setSellers(res);
    } catch (error) {
      setError(error.message || "Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  }, [search, status, sort]);

  useEffect(() => {
    fetchAllSellers();
  }, [fetchAllSellers]);

  useEffect(() => {
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleSellers(sellers?.slice(start, end));
  }, [page, sellers]);

  const lastSellerRef = useCallback(
    (node) => {
      if (loading || visibleSellers?.length >= sellers?.length) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleSellers?.length, sellers]
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
          placeholder="Search by Seller ID, name, email, country, joined date..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="listing-search"
          autoComplete="true"
          autoCorrect="true"
        />
        <div className="listing-action">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Filter Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="nameAsc">Sort By Name ↑</option>
            <option value="nameDesc">Sort By Name ↓</option>
            <option value="dateAsc">Sort By Joined Date ↑</option>
            <option value="dateDesc">Sort By Joined Date ↓</option>
          </select>
        </div>
      </header>
      <div className="table-wrapper seller">
        <table className="listing-table">
          <thead>
            <tr>
              <th>Seller ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Person</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleSellers?.map((seller, index) => {
              const isLast = index === visibleSellers?.length - 1;
              return (
                <tr key={seller.seller_id} ref={isLast ? lastSellerRef : null}>
                  <td className="entity-id">{seller.seller_id}</td>
                  <td>{seller.seller_name}</td>
                  <td>
                    <a href="mailto:seller@gmail.com">{seller.email}</a>
                  </td>
                  <td>{seller.contact_person}</td>
                  <td>{seller.phone}</td>
                  <td>{seller.country}</td>
                  <td>{seller.registration_date}</td>
                  <td className="status">
                    <div
                      className={`status-toggle ${
                        seller.status ? "active" : ""
                      }`}
                    >
                      {seller.status ? "Active" : "Inactive"}
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
                        !seller.status ? "activate-btn" : "deactivate-btn"
                      }
                    >
                      {!seller.status ? "Activate" : "Deactivate"}
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

        {!loading && visibleSellers?.length >= sellers?.length && (
          <p className="end-loading-list">No more sellers to load.</p>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
