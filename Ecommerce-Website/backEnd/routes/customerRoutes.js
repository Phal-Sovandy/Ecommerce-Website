import express from "express";
import { uploadCustomer } from "../config/multer.js";
import {
  getAllCustomersController,
  getCustomerBySearchController,
  getACustomerController,
  updateCustomerInfoController,
  changeCustomerStatusController,
} from "../controllers/customerController.js";

const customerRouter = express.Router();

customerRouter.get("/search", getCustomerBySearchController);
customerRouter.route("/").get(getAllCustomersController);
customerRouter.route("/:customerId/status").patch(changeCustomerStatusController);
customerRouter
  .route("/:customerId")
  .get(getACustomerController)
  .put(
    uploadCustomer.fields([{ name: "profile_picture", maxCount: 1 }]),
    updateCustomerInfoController
  );

export default customerRouter;
