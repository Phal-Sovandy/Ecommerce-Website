import axiosInstance from "../../utils/axiosInstance.js";

export async function getAdminDashboardData(timeFilter = "allTime") {
  try {
    const response = await axiosInstance.get('/adminDashboard', {
      params: { timeFilter },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin dashboard data:", error.message);
    throw error;
  }
}
