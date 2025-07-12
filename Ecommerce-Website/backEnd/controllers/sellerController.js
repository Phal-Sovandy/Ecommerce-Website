import { queryAllSellers, queryAllSellersBySearch } from "../repositories/sellerQuery.js";

export async function getAllSellersController(req, res) {
  try {
    const sellers = await queryAllSellers();
    res.status(200).json(sellers);
  } catch (error) {
    console.error("Error fetching sellers: ", error.message);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}

export async function getSellerBySearchController(req, res) {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const status = req.query.status;
    const sort = req.query.sort || "nameAsc";

    const sellers = await queryAllSellersBySearch(search, status, sort);
    return res.json(sellers);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}
