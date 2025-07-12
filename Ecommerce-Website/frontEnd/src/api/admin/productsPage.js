import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1/products`;

export async function getAllProducts() {
  try {
    const allProducts = await axios.get(`${BASE_API_URL}`);
    return allProducts.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export async function filterProduct(search, badge, discount, sort) {
  try {
    const filteredProduct = await axios.get(
      `${BASE_API_URL}/search?search=${encodeURIComponent(
        search || ""
      )}&badge=${encodeURIComponent(badge || "")}&discount=${encodeURIComponent(
        discount || ""
      )}&sort=${encodeURIComponent(sort || "")}`
    );
    return filteredProduct.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export async function getAProductsInfo(asin) {
  try {
    const product = await axios.get(`${BASE_API_URL}/${asin}`);
    return product.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export async function changeProductBadge(asin, newBadge) {
  try {
    const response = await axios.patch(`${BASE_API_URL}/${asin}/badge`, {
      badge: newBadge,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update product badge", error);

    throw new Error(error);
  }
}
export async function deleteProduct(asin) {
  try {
    const deleted = await axios.delete(BASE_API_URL, {
      data: { asin },
    });
    return deleted.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export async function editProductInfo(asin, data) {
  try {
    const response = await axios.put(`${BASE_API_URL}/${asin}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing product info:", error.message);
    throw new Error(error.message);
  }
}
