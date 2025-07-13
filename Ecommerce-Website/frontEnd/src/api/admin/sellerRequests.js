import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1/sellerRequests`;

export async function getAllSellerRequests() {
  try {
    const allRequests = await axios.get(`${BASE_API_URL}`);
    return allRequests.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function filterRequest(search, status, sort) {
  try {
    const allRequests = await axios.get(
      `${BASE_API_URL}/search?search=${encodeURIComponent(
        search || ""
      )}&status=${encodeURIComponent(status || "")}&sort=${encodeURIComponent(
        sort || ""
      )}`
    );
    return allRequests.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function changeCustomerStatus(req_id, status) {
  try {
    const response = await axios.patch(`${BASE_API_URL}/${req_id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
