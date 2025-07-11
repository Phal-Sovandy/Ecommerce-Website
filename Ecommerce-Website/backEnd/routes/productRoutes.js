import express from "express";
import { upload } from "../config/multer.js";
import {
  getAllProductsController,
  getAProductsController,
  getProductBySearchController,
  changeProductBadgeController,
  removeProductController,
  updateProductController,
} from "../controllers/productsController.js";

const productRouters = express.Router();

productRouters.get("/search", getProductBySearchController);
productRouters
  .route("/")
  .get(getAllProductsController)
  .delete(removeProductController);
productRouters.route("/:asin/badge").patch(changeProductBadgeController);
productRouters
  .route("/:asin")
  .get(getAProductsController)
  .put(
    upload.fields([
      { name: "image_url", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    updateProductController
  );

export default productRouters;
