import express from "express";
import { adminDashboardController } from "../controllers/adminDashboardController.js";

const adminRouter = express.Router();

adminRouter.route("/").get(adminDashboardController);

export default adminRouter;
