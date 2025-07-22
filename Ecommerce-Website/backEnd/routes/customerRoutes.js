import express from "express";
import { uploadCustomer } from "../config/multer.js";
import {
  getAllCustomersController,
  getCustomerBySearchController,
  getACustomerController,
  updateCustomerInfoController,
  changeCustomerStatusController,
} from "../controllers/customerController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const customerRouter = express.Router();
customerRouter.use(authenticate);

customerRouter.get(
  "/search",
  authorizeRoles("admin"),
  getCustomerBySearchController
);
customerRouter
  .route("/")
  .get(authorizeRoles("admin"), getAllCustomersController);
customerRouter
  .route("/:customerId/status")
  .patch(authorizeRoles("customer", "admin"), changeCustomerStatusController);
customerRouter
  .route("/:customerId")
  .get(getACustomerController)
  .put(
    authorizeRoles("customer", "admin"),
    uploadCustomer.fields([{ name: "profile_picture", maxCount: 1 }]),
    updateCustomerInfoController
  );

export default customerRouter;
