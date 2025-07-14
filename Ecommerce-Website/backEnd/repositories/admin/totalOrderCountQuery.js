import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryOrdersCount(timeFilter = "allTime") {
  const whereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const ordersCount = await models.Order.count({ where: whereClause });
    return ordersCount;
  } catch (err) {
    console.error("Error in getOrdersCountQuery:", err);
    throw new Error("Failed to fetch orders count");
  }
}
