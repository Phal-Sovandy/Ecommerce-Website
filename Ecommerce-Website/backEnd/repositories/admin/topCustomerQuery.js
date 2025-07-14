import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function queryTopCustomer(timeFilter = "allTime") {
  const orderWhereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const topCustomers = await models.OrderedItem.findAll({
      attributes: [
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              '\"OrderedItem\".quantity * \"product->pricing\".final_price'
            )
          ),
          "totalSpent",
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
            model: models.Customer,
            as: "customer",
            attributes: ["customer_id", "username"],
          },
        },
      ],
      group: ["Order.customer.customer_id", "Order.customer.username"],
      order: [[Sequelize.literal('"totalSpent"'), "DESC"]],
      limit: 5,
      raw: true,
    });
    return topCustomers;
  } catch (err) {
    console.error("Error in topCustomerQuery:", err);
    throw new Error("Fetching top customers failed");
  }
}
