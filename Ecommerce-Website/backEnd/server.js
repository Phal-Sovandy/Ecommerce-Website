import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase } from "./config/database.js";

dotenv.config();
const PORT = process.env.PORT;

initDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => console.log('Hello! Testing 1 2 3... :)'));

app.listen(PORT, () => {
  console.log(`SERVER IS LISTEN TO PORT: ${PORT}`);
});
 