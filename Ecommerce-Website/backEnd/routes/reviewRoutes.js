import { Router } from "express";
import * as reviewController from "../controllers/reviewController.js";

const router = Router();

// Routes
router.get("/", reviewController.getAllReviews);
router.get("/customer/:customer_id", reviewController.getReviewsByCustomer);
router.get("/product/:asin", reviewController.getReviewsByProduct);
router.post("/", reviewController.addReview);
router.delete("/:review_id", reviewController.deleteReview);
router.put("/:review_id", reviewController.updateReview);

export default router;
