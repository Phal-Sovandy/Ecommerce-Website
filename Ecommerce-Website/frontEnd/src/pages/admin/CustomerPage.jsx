import React, { useState, useEffect, useRef, useCallback } from "react";

import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import "../../styles/admin/CustomerPage.css";

const countries = ["USA", "UK", "Canada", "Australia", "Germany", "Japan"];
const genders = ["Male", "Female"];

const allCustomers = Array.from({ length: 100 }, (_, i) => ({
  customer_id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  phone: `096-727-${String(i + 1).padStart(4, "0")}`,
  gender: genders[i % genders.length],
  country: countries[i % countries.length],
  joined: "2025-01-01",
  status: i % 2 === 0 ? "Active" : "Inactive",
}));

const PAGE_SIZE = 50;

const CustomerPage = () => {
  const [visibleCustomers, setVisibleCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const loadCustomers = () => {
      setLoading(true);

      const filtered = allCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          c.email.toLowerCase().includes(search.toLowerCase().trim()) ||
          c.country.toLowerCase().includes(search.toLowerCase().trim())
      );

      const start = 0;
      const end = PAGE_SIZE * page;

      setVisibleCustomers(filtered.slice(start, end));
      setLoading(false);
    };

    loadCustomers();
  }, [page, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredTotal = allCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      c.email.toLowerCase().includes(search.toLowerCase().trim()) ||
      c.country.toLowerCase().includes(search.toLowerCase().trim())
  ).length;

  const lastCustomerRef = useCallback(
    (node) => {
      if (loading || visibleCustomers.length >= filteredTotal) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleCustomers.length, filteredTotal]
  );

  return (
    <div className="listing-page">
      <header className="listing-page-head">
        <h1>Customer Management</h1>
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
      <div className="table-wrapper customer">
        <table className="listing-table">
          <thead>
            <tr>
              <th>Customer ID</th>
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
            {visibleCustomers.map((customer, index) => {
              const isLast = index === visibleCustomers.length - 1;
              return (
                <tr
                  key={customer.customer_id}
                  ref={isLast ? lastCustomerRef : null}
                >
                  <td className="entity-id">
                    CUST{String(customer.customer_id).padStart(7, "0")}
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.country}</td>
                  <td>{customer.joined}</td>
                  <td class="status">
                    <div
                      className={`status-toggle ${
                        customer.status === "Active" ? "active" : ""
                      }`}
                    >
                      {customer.status}
                    </div>
                  </td>
                  <td>
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
                    <button
                      className={
                        customer.status === "Inactive"
                          ? "activate-btn"
                          : "deactivate-btn"
                      }
                    >
                      {customer.status === "Inactive"
                        ? "Activate"
                        : "Deactivate"}
                    </button>{" "}
                    {/* Important: Activate or deactivate change only the status not delete the row from the database */}
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

        {!loading && visibleCustomers.length >= filteredTotal && (
          <p className="end-loading-list">No more customers to load.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
