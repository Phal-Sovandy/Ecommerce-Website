import express from "express";
import {
  getAllWishlists,
  getWishlistByCustomerId,
  addProductToWishlist,
  removeProductFromWishlist,
  deleteWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// Get all wishlists
router.get("/", getAllWishlists);

// Get all products in wishlist by customer_id
router.get("/:customerId", getWishlistByCustomerId);

// Add product to wishlist
router.post("/:customerId/products", addProductToWishlist);

// Remove product from wishlist
router.delete("/:customerId/products/:asin", removeProductFromWishlist);

// Delete entire wishlist for a customer
router.delete("/:customerId", deleteWishlist);

export default router;
