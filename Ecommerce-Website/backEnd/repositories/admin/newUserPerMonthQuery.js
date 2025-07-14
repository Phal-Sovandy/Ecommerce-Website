import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryNewUserPerMonth(timeFilter = "allTime") {
  const dateGroup = Sequelize.fn(
    "DATE_TRUNC",
    "month",
    Sequelize.col("created_at")
  );

  const whereClause =
    timeFilter === "thisYear"
      ? getDateWhereClause("created_at", "thisYear")
      : {};

  try {
    const newUsers = await models.Customer.findAll({
      attributes: [
        [dateGroup, "month"],
        [Sequelize.fn("COUNT", Sequelize.col("customer_id")), "count"],
      ],
      where: whereClause,
      group: [dateGroup],
      order: [[dateGroup, "ASC"]],
      raw: true,
    });
    return newUsers;
  } catch (err) {
    console.error("Error in getNewUsersPerMonthQuery:", err);
    throw new Error("Failed to fetch new users per month");
  }
}
