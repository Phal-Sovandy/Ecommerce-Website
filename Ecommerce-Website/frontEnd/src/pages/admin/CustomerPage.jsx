import React, { useState, useEffect, useRef, useCallback } from "react";
import ViewModal from "../../components/admin/ViewModal";
import EditModal from "../../components/admin/EditModal";
import {
  filterCustomer,
  getACustomerInfo,
  changeCustomerStatus,
  editCustomerProfileInfo,
} from "../../api/admin/customersPage";

import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import "../../styles/admin/CustomerPage.css";

const PAGE_SIZE = 50;

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [visibleCustomers, setVisibleCustomers] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  const [refetch, setRefetch] = useState(0);
  const [error, setError] = useState("");

  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showCustomerEditInfo, setShowCustomerEditInfo] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [sort, setSort] = useState("");

  const fetchAllCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await filterCustomer(search, status, gender, sort);
      setCustomers(res);
    } catch (err) {
      setError(err.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  }, [search, status, gender, sort]);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers, refetch]);

  useEffect(() => {
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleCustomers(customers?.slice(start, end));
  }, [page, customers]);

  const fetchCustomerInfo = async (customerId) => {
    try {
      const res = await getACustomerInfo(customerId);
      setCustomerInfo(res);
    } catch (err) {
      setError(err.message || "Failed to fetch customer info");
    } finally {
      setLoading(false);
    }
  };

  const lastCustomerRef = useCallback(
    (node) => {
      if (loading || visibleCustomers.length >= customers.length) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleCustomers.length, customers.length]
  );

  return (
    <div className="listing-page">
      <EditModal
        show={showCustomerEditInfo}
        onClose={() => setShowCustomerEditInfo(false)}
        info={customerInfo}
        title="Customer"
        type="customer"
        refetch={() => setRefetch((r) => r + 1)}
        onSubmitProfileInfo={editCustomerProfileInfo}
      />
      <ViewModal
        show={showCustomerInfo}
        onClose={() => setShowCustomerInfo(false)}
        info={customerInfo}
        title="Customer"
        type="customer"
      />

      <header className="listing-page-head">
        <h1>Customer Management</h1>
        <input
          type="text"
          placeholder="Search by ID, name, email, country, joined date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Filter Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
                  <td className="entity-id">{customer.customer_id}</td>
                  <td>{customer.name}</td>
                  <td>
                    <a href={`mailto:${customer.email}`}>{customer.email}</a>
                  </td>
                  <td>{customer.phone}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.country}</td>
                  <td>{customer.registration_date}</td>
                  <td className="status">
                    <div
                      className={`status-toggle ${
                        customer.status ? "active" : ""
                      }`}
                    >
                      {customer.status ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => {
                        fetchCustomerInfo(customer.customer_id);
                        setShowCustomerInfo(true);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        fetchCustomerInfo(customer.customer_id);
                        setShowCustomerEditInfo(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={
                        !customer.status ? "activate-btn" : "deactivate-btn"
                      }
                      onClick={async () => {
                        try {
                          await changeCustomerStatus(customer.customer_id);
                          setRefetch((r) => r + 1);
                        } catch (error) {
                          console.error("Error", error.message);
                          setError(error.message);
                        }
                      }}
                    >
                      {!customer.status ? "Activate" : "Deactivate"}
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
        {!loading && visibleCustomers.length >= customers.length && (
          <p className="end-loading-list">No more customers to load.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
