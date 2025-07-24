import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const { DATABASE_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("DATABASE CONNECTED!");
    await sequelize.sync();
    console.log("DATABASE MODEL SYNCED!");
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export { sequelize, initDatabase };
