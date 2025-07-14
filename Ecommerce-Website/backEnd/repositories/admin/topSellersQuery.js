import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryTopSellers(timeFilter = "allTime") {
  const orderWhereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const topSellers = await models.OrderedItem.findAll({
      attributes: [
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              '\"OrderedItem\".quantity * \"product->pricing\".final_price'
            )
          ),
          "totalSales",
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
          include: {
            model: models.Seller,
            as: "seller",
            attributes: ["seller_id", "seller_name"],
          },
        },
      ],
      group: ["Order.seller.seller_id", "Order.seller.seller_name"],
      order: [[Sequelize.literal('"totalSales"'), "DESC"]],
      limit: 5,
      raw: true,
    });
    return topSellers;
  } catch (err) {
    console.error("Error in topSellersQuery:", err);
    throw new Error("Fetching top sellers failed");
  }
}
