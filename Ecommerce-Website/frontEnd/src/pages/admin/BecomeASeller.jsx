import React, { useState, useEffect, useRef, useCallback } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import {
  getAllSellerRequests,
  changeCustomerStatus,
  filterRequest,
} from "../../api/admin/sellerRequests.js";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import "../../styles/admin/BecomeASeller.css";

const PAGE_SIZE = 50;

const BecomeASeller = () => {

  const {showError} = useModal();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await filterRequest(search, status, sort);
        setRequests(res);
      } catch (err) {
        showError(err.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [search, status, sort, refetch]);

  const [page, setPage] = useState(1);
  const [visibleRequest, setVisibleRequest] = useState([]);
  const observer = useRef();

  useEffect(() => {
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleRequest(requests?.slice(start, end));
  }, [page, requests]);

  const lastRequestRef = useCallback(
    (node) => {
      if (loading || visibleRequest.length >= requests.length) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleRequest.length, requests.length]
  );

  const handleStatusChange = async (id, status) => {
    try {
      await changeCustomerStatus(id, status);
      setRefetch((r) => r + 1);
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div className="listing-page">
      <header className="listing-page-head">
        <h1>Become a Seller Requests</h1>
        <input
          type="text"
          placeholder="Search by name or email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="listing-search"
        />
        <div className="listing-action">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Filter Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="nameAsc">Sort By Name ↑</option>
            <option value="nameDesc">Sort By Name ↓</option>
            <option value="joinedAsc">Sort By Joined Date ↑</option>
            <option value="joinedDesc">Sort By Joined Date ↓</option>
          </select>
        </div>
      </header>

      <div className="table-wrapper seller-request">
        <table className="listing-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Customer ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Requested On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((req, index) => {
              const isLast = index === requests.length - 1;
              return (
                <tr key={req.id} ref={isLast ? lastRequestRef : null}>
                  <td className="entity-id">{req.request_id}</td>
                  <td className="entity-id">{req.customer_id}</td>
                  <td>{`${req.first_name} ${req.last_name}`}</td>
                  <td>
                    <a href={`mailto:${req.email}`}>{req.email}</a>
                  </td>
                  <td><a href={`tel:${req.phone}`}>{req.phone}</a></td>
                  <td>{req.request_date}</td>
                  <td className="status">
                    <div
                      className={`status-toggle ${req.status.toLowerCase()}`}
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </div>
                  </td>
                  <td>
                    {req.status === "pending" ? (
                      <>
                        <button
                          className="view-btn"
                          onClick={() => {
                            handleStatusChange(req.request_id, "approved");
                          }}
                          disabled={req.status.toLowerCase() !== "pending"}
                        >
                          Approve
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            handleStatusChange(req.request_id, "rejected");
                          }}
                          disabled={req.status.toLowerCase() !== "pending"}
                        >
                          Reject
                        </button>
                      </>
                    ) : null}
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

        {!loading && requests.length >= requests.length && (
          <p className="end-loading-list">No more requests to load.</p>
        )}
      </div>
    </div>
  );
};

export default BecomeASeller;
