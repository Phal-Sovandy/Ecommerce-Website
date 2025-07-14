import express from "express";
import {
  getAllUserEnquiryController,
  getAllUserEnquiryBySearchController,
  changeEnquiryPriorityController,
  deleteUserEnquiryController,
  getAUserEnquiryController
} from "../controllers/userEnquiryController.js";

const userEnquiryRouter = express.Router();

userEnquiryRouter.route("/search").get(getAllUserEnquiryBySearchController);
userEnquiryRouter.route("/").get(getAllUserEnquiryController);
userEnquiryRouter.route("/:enquiryId/priority").patch(changeEnquiryPriorityController);
userEnquiryRouter.route("/:enquiryId").get(getAUserEnquiryController).delete(deleteUserEnquiryController);


export default userEnquiryRouter;