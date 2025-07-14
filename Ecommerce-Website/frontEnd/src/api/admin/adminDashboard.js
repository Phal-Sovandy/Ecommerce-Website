import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1/adminDashboard`;

export async function getAdminDashboardData(timeFilter = "allTime") {
  try {
    const response = await axios.get(BASE_API_URL, {
      params: { timeFilter },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin dashboard data:", error.message);
    throw error;
  }
}
