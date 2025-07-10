import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase } from "./config/database.js";
import customerRouter from "./routes/customerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import departmentRouters from "./routes/departmentRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";

dotenv.config();
const { BASE_API_URL, PORT } = process.env;

initDatabase(); 

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${BASE_API_URL}/customers`, customerRouter);
app.use(`${BASE_API_URL}/products`, productRouter);
app.use(`${BASE_API_URL}/departments`, departmentRouters);
app.use(`${BASE_API_URL}/reviews`, reviewRouter);
app.use(`${BASE_API_URL}/wishlists`, wishlistRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT: ${PORT}`);
});
