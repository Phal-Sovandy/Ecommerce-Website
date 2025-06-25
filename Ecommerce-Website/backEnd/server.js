import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getAllProducts } from "./controllers/getAllProducts.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", getAllProducts);

app.listen(PORT, () => {
  console.log(`SERVER IS LISTEN TO PORT: ${PORT}`);
});
 