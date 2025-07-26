import models from "../models/index.js";
import { Sequelize, Op } from "sequelize";
import { sequelize } from "../config/database.js";

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
    console.log("Error in fetching sellers:", err);
    throw new Error("Fetching sellers failed");
  }
}
// Query seller by search
export async function queryAllSellersBySearch(search, status, sort) {
  try {
    const loweSearch = search?.toLowerCase()?.trim();
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
    } else if (status === "active") {
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
    console.log("Failed to fetch sellers", err);
    throw new Error("No seller found");
  }
}
// Query seller details
export async function queryASellerInformation(seller_id) {
  try {
    const seller = await models.Seller.findByPk(seller_id, {
      attributes: ["seller_id", "seller_name"],
      include: {
        model: models.SellerDetail,
        as: "details",
        attributes: [
          "email",
          "phone",
          "contact_person",
          "status",
          "profile_picture",
          "bio",
          "registration_date",
        ],
        include: {
          model: models.SellerLocation,
          as: "location",
        },
      },
    });
    const formatSeller = {
      seller_id: seller.seller_id,
      username: seller.seller_name,
      email: seller.details?.email,
      phone: seller.details?.phone,
      contact_person: seller.details?.contact_person,
      status: seller.details?.status,
      registration_date: seller.details?.registration_date,
      bio: seller.details?.bio,
      country: seller.details?.location?.country,
      city: seller.details?.location?.city,
      state: seller.details?.location?.state,
      zipcode: seller.details?.location?.zipcode,
      address_line1: seller.details?.location?.address_line1,
      address_line2: seller.details?.location?.address_line2,
      profile_picture: seller.details?.profile_picture,
    };
    return formatSeller;
  } catch (err) {
    console.log("Error in fetching sellers:", err);
    throw new Error("Fetching sellers failed");
  }
}
// Edit seller info
export async function alterSellerInfo(sellerId, updatedData) {
  const {
    username,
    email,
    phone,
    contact_person,
    status,
    profile_picture,
    bio,
    country,
    city,
    state,
    zipcode,
    address_line1,
    address_line2,
  } = updatedData;

  try {
    const seller = await models.Seller.findByPk(sellerId, {
      include: {
        model: models.SellerDetail,
        as: "details",
        include: {
          model: models.SellerLocation,
          as: "location",
        },
      },
    });

    if (!seller) throw new Error("Seller not found");

    if (seller.seller_name) await seller.update({ seller_name: username });

    if (seller.details) {
      await seller.details.update({
        email,
        phone,
        contact_person,
        status,
        profile_picture,
        bio,
      });
    } else {
      await models.SellerDetail.create({
        seller_id: sellerId,
        email,
        phone,
        contact_person,
        status,
        profile_picture,
        bio,
      });
    }

    if (seller.details?.location) {
      await seller.details.location.update({
        country,
        city,
        state,
        zipcode,
        address_line1,
        address_line2,
      });
    } else {
      await models.SellerLocation.create({
        seller_id: sellerId,
        country,
        city,
        state,
        zipcode,
        address_line1,
        address_line2,
      });
    }

    const updatedSeller = await queryASellerInformation(sellerId);
    return updatedSeller;
  } catch (error) {
    console.log("Error updating seller info:", error);
    throw new Error("Updating seller info failed");
  }
}
// Edit seller status
export async function alterSellerStatus(sellerId) {
  const t = await sequelize.transaction();

  try {
    const sellerDetail = await models.SellerDetail.findOne({
      where: { seller_id: sellerId },
      attributes: ["status"],
      transaction: t,
    });

    if (!sellerDetail) throw new Error("Seller detail not found");

    const newSellerStatus = !sellerDetail.status;

    const [sellerUpdated] = await models.SellerDetail.update(
      { status: newSellerStatus },
      { where: { seller_id: sellerId }, transaction: t }
    );

    if (sellerUpdated === 0) {
      await t.rollback();
      return { message: "No status update", updated: 0 };
    }

    await t.commit();
    return {
      message: `Seller status updated to ${newSellerStatus ? "active" : "inactive"}`,
      updated: sellerUpdated,
      newStatus: newSellerStatus,
    };
  } catch (error) {
    await t.rollback();
    console.log("Error: Failed to update status", error.message);
    throw new Error("Failed to update status");
  }
}


