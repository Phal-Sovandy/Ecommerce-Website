import express from "express";
import { login, resetPassword, checkContact, signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/check-contact", checkContact);
authRouter.post("/signup", signup);

export default authRouter;
