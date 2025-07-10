import {
  queryAProductInfo,
  queryAllProducts,
  queryAllProductsBySearch,
  alterProductBadge,
} from "../repositories/productQuery.js";

export async function getAllProducts(req, res) {
  try {
    const products = await queryAllProducts();
    return res.json(products);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAProducts(req, res) {
  try {
    const { asin } = req.params;
    const products = await queryAProductInfo(asin);
    return res.json(products);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductBySearch(req, res) {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const badge = req.query.badge || null;
    const discount = req.query.discount || null;
    const sort = req.query.sort || "titleAsc";

    const products = await queryAllProductsBySearch(
      search,
      badge,
      discount,
      sort
    );
    return res.json(products);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function changeProductBadge(req, res) {
  try {
    const { asin } = req.params;
    const { badge } = req.body;
    const result = await alterProductBadge(asin, badge);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update badge" });
  }
}
