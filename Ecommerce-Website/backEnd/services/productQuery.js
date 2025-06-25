import sequelize from "../config/database.js";

// Query All Products
export async function getAllProducts() {
  try {
    const [results, metadata] = await sequelize.query("SELECT * FROM products");
    return results;
  } catch (error) {
    console.error("Error querying products:", error);
    throw error;
  }
};
// Query Product by Category
// TODO
// Query Product by Department
// TODO
// Query Product by availability
// TODO
// Query Product by seller_id
// TODO
// Query Product in price range
// TODO
// Query Product by ASIN and its detail + reviews + customer_reviews
// TODO
// Query top selling products
// TODO

// Create New Product
// TODO
// Delete Product
// TODO
// Edit Product
// TODO