import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryTotalRevenue(timeFilter = "allTime") {
  const orderWhereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const totalRevenue = await models.OrderedItem.findAll({
      attributes: [
        [
          Sequelize.literal('SUM(\"OrderedItem\".quantity * \"product->pricing\".final_price)'),
          "total",
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
      raw: true,
    });
    return totalRevenue;
  } catch (err) {
    console.error("Error in getTotalRevenueQuery:", err);
    throw new Error("Failed to fetch total revenue");
  }
}