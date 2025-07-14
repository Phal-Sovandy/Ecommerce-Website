import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryTotalUsers(timeFilter = "allTime") {
  const whereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const totalUsers = await models.Customer.count({ where: whereClause });
    return totalUsers;
  } catch (err) {
    console.error("Error in getTotalUsersQuery:", err);
    throw new Error("Failed to fetch total users");
  }
}
