import models from "../models/index.js";
import { Sequelize, Op } from "sequelize";

// Query all sellers
export async function queryAllSellers() {
  try {
    const sellers = await models.Seller.findAll({
      attributes: ["seller_id", "seller_name"],
      include: {
        model: models.SellerDetail,
        as: "details",
        attributes: [
          "email",
          "phone",
          "contact_person",
          "status",
          "registration_date",
        ],
        include: {
          model: models.SellerLocation,
          as: "location",
          attributes: ["country"],
        },
      },
    });

    const formatSellers = sellers.map((seller) => ({
      seller_id: seller.seller_id,
      seller_name: seller.seller_name,
      email: seller.details?.email,
      phone: seller.details?.phone,
      contact_person: seller.details?.contact_person,
      status: seller.details?.status,
      registration_date: seller.details?.registration_date,
      country: seller.details?.location?.country,
    }));

    return formatSellers;
  } catch (err) {
    console.error("Error in fetching sellers:", err);
    throw new Error("Fetching sellers failed");
  }
}

// Query seller by search
export async function queryAllSellersBySearch(search, status, sort) {
  try {
    const loweSearch = search?.toLowerCase();
    const whereConditions = [];

    if (loweSearch) {
      whereConditions.push({
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Seller.seller_id")),
            { [Op.like]: `%${loweSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Seller.seller_name")),
            { [Op.like]: `%${loweSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("details.email")),
            { [Op.like]: `%${loweSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("details.phone")),
            { [Op.like]: `%${loweSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("details.contact_person")),
            { [Op.like]: `%${loweSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("details.location.country")),
            { [Op.like]: `%${loweSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(Sequelize.col("details.registration_date"), "TEXT")
            ),
            { [Op.like]: `%${loweSearch}%` }
          ),
        ],
      });
    }

    if (status === "inactive") {
      whereConditions.push({ "$details.status$": false });
    } else if (status === "active"){
      whereConditions.push({ "$details.status$": true });
    }

    const sortMap = {
      nameAsc: [Sequelize.col("Seller.seller_name"), "ASC"],
      nameDesc: [Sequelize.col("Seller.seller_name"), "DESC"],
      dateAsc: [Sequelize.col("details.registration_date"), "ASC"],
      dateDesc: [Sequelize.col("details.registration_date"), "DESC"],
    };

    const order = sortMap[sort] || sortMap["nameAsc"];

    const foundSellers = await models.Seller.findAll({
      attributes: ["seller_id", "seller_name"],
      include: {
        model: models.SellerDetail,
        as: "details",
        attributes: [
          "email",
          "phone",
          "contact_person",
          "status",
          "registration_date",
        ],
        include: {
          model: models.SellerLocation,
          as: "location",
          attributes: ["country"],
        },
      },
      where: whereConditions.length ? { [Op.and]: whereConditions } : {},
      order: [order],
    });

    const sellers = foundSellers.map((seller) => ({
      seller_id: seller.seller_id,
      seller_name: seller.seller_name,
      email: seller.details?.email,
      phone: seller.details?.phone,
      contact_person: seller.details?.contact_person,
      status: seller.details?.status || false,
      registration_date: seller.details?.registration_date,
      country: seller.details?.location?.country,
    }));

    return sellers;
  } catch (err) {
    console.error("Failed to fetch sellers", err);
    throw new Error("No seller found");
  }
}

// Query top sellers by order count
// TODO
// Query top sellers by badge (amazon's  choice)
// TODO
