import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin/AdminDashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// Sample data
const rawUserData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Users",
      data: [120, 200, 150, 300, 250, 400],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

const rawRevenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [5000, 7000, 6000, 8000, 7500, 9000],
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
      tension: 0.4,
    },
  ],
};

const rawOrderStatusData = {
  labels: ["Pending", "Shipping", "Delivered", "Canceled"],
  datasets: [
    {
      label: "Order Status",
      data: [50, 120, 300, 30],
      backgroundColor: ["#facc15", "#38bdf8", "#4ade80", "#f87171"],
    },
  ],
};

const rawSalesByCategoryData = {
  labels: ["Electronics", "Clothes", "Books", "Home"],
  datasets: [
    {
      label: "Sales by Category",
      data: [300, 200, 150, 100],
      backgroundColor: ["#60a5fa", "#f472b6", "#34d399", "#fbbf24"],
    },
  ],
};

const rawTopProductsData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      label: "Units Sold",
      data: [400, 320, 280, 220],
      backgroundColor: "rgba(153, 102, 255, 0.6)",
    },
  ],
};

const topCustomers = [
  { name: "Alice Johnson", totalSpent: 12000 },
  { name: "Bob Smith", totalSpent: 9500 },
  { name: "Carol Lee", totalSpent: 8700 },
  { name: "David Kim", totalSpent: 7900 },
  { name: "Ella Brown", totalSpent: 7100 },
];

const topSellers = [
  { name: "ElectroMart", totalSales: 24000 },
  { name: "FashionHub", totalSales: 21000 },
  { name: "BookNest", totalSales: 19800 },
  { name: "HomeStyle", totalSales: 18500 },
  { name: "GadgetCore", totalSales: 17200 },
];

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const filteredUserData = rawUserData;
  const filteredRevenueData = rawRevenueData;
  const filteredOrderStatusData = rawOrderStatusData;
  const filteredSalesByCategoryData = rawSalesByCategoryData;
  const filteredTopProductsData = rawTopProductsData;

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <div>
          <select defaultValue={"allTime"}>
            <option value="allTime">All time</option>
            <option value="today">Today</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
          <div className="log-out" onClick={logout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
        </div>
      </header>

      <div className="stats">
        <div className="stat-box">
          <h2>Total Users</h2>
          <p>12,345</p>
        </div>
        <div className="stat-box">
          <h2>Total Revenue</h2>
          <p>$84,000</p>
        </div>
        <div className="stat-box">
          <h2>Orders Today</h2>
          <p>432</p>
        </div>
      </div>

      <div className="top-user-row">
        <div className="top-user-section">
          <h3>Top 5 Customers</h3>
          <div className="user-cards-row">
            {topCustomers.map((customer, idx) => (
              <div className="user-card" key={idx}>
                <h4>{customer.name}</h4>
                <p>Total Spent: ${customer.totalSpent.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="top-user-section">
          <h3>Top 5 Sellers</h3>
          <div className="user-cards-row">
            {topSellers.map((seller, idx) => (
              <div className="user-card" key={idx}>
                <h4>{seller.name}</h4>
                <p>Total Sales: ${seller.totalSales.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="part-1">
          <div className="chart-box">
            <h3>New Users Per Month</h3>
            <Bar data={filteredUserData} options={options} />
          </div>

          <div className="chart-box">
            <h3>Top Selling Products</h3>
            <Bar data={filteredTopProductsData} options={options} />
          </div>

          <div className="chart-box">
            <h3>Revenue Over Time</h3>
            <Line data={filteredRevenueData} options={options} />
          </div>
        </div>

        <div className="part-2">
          <div className="chart-box">
            <h3>Order Status Breakdown</h3>
            <div>
              <Pie data={filteredOrderStatusData} options={options} />
            </div>
          </div>

          <div className="chart-box">
            <h3>Sales by Category</h3>
            <div>
              <Doughnut data={filteredSalesByCategoryData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
