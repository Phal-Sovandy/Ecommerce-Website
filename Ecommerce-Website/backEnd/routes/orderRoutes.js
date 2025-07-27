import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/orderController.js";

const router = express.Router();

// Add to cart
router.post("/cart/add", addToCart);
// Get cart for a customer
router.get("/cart/:customer_id", getCart);
// Remove item from cart
router.delete("/cart/remove", removeFromCart);
// Clear cart
router.delete("/cart/clear", clearCart);

export default router;
