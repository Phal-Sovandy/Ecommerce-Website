import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1/sellers`;

export async function getAllSellers() {
  try {
    const sellers = await axios.get(BASE_API_URL);
    return sellers.data;
  } catch (error) {
    console.error("Error fetching sellers:", error.message);
    throw new Error(error.message);
  }
}

export async function filterSeller(search, status, sort) {
  try {
    const filteredSeller = await axios.get(
      `${BASE_API_URL}/search?search=${encodeURIComponent(
        search || ""
      )}&status=${encodeURIComponent(status || "")}&sort=${encodeURIComponent(
        sort || ""
      )}`
    );
    return filteredSeller.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
