import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryTopSellingProducts(timeFilter = "allTime") {
  const orderWhereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const topSellingProducts = await models.OrderedItem.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "total_sold"],
      ],
      include: [
        {
          model: models.Product,
          as: "product",
          attributes: ["title"],
        },
        {
          model: models.Order,
          as: "Order",
          attributes: [],
          where: orderWhereClause, 
        },
      ],
      group: ["product.asin", "product.title"],
      order: [[Sequelize.literal("total_sold"), "DESC"]],
      limit: 5,
      raw: true,
    });
    return topSellingProducts;
  } catch (err) {
    console.error("Error in getTopSellingProductsQuery:", err);
    throw new Error("Failed to fetch top selling products");
  }
}
