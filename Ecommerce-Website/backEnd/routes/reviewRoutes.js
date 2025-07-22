import { Router } from "express";
import * as reviewController from "../controllers/reviewController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("admin"),
  reviewController.getAllReviews
);

router.get("/customer/:customer_id", reviewController.getReviewsByCustomer);

router.get("/product/:asin", reviewController.getReviewsByProduct);

router.post(
  "/",
  authenticate,
  authorizeRoles("customer"),
  reviewController.addReview
);

router.delete(
  "/:review_id",
  authenticate,
  authorizeRoles("seller", "admin"),
  reviewController.deleteReview
);

router.put(
  "/:review_id",
  authenticate,
  authorizeRoles("customer", "seller", "admin"),
  reviewController.updateReview
);

export default router;
