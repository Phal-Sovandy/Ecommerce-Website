import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const { DATABASE, HOSTNAME, PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE, HOSTNAME, PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

export default sequelize;