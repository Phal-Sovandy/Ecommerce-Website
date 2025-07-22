import axiosInstance from "../../utils/axiosInstance.js";

const BASE_API_URL = `/reviews`;

export async function getAllCustomerReviewOfProduct(asin) {
  try {
    const departments = await axiosInstance.get(`${BASE_API_URL}/product/${asin}`);
    return departments.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
