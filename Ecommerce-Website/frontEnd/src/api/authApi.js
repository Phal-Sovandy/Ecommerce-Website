import axios from "../utils/axiosInstance";

export async function loginUser(identifier, password) {
  try {
    const response = await axios.post("/auth/login", { identifier, password });
    return response.data.token;
  } catch (error) {
    console.error("Error: ", error.response?.data?.message);
    throw error;
  }
}

export async function signupUser(userData) {
  const response = await axios.post("/auth/signup", userData);
  return response.data.message;
}

export async function resetPassword(contact, newPassword) {
  try {
    const response = await axios.post("/auth/reset-password", { contact, newPassword });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error.response?.data?.message);
    throw error;
  }
}

export async function checkContactExists(contact) {
  try {
    const response = await axios.post("/auth/check-contact", { contact });
    return response.data.exists;
  } catch (error) {
    console.error("Check contact error:", error.response?.data?.message);
    throw error;
  }
}