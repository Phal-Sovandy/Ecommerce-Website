import models from "../../models/index.js";
import { Sequelize, Op } from "sequelize";
import getDateWhereClause from "../../utils/generateDateWhereClause.js";

export default async function querySalesByCategory(timeFilter = "allTime") {
  const orderWhereClause = getDateWhereClause("created_at", timeFilter);

  try {
    const salesByCategory = await models.OrderedItem.findAll({
      attributes: [
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              '\"OrderedItem\".quantity * \"product->pricing\".final_price'
            )
          ),
          "total_sold",
        ],
        "product->ProductCategories->Category.category_id",
        "product->ProductCategories->Category.name",
      ],
      include: [
        {
          model: models.Product,
          as: "product",
          attributes: [],
          include: [
            {
              model: models.Pricing,
              as: "pricing",
              attributes: [],
            },
            {
              model: models.ProductCategory,
              as: "ProductCategories",
              attributes: [],
              include: {
                model: models.Category,
                as: "Category",
                attributes: [], 
              },
            },
          ],
        },
        {
          model: models.Order,
          as: "Order",
          attributes: [],
          where: orderWhereClause,
        },
      ],
      group: [
        "product.ProductCategories.Category.name",
        "product.ProductCategories.Category.category_id",
      ],
      order: [[Sequelize.literal("total_sold"), "DESC"]],
      raw: true,
    });
    return salesByCategory;
  } catch (err) {
    console.error("Error in getSalesByCategoryQuery:", err);
    throw new Error("Failed to fetch sales by category");
  }
}
