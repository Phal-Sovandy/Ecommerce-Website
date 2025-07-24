import axiosInstance from "../../utils/axiosInstance.js";

const BASE_API_URL = `/departments`;

export async function getAllDepartments() {
  try {
    const departments = await axiosInstance.get(`${BASE_API_URL}`);
    return departments.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
