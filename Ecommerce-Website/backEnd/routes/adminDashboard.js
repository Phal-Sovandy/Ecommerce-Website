import express from "express";
import { adminDashboardController } from "../controllers/adminDashboardController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const adminRouter = express.Router();

adminRouter
  .route("/")
  .get(authenticate, authorizeRoles("admin"), adminDashboardController);

export default adminRouter;
