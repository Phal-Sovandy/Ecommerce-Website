import express from "express";
import { uploadSeller } from "../config/multer.js";
import {
  getAllSellersController,
  getSellerBySearchController,
  getASellerController,
  updateSellerInfoController,
  changeSellerStatusController,
} from "../controllers/sellerController.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { authenticate } from "../middlewares/authenticate.js";

const sellerRouter = express.Router();

sellerRouter.get("/search", getSellerBySearchController);
sellerRouter.route("/").get(getAllSellersController);
sellerRouter
  .route("/:sellerId/status")
  .patch(authenticate, authorizeRoles("admin"), changeSellerStatusController);
sellerRouter
  .route("/:sellerId")
  .get(getASellerController)
  .put(
    authenticate,
    authorizeRoles("admin", "seller"),
    uploadSeller.fields([{ name: "profile_picture", maxCount: 1 }]),
    updateSellerInfoController
  );

export default sellerRouter;
