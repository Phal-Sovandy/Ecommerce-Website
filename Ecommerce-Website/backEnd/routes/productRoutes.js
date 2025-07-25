import express from "express";
import { uploadProduct } from "../config/multer.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import {
  getAllProductsController,
  getAProductsController,
  getProductBySearchController,
  changeProductBadgeController,
  removeProductController,
  updateProductController,
  filterProductsController,
} from "../controllers/productsController.js";

const productRouters = express.Router();

productRouters.route("/filter").get(authenticate, filterProductsController);
productRouters.route("/search").get(getProductBySearchController);
productRouters.route("/").get(getAllProductsController);
productRouters
  .route("/:asin")
  .get(getAProductsController)
  .delete(
    authenticate,
    authorizeRoles("seller", "admin"),
    removeProductController
  )
  .put(
    authenticate,
    authorizeRoles("seller", "admin"),
    uploadProduct.fields([
      { name: "image_url", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    updateProductController
  );
productRouters
  .route("/:asin/badge")
  .patch(authenticate, authorizeRoles("admin"), changeProductBadgeController);

export default productRouters;
