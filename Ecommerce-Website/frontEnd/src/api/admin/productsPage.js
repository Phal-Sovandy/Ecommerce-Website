import axios from "axios";

const PORT = 3002;
const BASE_API_URL = `http://localhost:${PORT}/api/v1`;

export async function getAllProducts() {
  try {
    const allProducts = await axios.get(`${BASE_API_URL}/products`);
    return allProducts.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function filterProduct(search, badge, discount, sort) {
  try {
    const filteredProduct = await axios.get(
      `${BASE_API_URL}/products/search?search=${encodeURIComponent(
        search || ""
      )}&badge=${encodeURIComponent(badge || "")}&discount=${encodeURIComponent(
        discount || ""
      )}&sort=${encodeURIComponent(sort || "")}`
    );
    return filteredProduct.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getAProductsInfo(asin) {
  try {
    const product = await axios.get(`${BASE_API_URL}/products/${asin}`);
    return product.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function changeProductBadge(asin, newBadge) {
  try {
    const response = await axios.patch(
      `${BASE_API_URL}/products/${asin}/badge`,
      {
        badge: newBadge,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update product badge", error);

    throw new Error(error);
  }
}