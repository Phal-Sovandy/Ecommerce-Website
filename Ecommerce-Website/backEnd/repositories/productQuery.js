import models from "../models/index.js";
import { Sequelize, Op } from "sequelize";

export async function queryAllProducts() {
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
    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to retrieve products");
  }
}

export async function queryAllProductsBySearch(search, badge, discount, sort) {
  try {
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
      if (badge === "no badge") {
        whereConditions.push({ "$rankings.badge$": null });
      } else {
        whereConditions.push({ "$rankings.badge$": badge });
      }
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

    const order = sortMap[sort] || sortMap["titleAsc"];

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
    return foundProducts;
  } catch (err) {
    console.error("Failed to fetch products", err);
    throw new Error("No Product found");
  }
}

export async function queryAProductInfo(asin) {
  try {
    const product = await models.Product.findByPk(asin, {
      include: [
        {
          model: models.Manufacturer,
          as: "manufacturer",
          attributes: ["name"],
        },
        {
          model: models.Category,
          as: "categories",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },

        {
          model: models.Brand,
          as: "brand",
          attributes: ["name"],
        },
        {
          model: models.Media,
          as: "media",
          attributes: ["image_url", "images"],
        },
        {
          model: models.ProductDetail,
          as: "details",
          attributes: [
            "model_number",
            "item_weight",
            "rating",
            "product_dimensions",
            "ingredients",
            "date_first_available",
            "description",
            "features",
          ],
          include: [
            {
              model: models.Department,
              as: "department",
              attributes: ["department_id", "name"],
            },
          ],
        },
        {
          model: models.Ranking,
          as: "rankings",
          attributes: ["root_bs_rank", "bs_rank", "subcategory_rank", "badge"],
        },
        {
          model: models.Pricing,
          as: "pricing",
          attributes: ["currency", "final_price", "discount"],
        },
        {
          model: models.Seller,
          as: "sellers",
          attributes: ["seller_id", "seller_name"],
          through: {
            attributes: [],
          },
        },
        {
          model: models.CustomerReview,
          as: "customerReviews",
          include: [
            {
              model: models.Customer,
              include: {
                model: models.CustomerDetail,
                as: "details",
                attributes: ["profile_picture"],
              },
              as: "customer",
              attributes: ["username"],
            },
          ],
        },
        {
          model: models.Variation,
          as: "variation",
          attributes: ["variations"],
        },
      ],
    });

    if (!product) {
      throw new Error("No Product Found");
    }

    const totalOrderedQuantityResult = await models.OrderedItem.findOne({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalQuantity"],
      ],
      where: {
        asin: asin,
      },
      raw: true,
    });

    const totalOrderedQuantity =
      totalOrderedQuantityResult && totalOrderedQuantityResult.totalQuantity
        ? parseInt(totalOrderedQuantityResult.totalQuantity)
        : 0;

    const mainSeller =
      product.sellers && product.sellers.length > 0 ? product.sellers[0] : null;

    const formattedProduct = {
      asin: product.asin,
      title: product.title,
      categories: product.categories?.map((category) => category.name),
      department_id:
        product.details && product.details.department
          ? product.details.department.department_id
          : null,
      departments:
        product.details && product.details.department
          ? product.details.department.name
          : null,
      images: product.media.images,
      image: product.media.image_url,
      rating: product.details.rating,
      sold: totalOrderedQuantity,
      sellerId: mainSeller ? mainSeller.seller_id : null,
      seller_name: mainSeller ? mainSeller.seller_name : null,
      currency: product.pricing ? product.pricing.currency : null,
      price: product.pricing ? product.pricing.final_price : null,
      discount: product.pricing ? product.pricing.discount : null,
      variations:
        product.variation.variations &&
        Array.isArray(product.variation.variations)
          ? product.variation.variations.map((v) => v.name)
          : [],
      badge: product.rankings.badge,
      availability: product.availability,
      root_bs_rank: product.rankings ? product.rankings.root_bs_rank : null,
      bs_rank: product.rankings ? product.rankings.bs_rank : null,
      subcategory_rank:
        product.rankings && Array.isArray(product.rankings.subcategory_rank)
          ? product.rankings.subcategory_rank
          : [],
      model_number: product.details ? product.details.model_number : null,
      brand: product.brand ? product.brand.name : null,
      manufacturer: product.manufacturer ? product.manufacturer.name : null,
      weight: product.details ? product.details.item_weight : null,
      dimension: product.details ? product.details.product_dimensions : null,
      ingredients: product.details ? product.details.ingredients : null,
      date_first_available: product.details
        ? product.details.date_first_available
        : null,
      description: product.details ? product.details.description : null,
      features: product.details ? product.details.features : [],
      customerReviews: product.customerReviews
        ? product.customerReviews.map((review) => ({
            reviewId: review.review_id,
            title: review.title,
            description: review.description,
            pin: review.pin,
            userProfile:
              review.customer && review.customer.details
                ? review.customer.details.profile_picture
                : null,
            username: review.customer ? review.customer.username : null,
          }))
        : [],
    };
    return formattedProduct;
  } catch (err) {
    console.error("Failed to fetch product's data", err);
    throw new Error("Failed to fetch product's data");
  }
}

export async function alterProductBadge(asin, badge) {
  try {
    const [updated] = await models.Ranking.update(
      { badge },
      { where: { asin } }
    );
    if (updated === 0) {
      return { message: "No badge update", updated };
    }
    return { message: "Badge updated", updated };
  } catch (error) {
    console.log("Error Failed to update badge", error.message);
    throw new Error("Failed to update badge");
  }
}

export async function deleteProduct(asin, seller_id) {
  try {
    const [deletedRow] = await models.Product.destroy({
      where: {
        [Op.and]: [{ asin }, { seller_id }],
      },
    });
    return {message: "Product have been deleted", rowDeleted: deletedRow};
  } catch (err) {
    console.error("Error delete product:", err);
    throw new Error("Failed to delete product");
  }
}
