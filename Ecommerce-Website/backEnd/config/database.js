import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const { DATABASE_NAME, HOST_NAME, PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE_NAME, HOST_NAME, PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

async function initDatabase(){
  try{
    await sequelize.authenticate();
    console.log("DATABASE CONNECTED!");
    await sequelize.sync();
    console.log("DATABASE MODEL SYNCED!");
  }
  catch(error){
    console.error(`ERROR: ${error}`);
  }

}

export {sequelize, initDatabase};