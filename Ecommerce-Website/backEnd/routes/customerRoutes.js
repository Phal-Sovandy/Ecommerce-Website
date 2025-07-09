import { Router } from "express";
import dotenv from "dotenv";
import { queryAllCustomers } from "../repositories/customerQuery.js";


const customerRouter = Router();

customerRouter.get("/", queryAllCustomers);

export default customerRouter;