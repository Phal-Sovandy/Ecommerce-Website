import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  getAllUserEnquiry,
  getAUserEnquiry,
  filterUserEnquiry,
  changeEnquiryBadge,
  deleteUserEnquiry,
} from "../../api/admin/userEnquiryPage";
import EnquiryViewModal from "../../components/admin/EnquiryViewModal";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import "../../styles/admin/UserEnquiry.css";

const PAGE_SIZE = 50;

const UserEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);

  const [showEnquiryDetails, setShowEnquiryDetails] = useState(false);
  const [enquiryDetails, setEnquiryDetails] = useState({});
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("");
  const [refetch, setRefetch] = useState(0);

  const [visibleEnquiries, setVisibleEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await filterUserEnquiry(
          search,
          priority,
          sort,
          role,
          gender
        );
        setEnquiries(res);
      } catch (err) {
        setError(err.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [search, priority, sort, role, gender, refetch]);

  useEffect(() => {
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleEnquiries(enquiries?.slice(start, end));
  }, [page, enquiries]);

  const lastUserRef = useCallback(
    (node) => {
      if (loading || visibleEnquiries?.length >= enquiries?.length) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleEnquiries?.length, enquiries]
  );

  return (
    <div className="listing-page">
      <EnquiryViewModal
        show={showEnquiryDetails}
        onClose={() => setShowEnquiryDetails(false)}
        info={enquiryDetails}
      />
      <header className="listing-page-head">
        <h1>User Enquiry Management</h1>
        <input
          type="text"
          placeholder="Search by name, email, phone, or enquiry ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="listing-search"
        />
        <div className="listing-action">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Filter Priority</option>
            <option value="Priority">Prioritized</option>
            <option value="Regular">Regular</option>
          </select>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Filter Role</option>
            <option value="Customer">Customer</option>
            <option value="Seller">Seller</option>
            <option value="Guess">Guess</option>
          </select>

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Filter Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="nameAsc">Sort By Name ↑</option>
            <option value="nameDesc">Sort By Name ↓</option>
            <option value="dateAsc">Sort By Date ↑</option>
            <option value="dateDesc">Sort By Date ↓</option>
          </select>
        </div>
      </header>

      <div className="table-wrapper product">
        <table className="listing-table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Region</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Enquiry Date</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleEnquiries.map((user, index) => {
              const isLast = index === visibleEnquiries.length - 1;
              return (
                <tr key={user.enquiry_id} ref={isLast ? lastUserRef : null}>
                  <td className="entity-id">{user.enquiry_id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.role}</td>
                  <td>{user.gender}</td>
                  <td>{user.country}</td>
                  <td>{user.region}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className="email-link">
                      {user.email}
                    </a>
                  </td>
                  <td><a href={`tel:${user.phone}`}>{user.phone}</a></td>
                  <td>{user.enquiry_date}</td>
                  <td className="badge priority">
                    <button
                      type="button"
                      className={`badge-toggle ${
                        user.badge === "Priority" ? "active" : ""
                      }`}
                      onClick={async () => {
                        try {
                          if (user.badge === "Priority") {
                            await changeEnquiryBadge(
                              user.enquiry_id,
                              "Regular"
                            );
                          } else if (user.badge === "Regular") {
                            await changeEnquiryBadge(
                              user.enquiry_id,
                              "Priority"
                            );
                          }
                          setRefetch((r) => r + 1);
                        } catch (error) {
                          setError(error.message);
                        }
                      }}
                    >
                      {user.badge === "Priority" ? "Priority" : "Regular"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={async () => {
                        try {
                          const enquiry = await getAUserEnquiry(
                            user.enquiry_id
                          );
                          setEnquiryDetails(enquiry);
                          setShowEnquiryDetails(true);
                        } catch (error) {
                          setError(error.message);
                        }
                      }}
                    >
                      View
                    </button>
                    <button
                      className="delete-btn"
                      onClick={async () => {
                        try {
                          await deleteUserEnquiry(user.enquiry_id);
                          setRefetch((r) => r + 1);
                        } catch (error) {
                          setError(error.message);
                        }
                      }}
                    >
                      Delete
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
        {!loading && visibleEnquiries.length >= enquiries.length && (
          <p className="end-loading-list">No more enquiries to load.</p>
        )}
      </div>
    </div>
  );
};

export default UserEnquiry;
