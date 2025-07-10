import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1/departments`;

export async function getAllDepartments() {
  try {
    const departments = await axios.get(`${BASE_API_URL}`);
    return departments.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
