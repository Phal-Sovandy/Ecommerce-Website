import axiosInstance from "../../utils/axiosInstance.js";

const BASE_API_URL = `/products`;

export async function getAllProducts() {
  try {
    const allProducts = await axiosInstance.get(`${BASE_API_URL}`);
    return allProducts.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export async function filterProduct(search, badge, discount, sort) {
  try {
    const filteredProduct = await axiosInstance.get(
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
    const product = await axiosInstance.get(`${BASE_API_URL}/${asin}`);
    return product.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export async function changeProductBadge(asin, newBadge) {
  try {
    const response = await axiosInstance.patch(`${BASE_API_URL}/${asin}/badge`, {
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
    const deleted = await axiosInstance.delete(`${BASE_API_URL}/${asin}`);
    return deleted.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export async function editProductInfo(asin, data) {
  try {
    const response = await axiosInstance.put(`${BASE_API_URL}/${asin}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing product info:", error.message);
    throw new Error(error.message);
  }
}
export async function filterProductWithSidebar(search, badge, discount, sort, filters) {
  const params = {
    search,
    badge,
    discount,
    sort,
    available: filters.available,
    categories: filters.categories.join(","),
    department: filters.department.join(","),
    priceMin: filters.priceRange?.[0],
    priceMax: filters.priceRange?.[1],
  };

  try {
    const response = await axiosInstance.get(`${BASE_API_URL}/filter`, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to filter products with sidebar.");
  }
}



