import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryOrderStatusCount(timeFilter = "allTime") {
  const whereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const orderStatus = await models.Order.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      where: whereClause,
      group: ["status"],
      order: [["status", "DESC"]],
      raw: true,
    });
    return orderStatus;
  } catch (err) {
    console.error("Error in getOrderStatusCountQuery:", err);
    throw new Error("Failed to fetch order status count");
  }
}
