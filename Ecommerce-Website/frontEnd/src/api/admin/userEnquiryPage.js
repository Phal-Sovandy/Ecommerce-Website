import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1/userEnquiries`;

export async function getAllUserEnquiry() {
  try {
    const allEnquiries = await axios.get(`${BASE_API_URL}`);
    return allEnquiries.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function getAUserEnquiry(enq_id) {
  try {
    const enquiry = await axios.get(`${BASE_API_URL}/${enq_id}`);
    return enquiry.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function filterUserEnquiry(search, priority, sort, role, gender) {
  try {
    const filteredEnquiries = await axios.get(
      `${BASE_API_URL}/search?search=${encodeURIComponent(
        search || ""
      )}&role=${encodeURIComponent(role || "")}&gender=${encodeURIComponent(
        gender || ""
      )}&priority=${encodeURIComponent(
        priority || ""
      )}&sort=${encodeURIComponent(sort || "")}`
    );
    return filteredEnquiries.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function changeEnquiryBadge(enq_id, priority) {
  try {
    const response = await axios.patch(`${BASE_API_URL}/${enq_id}/priority`, {
      priority,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function deleteUserEnquiry(enq_id) {
  try {
    const response = await axios.delete(`${BASE_API_URL}/${enq_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}