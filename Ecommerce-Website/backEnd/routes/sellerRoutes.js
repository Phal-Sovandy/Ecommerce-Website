import express from "express";
import { uploadSeller } from "../config/multer.js";
import {
  getAllSellersController,
  getSellerBySearchController,
  getASellerController,
  updateSellerInfoController,
  changeSellerStatusController,
} from "../controllers/sellerController.js";

const sellerRouter = express.Router();

sellerRouter.get("/search", getSellerBySearchController);
sellerRouter.route("/").get(getAllSellersController);
sellerRouter.route("/:sellerId/status").patch(changeSellerStatusController);
sellerRouter
  .route("/:sellerId")
  .get(getASellerController)
  .put(
    uploadSeller.fields([{ name: "profile_picture", maxCount: 1 }]),
    updateSellerInfoController
  );

export default sellerRouter;
