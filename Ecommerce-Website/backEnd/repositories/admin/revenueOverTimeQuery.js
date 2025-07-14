import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryRevenueOverTime(timeFilter = "allTime") {
  let dateGroup;
  let orderWhereClause = {};

  if (timeFilter === "thisYear") {
    orderWhereClause = getDateWhereClause("created_at", "thisYear");
    dateGroup = Sequelize.fn(
      "DATE_TRUNC",
      "month",
      Sequelize.col("Order.created_at")
    );
  } else if (timeFilter === "thisMonth") {
    orderWhereClause = getDateWhereClause("created_at", "thisMonth");
    dateGroup = Sequelize.fn(
      "DATE_TRUNC",
      "day",
      Sequelize.col("Order.created_at")
    );
  } else {
    dateGroup = Sequelize.fn(
      "DATE_TRUNC",
      "month",
      Sequelize.col("Order.created_at")
    );
  }

  try {
    const revenueData = await models.OrderedItem.findAll({
      attributes: [
        [dateGroup, "time_unit"],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              '"OrderedItem".quantity * "product->pricing".final_price'
            )
          ),
          "revenue",
        ],
      ],
      include: [
        {
          model: models.Product,
          as: "product",
          attributes: [],
          include: {
            model: models.Pricing,
            as: "pricing",
            attributes: [],
          },
        },
        {
          model: models.Order,
          as: "Order",
          attributes: [],
          where: orderWhereClause,
        },
      ],
      group: [dateGroup],
      order: [[dateGroup, "ASC"]],
      raw: true,
    });

    return revenueData;
  } catch (err) {
    console.error("Error in getRevenueOverTimeQuery:", err);
    throw new Error("Failed to fetch revenue over time");
  }
}
