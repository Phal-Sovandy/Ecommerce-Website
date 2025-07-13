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

export async function getASellerInfo(sellerId) {
  try {
    const seller = await axios.get(`${BASE_API_URL}/${sellerId}`);
    return seller.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function editSellerProfileInfo(sellerId, formData) {
  try {
    const response = await axios.put(`${BASE_API_URL}/${sellerId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing seller profile info:", error);
    throw error;
  }
}

export async function changeSellerStatus(sellerId){
    try {
    const response = await axios.patch(`${BASE_API_URL}/${sellerId}/status`);
    return response.data;
  } catch (error) {
    console.error("Error editing seller status info:", error);
    throw error;
  }
}
