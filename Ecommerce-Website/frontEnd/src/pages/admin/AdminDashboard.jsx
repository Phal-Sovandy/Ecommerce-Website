import React, { useState } from "react";
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

// Sample raw data (for demo)
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
  labels: ["Pending", "Shipped", "Delivered", "Canceled"],
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

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
};

const AdminDashboard = () => {
  const [dateFilter, setDateFilter] = useState({ type: "month" });

  // Directly use raw data here (replace with your real filtered data logic)
  const filteredUserData = rawUserData;
  const filteredRevenueData = rawRevenueData;
  const filteredOrderStatusData = rawOrderStatusData;
  const filteredSalesByCategoryData = rawSalesByCategoryData;
  const filteredTopProductsData = rawTopProductsData;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <DateFilter onChange={setDateFilter} />

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

      <div className="charts-grid">
        <div className="chart-box">
          <h3>New Users Per Month</h3>
          <Bar data={filteredUserData} options={options} />
        </div>

        <div className="chart-box">
          <h3>Revenue Over Time</h3>
          <Line data={filteredRevenueData} options={options} />
        </div>

        <div className="chart-box">
          <h3>Order Status Breakdown</h3>
          <Pie data={filteredOrderStatusData} options={options} />
        </div>

        <div className="chart-box">
          <h3>Sales by Category</h3>
          <Doughnut data={filteredSalesByCategoryData} options={options} />
        </div>

        <div className="chart-box">
          <h3>Top Selling Products</h3>
          <Bar data={filteredTopProductsData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


const DateFilter = ({ onChange }) => {
  const [filter, setFilter] = useState("month");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilter(val);
    if (val !== "custom") {
      onChange({ type: val });
    }
  };

  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    const newRange = { ...customRange, [name]: value };
    setCustomRange(newRange);

    if (newRange.from && newRange.to) {
      onChange({ type: "custom", from: newRange.from, to: newRange.to });
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <select value={filter} onChange={handleFilterChange}>
        <option value="day">Last Day</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="custom">Custom Range</option>
      </select>

      {filter === "custom" && (
        <div style={{ marginTop: 10 }}>
          <input
            type="date"
            name="from"
            value={customRange.from}
            onChange={handleCustomDateChange}
          />
          <input
            type="date"
            name="to"
            value={customRange.to}
            onChange={handleCustomDateChange}
            style={{ marginLeft: 10 }}
          />
        </div>
      )}
    </div>
  );
};
