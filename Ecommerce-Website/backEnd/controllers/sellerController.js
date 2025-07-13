import {
  alterSellerInfo,
  queryAllSellers,
  queryAllSellersBySearch,
  queryASellerInformation,
} from "../repositories/sellerQuery.js";

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

export async function getASellerController(req, res) {
  try {
    const { sellerId } = req.params;

    const seller = await queryASellerInformation(sellerId);
    return res.status(200).json(seller);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateSellerInfoController(req, res) {
  try {
    const { sellerId } = req.params;
    const updatedData = req.body;
    const profileImage = req.files?.["profile_picture"]?.[0];

    if (profileImage) {
      updatedData.profile_picture = `http://localhost:3002/uploads/sellerProfiles/${profileImage.filename}`;
    }

    const updatedSeller = await alterSellerInfo(sellerId, updatedData);

    return res.status(200).json({
      message: "Seller updated successfully",
      seller: updatedSeller,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
