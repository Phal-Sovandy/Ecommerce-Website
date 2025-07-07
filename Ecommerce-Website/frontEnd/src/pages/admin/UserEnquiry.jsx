import React, { useState, useEffect, useRef, useCallback } from "react";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import "../../styles/admin/UserEnquiry.css";

const genders = ["male", "female"];
const roles = ["Customer", "Seller", "Visitor"];

const generateRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

const allEnquiries = Array.from({ length: 2000 }, (_, i) => ({
  enquiry_id: i + 1,
  full_name: `User ${i + 1}`,
  role: roles[i % roles.length],
  gender: genders[i % genders.length],
  country: ["USA", "UK", "Japan", "Australia", "Germany"][i % 5],
  region: `Region-${(i % 10) + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `023-456-${String(i).padStart(4, "0")}`,
  comment: `This is enquiry number ${i + 1}`,
  badge: i % 4 === 0 ? "Priority" : "",
  enquiry_date: generateRandomDate(),
}));

const PAGE_SIZE = 20;

const UserEnquiry = () => {
  const [visibleEnquiries, setVisibleEnquiries] = useState([]);
  const [enquiries, setEnquiries] = useState(allEnquiries);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingBadges, setLoadingBadges] = useState([]);
  const observer = useRef();

  useEffect(() => {
    const loadEnquiries = () => {
      setLoading(true);
      setTimeout(() => {
        const filtered = enquiries.filter(
          (u) =>
            u.full_name.toLowerCase().includes(search.toLowerCase().trim()) ||
            u.email.toLowerCase().includes(search.toLowerCase().trim()) ||
            u.phone.toLowerCase().includes(search.toLowerCase().trim()) ||
            u.enquiry_id.toString().includes(search.trim())
        );
        const start = 0;
        const end = PAGE_SIZE * page;
        setVisibleEnquiries(filtered.slice(start, end));
        setLoading(false);
      }, 600);
    };

    loadEnquiries();
  }, [page, search, enquiries]);

  const toggleBadge = async (enquiryId) => {
    setLoadingBadges((l) => [...l, enquiryId]);

    setEnquiries((e) =>
      e.map((u) =>
        u.enquiry_id === enquiryId
          ? { ...u, badge: u.badge ? "" : "Priority" }
          : u
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoadingBadges((l) => l.filter((id) => id !== enquiryId));
  };

  const filteredTotal = allEnquiries.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase().trim()) ||
      u.email.toLowerCase().includes(search.toLowerCase().trim()) ||
      u.phone.toLowerCase().includes(search.toLowerCase().trim()) ||
      u.enquiry_id.toString().includes(search.trim())
  ).length;

  const lastUserRef = useCallback(
    (node) => {
      if (loading || visibleEnquiries.length >= filteredTotal) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, visibleEnquiries.length, filteredTotal]
  );

  return (
    <div className="listing-page">
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
          <select defaultValue="">
            <option value="">Filter Priority</option>
            <option value="prioritized">Prioritized</option>
            <option value="non-prioritized">Non-Prioritized</option>
          </select>

          <select defaultValue="">
            <option value="">Filter Role</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="visitor">Visitor</option>
          </select>

          <select defaultValue="">
            <option value="">Filter Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select defaultValue="">
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
              <th>Comment</th>
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
                  <td className="entity-id">{`ENQ${String(
                    user.enquiry_id
                  ).padStart(6, "0")}`}</td>
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
                  <td>{user.phone}</td>
                  <td>{user.comment}</td>
                  <td>{user.enquiry_date}</td>
                  <td className="badge">
                    <button
                      className={`badge-toggle ${user.badge ? "active" : ""}`}
                      onClick={() => toggleBadge(user.enquiry_id)}
                      disabled={loadingBadges.includes(user.enquiry_id)}
                    >
                      {loadingBadges.includes(user.enquiry_id) ? (
                        <Quantum size="15" speed="1.75" color="black" />
                      ) : user.badge ? (
                        "Priority"
                      ) : (
                        "Regular"
                      )}
                    </button>
                  </td>
                  <td>
                    <button className="view-btn">View</button>
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
        {!loading && visibleEnquiries.length >= filteredTotal && (
          <p className="end-loading-list">No more enquiries to load.</p>
        )}
      </div>
    </div>
  );
};

export default UserEnquiry;
