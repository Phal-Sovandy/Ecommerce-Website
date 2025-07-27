import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./middlewares/logger.js";
import { authenticate } from "./middlewares/authenticate.js";
import { authorizeRoles } from "./middlewares/authorizeRoles.js";
import { initDatabase } from "./config/database.js";
import customerRouter from "./routes/customerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import departmentRouters from "./routes/departmentRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";

import sellerRequestRouter from "./routes/sellerRequestRoutes.js";
import userEnquiryRouter from "./routes/userEnquiryRoutes.js";
import adminRouter from "./routes/adminDashboard.js";

import orderRouter from "./routes/orderRoutes.js";

import authRouter from "./routes/authRoutes.js";


dotenv.config();
const { BASE_API_URL, PORT } = process.env;

initDatabase(); 

const app = express();

// Configure CORS with credentials support
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(BASE_API_URL, logger);
app.use("/uploads", express.static("public/uploads"));

app.use(`${BASE_API_URL}/customers`, customerRouter);
app.use(`${BASE_API_URL}/products`, productRouter);
app.use(`${BASE_API_URL}/sellers`, sellerRouter);
app.use(`${BASE_API_URL}/sellerRequests`, sellerRequestRouter);
app.use(`${BASE_API_URL}/userEnquiries`, userEnquiryRouter);
app.use(`${BASE_API_URL}/departments`, departmentRouters);
app.use(`${BASE_API_URL}/reviews`, reviewRouter);
app.use(`${BASE_API_URL}/wishlists`, wishlistRouter);

app.use(`${BASE_API_URL}/orders`, orderRouter);
app.use(`${BASE_API_URL}/adminDashboard`, adminRouter);
app.use(`${BASE_API_URL}/auth`, authRouter);



app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT: ${PORT}`);
});
