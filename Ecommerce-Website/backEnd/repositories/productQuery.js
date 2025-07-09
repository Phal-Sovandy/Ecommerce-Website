import models from "../models/index.js";

// Query All Products
export async function queryAllProducts(req, res) {
  try {
    const allProducts = await models.Product.findAll();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to retrieve customers" });
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