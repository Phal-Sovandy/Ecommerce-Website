import express from "express";
import {
  getAllWishlists,
  getWishlistByCustomerId,
  addProductToWishlist,
  removeProductFromWishlist,
  deleteWishlist,
} from "../controllers/wishlistController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const wishlistRouter = express.Router();
wishlistRouter.use(authenticate);
wishlistRouter.use(authorizeRoles("customer", "admin"));

// Get all wishlists
wishlistRouter.get("/", getAllWishlists);

// Get all products in wishlist by customer_id
wishlistRouter.get("/:customerId", getWishlistByCustomerId);

// Add product to wishlist
wishlistRouter.post("/:customerId/products", addProductToWishlist);

// Remove product from wishlist
wishlistRouter.delete("/:customerId/products/:asin", removeProductFromWishlist);

// Delete entire wishlist for a customer
wishlistRouter.delete("/:customerId", deleteWishlist);

export default wishlistRouter;
