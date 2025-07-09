import models from "../models/index.js";
import { Sequelize, Op } from "sequelize";

// Query All Products
export async function queryAllProducts(req, res) {
  try {
    const allProducts = await models.Product.findAll({
      attributes: [
        "asin",
        [Sequelize.col("ProductSellers.seller_id"), "seller_id"],
        [Sequelize.col("title"), "title"],
        [Sequelize.col("pricing.final_price"), "price"],
        [Sequelize.col("pricing.currency"), "currency"],
        [Sequelize.col("pricing.discount"), "discount"],
        [Sequelize.col("details.rating"), "rating"],
        [
          Sequelize.literal(
            `(SELECT COUNT(quantity) FROM ordered_items WHERE asin = "Product".asin)`
          ),
          "sold",
        ],
        [Sequelize.col("brand.name"), "brand"],
        [Sequelize.col("rankings.badge"), "badge"],
        [Sequelize.col("details.date_first_available"), "firstAvailableDate"],
      ],
      include: [
        { model: models.ProductSeller, attributes: [] },
        { model: models.Pricing, attributes: [], as: "pricing" },
        { model: models.ProductDetail, attributes: [], as: "details" },
        { model: models.Ranking, attributes: [], as: "rankings" },
        { model: models.Brand, attributes: [], as: "brand" },
      ],
    });
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
}
export async function queryAllProductsBySearch(req, res) {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const badge = req.query.badge || null;
    const discount = req.query.discount || null;
    const sort = req.query.sort || "titleAsc";

    const whereConditions = [];

    if (search) {
      whereConditions.push({
        [Op.or]: [
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("title")), {
            [Op.like]: `%${search}%`,
          }),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("ProductSellers.seller_id")),
            { [Op.like]: `%${search}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Product.asin")),
            { [Op.like]: `%${search}%` }
          ),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(
                Sequelize.col("details.date_first_available"),
                "TEXT"
              )
            ),
            { [Op.like]: `%${search}%` }
          ),
        ],
      });
    }

    if (badge) {
      whereConditions.push({ "$rankings.badge$": badge });
    }

    if (discount === "discount") {
      whereConditions.push({ "$pricing.discount$": { [Op.ne]: null } });
    } else if (discount === "noDiscount") {
      whereConditions.push({ "$pricing.discount$": null });
    }

    const sortMap = {
      titleAsc: [Sequelize.col("title"), "ASC"],
      titleDesc: [Sequelize.col("title"), "DESC"],
      priceAsc: [Sequelize.col("pricing.final_price"), "ASC"],
      priceDesc: [Sequelize.col("pricing.final_price"), "DESC"],
      soldAsc: [
        Sequelize.literal(
          `(SELECT COUNT(quantity) FROM ordered_items WHERE asin = "Product".asin)`
        ),
        "ASC",
      ],
      soldDesc: [
        Sequelize.literal(
          `(SELECT COUNT(quantity) FROM ordered_items WHERE asin = "Product".asin)`
        ),
        "DESC",
      ],
      dateAsc: [Sequelize.col("details.date_first_available"), "ASC"],
      dateDesc: [Sequelize.col("details.date_first_available"), "DESC"],
      ratingAsc: [Sequelize.col("details.rating"), "ASC"],
      ratingDesc: [Sequelize.col("details.rating"), "DESC"],
    };

    const order = sortMap[sort] || sortMap[0];

    const foundProducts = await models.Product.findAll({
      attributes: [
        "asin",
        [Sequelize.col("ProductSellers.seller_id"), "seller_id"],
        [Sequelize.col("title"), "title"],
        [Sequelize.col("pricing.final_price"), "price"],
        [Sequelize.col("pricing.currency"), "currency"],
        [Sequelize.col("pricing.discount"), "discount"],
        [Sequelize.col("details.rating"), "rating"],
        [
          Sequelize.literal(
            `(SELECT COUNT(quantity) FROM ordered_items WHERE asin = "Product".asin)`
          ),
          "sold",
        ],
        [Sequelize.col("brand.name"), "brand"],
        [Sequelize.col("rankings.badge"), "badge"],
        [Sequelize.col("details.date_first_available"), "firstAvailableDate"],
      ],
      include: [
        { model: models.ProductSeller, attributes: [] },
        { model: models.Pricing, attributes: [], as: "pricing" },
        { model: models.ProductDetail, attributes: [], as: "details" },
        { model: models.Ranking, attributes: [], as: "rankings" },
        { model: models.Brand, attributes: [], as: "brand" },
      ],
      where: whereConditions.length ? { [Op.and]: whereConditions } : {},
      order: [order],
      raw: true,
    });

    res.json(foundProducts);
  } catch (err) {
    console.error("Failed to fetch products", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export async function queryAProductInfo(req, res) {
  try {
    const productId = req.params.productId;

    const productInfo = await models.Product.findOne({
      where: { asin: productId },
      attributes: [
        "asin",
        [Sequelize.col("details.description"), "description"],
        [Sequelize.col("pricing.final_price"), "price"],
        [Sequelize.col("pricing.currency"), "currency"],
        [Sequelize.col("pricing.discount"), "discount"],
        [Sequelize.col("details.model_number"), "model_number"],
        [
          Sequelize.literal(`(
      SELECT STRING_AGG(c.name, ', ')
      FROM product_categories pc
      JOIN categories c ON pc.category_id = c.category_id
      WHERE pc.asin = "Product".asin
    )`),
          "categories",
        ],
        [Sequelize.col("brand.name"), "brand"],
        [Sequelize.col("manufacturer.name"), "manufacturer"],
        [Sequelize.col("details.department.name"), "department"],
        [Sequelize.col("details.item_weight"), "weight"],
        [Sequelize.col("details.product_dimensions"), "dimensions"],
        [Sequelize.col("details.date_first_available"), "date_first_available"],
      ],
      include: [
        { model: models.Pricing, attributes: [], as: "pricing" },
        {
          model: models.ProductDetail,
          as: "details",
          attributes: [],
          include: [
            {
              model: models.Department,
              as: "department",
              attributes: [],
            },
          ],
        },
        { model: models.Brand, attributes: [], as: "brand" },
        { model: models.Manufacturer, attributes: [], as: "manufacturer" },
        {
          model: models.Feature,
          as: "features",
          attributes: ["feature"],
        },
        {
          model: models.Variation,
          attributes: ["variation"],
          through: { attributes: [] },
        },
      ],

      raw: true,
    });

    res.json(productInfo);
  } catch (err) {
    console.error("Failed to fetch product's data", err);
    res.status(500).json({ error: "Failed to fetch product's data" });
  }
}
