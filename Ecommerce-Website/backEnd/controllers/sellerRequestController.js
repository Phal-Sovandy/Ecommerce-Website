import {
  queryAllSellerRequests,
  alterRequestStatus,
  queryAllSellerRequestBySearch
} from "../repositories/sellerRequestQuery.js";

export async function getAllSellerRequestsController(req, res) {
  try {
    const requests = await queryAllSellerRequests();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching seller requests: ", error.message);
    res.status(500).json({ error: "Failed to fetch seller requests" });
  }
}

export async function changeRequestStatus(req, res) {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const requests = await alterRequestStatus(requestId, status);
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching seller requests: ", error.message);
    res.status(500).json({ error: "Failed to fetch seller requests" });
  }
}

export async function getSellerRequestsBySearchController(req, res) {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const status = req.query.status;
    const sort = req.query.sort || "nameAsc";

    const sellers = await queryAllSellerRequestBySearch(search, status, sort);
    return res.json(sellers);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}
