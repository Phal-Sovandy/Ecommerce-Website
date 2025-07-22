import express from "express";
import {
  getAllSellerRequestsController,
  changeRequestStatus,
  getSellerRequestsBySearchController,
} from "../controllers/sellerRequestController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const sellerRequestRouter = express.Router();
sellerRequestRouter.use(authenticate);


sellerRequestRouter
  .route("/search")
  .get(authorizeRoles("admin"), getSellerRequestsBySearchController);
sellerRequestRouter
  .route("/")
  .get(authorizeRoles("admin"), getAllSellerRequestsController);
sellerRequestRouter
  .route("/:requestId/status")
  .patch(authorizeRoles("admin"), changeRequestStatus);

export default sellerRequestRouter;
