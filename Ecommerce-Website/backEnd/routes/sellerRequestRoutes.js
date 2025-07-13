import express from "express";
import { getAllSellerRequestsController, changeRequestStatus, getSellerRequestsBySearchController } from "../controllers/sellerRequestController.js";

const sellerRequestRouter = express.Router();

sellerRequestRouter.get("/search", getSellerRequestsBySearchController);
sellerRequestRouter.route("/").get(getAllSellerRequestsController);
sellerRequestRouter.route("/:requestId/status").patch(changeRequestStatus);

export default sellerRequestRouter;