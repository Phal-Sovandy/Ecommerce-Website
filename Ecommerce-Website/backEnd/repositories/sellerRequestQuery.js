import models from "../models/index.js";
import { Sequelize, Op } from "sequelize";
import { sequelize } from "../config/database.js";

export async function queryAllSellerRequests() {
  try {
    const requests = await models.SellerRequest.findAll({
      include: {
        model: models.Customer,
        as: "customer",
        attributes: ["customer_id"],
        include: {
          model: models.CustomerDetail,
          as: "details",
          attributes: ["email", "first_name", "last_name", "phone"],
        },
      },
    });
    const formatRequests = requests.map((request) => ({
      request_id: request.request_id,
      customer_id: request.customer_id,
      first_name: request.customer?.details?.first_name,
      last_name: request.customer?.details?.last_name,
      email: request.customer?.details?.email,
      phone: request.customer?.details?.phone,
      request_date: request.request_date,
      status: request.status,
    }));
    return formatRequests;
  } catch (err) {
    console.log("Error in fetching seller requests:", err);
    throw new Error("Fetching seller requests failed");
  }
}

export async function queryAllSellerRequestBySearch(search, status, sort) {
  try {
    const lowerSearch = search?.toLowerCase()?.trim();
    const whereConditions = [];

    if (lowerSearch) {
      whereConditions.push({
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(Sequelize.col("SellerRequest.request_id"), "TEXT")
            ),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(Sequelize.col("SellerRequest.customer_id"), "TEXT")
            ),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("customer.details.email")),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("customer.details.phone")),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(
                Sequelize.col("SellerRequest.request_date"),
                "TEXT"
              )
            ),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("customer.details.first_name"),
                Sequelize.literal(`' '`),
                Sequelize.col("customer.details.last_name")
              )
            ),
            {
              [Op.like]: `%${lowerSearch}%`,
            }
          ),
        ],
      });
    }

    if (
      status === "approved" ||
      status === "rejected" ||
      status === "pending"
    ) {
      whereConditions.push({ status });
    }

    const sortMap = {
      nameAsc: [Sequelize.col("customer.details.first_name"), "ASC"],
      nameDesc: [Sequelize.col("customer.details.first_name"), "DESC"],
      dateAsc: ["request_date", "ASC"],
      dateDesc: ["request_date", "DESC"],
    };

    const order = sortMap[sort] || sortMap.nameAsc;

    const foundSellerRequests = await models.SellerRequest.findAll({
      include: {
        model: models.Customer,
        as: "customer",
        include: {
          model: models.CustomerDetail,
          as: "details",
        },
      },
      where: whereConditions.length ? { [Op.and]: whereConditions } : {},
      order: [order],
    });

    const requests = foundSellerRequests.map((request) => ({
      request_id: request.request_id,
      customer_id: request.customer_id,
      first_name: request.customer?.details?.first_name,
      last_name: request.customer?.details?.last_name,
      email: request.customer?.details?.email,
      phone: request.customer?.details?.phone,
      request_date: request.request_date,
      status: request.status,
    }));

    return requests;
  } catch (err) {
    console.log("Failed to fetch seller request", err);
    throw new Error("No seller request found");
  }
}

export async function alterRequestStatus(req_id, status) {
  const t = await sequelize.transaction();

  try {
    const request = await models.SellerRequest.findByPk(req_id, {
      include: {
        model: models.Customer,
        as: "customer",
        include: {
          model: models.CustomerDetail,
          as: "details",
        },
      },
      transaction: t,
    });

    if (!request) throw new Error("Seller request not found");

    const [updated] = await models.SellerRequest.update(
      { status },
      { where: { request_id: req_id }, transaction: t }
    );

    if (updated === 0) {
      await t.rollback();
      return { message: "No status update", updated };
    }

    if (status === "approved") {
      const sellerId = request.customer_id.toString();

      const existingSeller = await models.Seller.findOne({
        where: { seller_id: sellerId },
        transaction: t,
      });

      if (!existingSeller) {
        await models.Seller.create(
          {
            seller_id: `SEL_${sellerId}`,
            seller_name: request.customer.username,
          },
          { transaction: t }
        );

        const detail = request.customer.details;

        await models.SellerDetail.create(
          {
            seller_id: `SEL_${sellerId}`,
            email: detail.email,
            phone: detail.phone,
            password_hash: detail.password_hash,
            contact_person: `${detail.first_name || ""} ${
              detail.last_name || ""
            }`.trim(),
            profile_picture: detail.profile_picture || null,
            login_method: detail.login_method || "email",
            status: true,
            registration_date: detail.registration_date || new Date(),
            bio: "", 
          },
          { transaction: t }
        );

        const location = await models.CustomerLocation.findOne({
          where: { customer_id: sellerId },
          transaction: t,
        });

        if (location) {
          await models.SellerLocation.create(
            {
              seller_id: `SEL_${sellerId}`,
              country: location.country,
              city: location.city,
              state: location.state,
              zipcode: location.zipcode,
              address_line1: location.address_line1,
              address_line2: location.address_line2,
            },
            { transaction: t }
          );
        }
      }

      await models.CustomerDetail.update(
        { status: false },
        { where: { customer_id: request.customer_id }, transaction: t }
      );
    }

    await t.commit();
    return {
      message: `Status updated to ${status}`,
      updated,
      status,
    };
  } catch (err) {
    await t.rollback();
    console.error("Error in editing seller request status:", err);
    throw new Error("Editing seller request status failed");
  }
}
