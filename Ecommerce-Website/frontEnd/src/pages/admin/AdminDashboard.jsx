import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAdminDashboardData } from "../../api/admin/adminDashboard.js";
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
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

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

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("allTime");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getAdminDashboardData(timeFilter);
        setDashboardData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [timeFilter]);

  const totalUsers = dashboardData?.stats?.totalUsers;
  const totalRevenue = parseFloat(dashboardData?.stats?.totalRevenue[0]?.total);
  const ordersCount = dashboardData?.stats?.ordersCount;

  const topCustomers = dashboardData?.tops?.topCustomers?.map((c) => ({
    name: c["Order.customer.username"],
    totalSpent: parseFloat(c.totalSpent),
  }));

  const topSellers = dashboardData?.tops?.topSellers?.map((s) => ({
    seller_id: s["Order.seller.seller_id"],
    name: s["Order.seller.seller_name"],
    totalSales: parseFloat(s.totalSales),
  }));

  const newUsersPerMonth = {
    labels: dashboardData?.charts?.newUsersPerMonth?.map((item) =>
      new Date(item.month).toLocaleString("default", {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "New Users",
        data: dashboardData?.charts?.newUsersPerMonth?.map((item) =>
          parseInt(item.count)
        ),
        backgroundColor: "#40916c",
      },
    ],
  };

  const revenueOverTime = {
    labels: dashboardData?.charts?.revenueOverTime?.map((item) =>
      new Date(item.time_unit.split("T")[0]).toLocaleString("default", {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Revenue",
        data: dashboardData?.charts?.revenueOverTime?.map((item) =>
          parseFloat(item.revenue)
        ),
        borderColor: "#40916c",
        backgroundColor: "#1b4332",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const orderStatusCount = {
    labels: dashboardData?.charts?.orderStatusCount?.map((s) => s.status),
    datasets: [
      {
        label: "Orders",
        data: dashboardData?.charts?.orderStatusCount?.map((s) =>
          parseInt(s.count)
        ),
        backgroundColor: ["#081c15", "#1b4332", "#2d6a4f", "#40916c"],
      },
    ],
  };

  const salesByCategory = {
    labels: dashboardData?.charts?.salesByCategory.map((item) => item.name),
    datasets: [
      {
        label: "Sales by Category",
        data: dashboardData?.charts?.salesByCategory.map((item) =>
          parseInt(item.total_sold)
        ),
        backgroundColor: [
          "#081c15",
          "#1b4332",
          "#2d6a4f",
          "#40916c",
          "#52b788",
          "#74c69d",
          "#95d5b2",
          "#b7e4c7",
          "#d8f3dc",
        ],
      },
    ],
  };

  const topSellingProducts = {
    labels: dashboardData?.charts?.topSellingProducts.map(
      (p) => p["product.title"]
    ),
    datasets: [
      {
        label: "Units Sold",
        data: dashboardData?.charts?.topSellingProducts.map((p) =>
          parseInt(p.total_sold)
        ),
        backgroundColor: "#40916c",
      },
    ],
  };

  const timeFilterDisplay = () => {
    return timeFilter === "allTime" || timeFilter == null
      ? "All Time"
      : timeFilter === "today"
      ? "Today"
      : timeFilter === "thisMonth"
      ? "This Month"
      : timeFilter === "thisYear"
      ? "This Year"
      : "";
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <div>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
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
      {loading && (
        <div className="loader">
          <Quantum size="40" speed="1.75" color="black" />
        </div>
      )}
      {!dashboardData && (
        <div className="admin-dashboard no-data">No data available</div>
      )}
      <div className="stats">
        <div className="stat-box">
          <h2>Total User {timeFilterDisplay()}</h2>
          <p>{totalUsers?.toLocaleString()}</p>
        </div>
        <div className="stat-box">
          <h2>Total Revenue {timeFilterDisplay()}</h2>
          <p>${!isNaN(totalRevenue) ? totalRevenue.toLocaleString() : "0"}</p>
        </div>
        <div className="stat-box">
          <h2>Orders {timeFilterDisplay()}</h2>
          <p>{ordersCount}</p>
        </div>
      </div>
      <div className="top-user-row">
        <div className="top-user-section">
          <h3>Top 5 Customers {timeFilterDisplay()}</h3>
          <div className="user-cards-row">
            {topCustomers?.length > 0 ? (
              topCustomers?.map((customer, idx) => (
                <div className="user-card" key={idx}>
                  <h4>{customer.name}</h4>
                  <p>Total Spent: ${customer.totalSpent.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="no-data">No available data</p>
            )}
          </div>
        </div>

        <div className="top-user-section">
          <h3>Top 5 Sellers {timeFilterDisplay()}</h3>
          <div className="user-cards-row">
            {topSellers?.length > 0 ? (
              topSellers?.map((seller, idx) => (
                <div
                  className="user-card"
                  key={idx}
                  onClick={() => navigate(`/sellerShop/${seller.seller_id}`)}
                >
                  <h4>{seller.name}</h4>
                  <p>Total Sales: ${seller.totalSales.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="no-data">No available data</p>
            )}
          </div>
        </div>
      </div>
      <div className="charts-grid">
        <div className="part-1">
          <div className="chart-box">
            <h3>New Users Per Month</h3>
            {dashboardData?.charts?.newUsersPerMonth?.length > 0 ? (
              <Bar data={newUsersPerMonth} options={options} />
            ) : (
              <p className="no-data">No available data</p>
            )}
          </div>

          <div className="chart-box">
            <h3>Top Selling Products of {timeFilterDisplay()}</h3>
            {dashboardData?.charts?.topSellingProducts?.length > 0 ? (
              <Bar data={topSellingProducts} options={options} />
            ) : (
              <p className="no-data">No available data</p>
            )}
          </div>

          <div className="chart-box">
            <h3>Revenue Over Time</h3>
            {dashboardData?.charts?.revenueOverTime?.length > 0 ? (
              <Line data={revenueOverTime} options={options} />
            ) : (
              <p className="no-data">No available data</p>
            )}
          </div>
        </div>

        <div className="part-2">
          <div className="chart-box">
            <h3>Order Status Breakdown for {timeFilterDisplay()}</h3>
            <div>
              {dashboardData?.charts?.orderStatusCount?.length > 0 ? (
                <Pie data={orderStatusCount} options={options} />
              ) : (
                <p className="no-data">No available data</p>
              )}
            </div>
          </div>

          <div className="chart-box">
            <h3>Sales by Category of {timeFilterDisplay()}</h3>
            <div>
              {dashboardData?.charts?.salesByCategory?.length > 0 ? (
                <Doughnut data={salesByCategory} options={options} />
              ) : (
                <p className="no-data">No available data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
