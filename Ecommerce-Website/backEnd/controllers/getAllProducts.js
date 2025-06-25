import { queryAllProducts } from "../services/queryAllProducts.js";

async function getAllProducts(req, res) {
  const products = await queryAllProducts();
  res.json(products);
}

export { getAllProducts };
