import express from "express";
import { getAllSellersController, getSellerBySearchController } from "../controllers/sellerController.js";

const sellerRouter = express.Router();

sellerRouter.get("/search", getSellerBySearchController);
sellerRouter.route("/").get(getAllSellersController);

// sellerRouter.route("/:asin/badge").patch(changeProductBadgeController);
// sellerRouter
//   .route("/:asin")
//   .get(getAProductsController)
//   .put(
//     upload.fields([
//       { name: "image_url", maxCount: 1 },
//       { name: "images", maxCount: 10 },
//     ]),
//     updateProductController
//   );

export default sellerRouter;
