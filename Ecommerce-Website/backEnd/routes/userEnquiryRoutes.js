import express from "express";
import {
  getAllUserEnquiryController,
  getAllUserEnquiryBySearchController,
  changeEnquiryPriorityController,
  deleteUserEnquiryController,
  getAUserEnquiryController,
} from "../controllers/userEnquiryController.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { authenticate } from "../middlewares/authenticate.js";

const userEnquiryRouter = express.Router();
userEnquiryRouter.use(authenticate);
userEnquiryRouter.use(authorizeRoles("admin"));

userEnquiryRouter.route("/search").get(getAllUserEnquiryBySearchController);
userEnquiryRouter.route("/").get(getAllUserEnquiryController);
userEnquiryRouter
  .route("/:enquiryId/priority")
  .patch(changeEnquiryPriorityController);
userEnquiryRouter
  .route("/:enquiryId")
  .get(getAUserEnquiryController)
  .delete(deleteUserEnquiryController);

export default userEnquiryRouter;
