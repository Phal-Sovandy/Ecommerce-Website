import React, { useState, useEffect, useRef, useCallback } from "react";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

import "../../styles/admin/BecomeASeller.css";

const dummyRequests = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  customerId: i + 1,
  full_name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `012-345-${String(i + 1).padStart(4, "0")}`,
  request_date: "2025-07-06",
  status: i % 2 === 0 ? "approved" : "pending",
}));

const PAGE_SIZE = 50;

const BecomeASeller = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const loadRequests = () => {
      setLoading(true);

      const filtered = dummyRequests.filter(
        (r) =>
          r.full_name.toLowerCase().includes(search.toLowerCase().trim()) ||
          r.email.toLowerCase().includes(search.toLowerCase().trim()) ||
          r.phone.includes(search.trim())
      );

      const start = 0;
      const end = PAGE_SIZE * page;
      setRequests(filtered.slice(start, end));
      setLoading(false);
    };

    loadRequests();
  }, [page, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredTotal = dummyRequests.filter(
    (r) =>
      r.full_name.toLowerCase().includes(search.toLowerCase().trim()) ||
      r.email.toLowerCase().includes(search.toLowerCase().trim()) ||
      r.phone.includes(search.trim())
  ).length;

  const lastRequestRef = useCallback(
    (node) => {
      if (loading || requests.length >= filteredTotal) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, requests.length, filteredTotal]
  );

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
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
          <select defaultValue={""}>
            <option value="">Filter Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
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
            {requests.map((req, index) => {
              const isLast = index === requests.length - 1;
              return (
                <tr key={req.id} ref={isLast ? lastRequestRef : null}>
                  <td className="entity-id">
                    REQ{String(req.id).padStart(5, "0")}
                  </td>
                  <td className="entity-id">
                    CUST{String(req.customerId).padStart(5, "0")}
                  </td>
                  <td>{req.full_name}</td>
                  <td>
                    <a href={`mailto:${req.email}`}>{req.email}</a>
                  </td>
                  <td>{req.phone}</td>
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
                          onClick={() => handleApprove(req.id)}
                          disabled={req.status !== "pending"}
                        >
                          Approve
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleReject(req.id)}
                          disabled={req.status !== "pending"}
                        >
                          Reject
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
            {requests.length === 0 && !loading && (
              <tr>
                <td colSpan="7">No seller requests found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && (
          <div className="loader">
            <Quantum size="40" speed="1.75" color="black" />
          </div>
        )}

        {!loading && requests.length >= filteredTotal && (
          <p className="end-loading-list">No more requests to load.</p>
        )}
      </div>
    </div>
  );
};

export default BecomeASeller;
