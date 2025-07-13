import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1/customers`;

export async function getAllCustomers() {
  try {
    const response = await axios.get(BASE_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    throw new Error(error.message);
  }
}

export async function filterCustomer(search, status, gender, sort) {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/search?search=${encodeURIComponent(
        search || ""
      )}&status=${encodeURIComponent(status || "")}&gender=${encodeURIComponent(
        gender || ""
      )}&sort=${encodeURIComponent(sort || "")}`
    );
    return response.data;
  } catch (error) {
    console.error("Error filtering customers:", error.message);
    throw new Error(error.message);
  }
}

export async function getACustomerInfo(customerId) {
  try {
    const response = await axios.get(`${BASE_API_URL}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer info:", error.message);
    throw new Error(error.message);
  }
}

export async function editCustomerProfileInfo(customerId, formData) {
  try {
    const response = await axios.put(`${BASE_API_URL}/${customerId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing customer profile:", error.message);
    throw error;
  }
}

export async function changeCustomerStatus(customerId) {
  try {
    const response = await axios.patch(`${BASE_API_URL}/${customerId}/status`);
    return response.data;
  } catch (error) {
    console.error("Error changing customer status:", error.message);
    throw error;
  }
}
