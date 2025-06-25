import axios from "axios";

async function getAllProducts() {
  try {
    const response = await axios.get("http://localhost:3002/");
    return response.data; // return the actual product data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // optional: let the caller handle the error
  }
}

export { getAllProducts };
