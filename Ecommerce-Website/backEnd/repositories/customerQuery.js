import models from "../models/index.js";
import { Sequelize, Op } from "sequelize";
import { sequelize } from "../config/database.js";

export async function queryAllCustomers() {
  try {
    const customers = await models.Customer.findAll({
      attributes: ["customer_id", "username"],
      include: {
        model: models.CustomerDetail,
        as: "details",
        attributes: [
          "first_name",
          "last_name",
          "email",
          "phone",
          "gender",
          "status",
          "registration_date",
        ],
        include: {
          model: models.CustomerLocation,
          as: "location",
          attributes: ["country"],
        },
      },
    });

    return customers.map((c) => ({
      customer_id: c.customer_id,
      username: c.username,
      name: `${c.details?.first_name || ""} ${c.details?.last_name || ""}`,
      email: c.details?.email,
      phone: c.details?.phone,
      gender: c.details?.gender,
      status: c.details?.status,
      registration_date: c.details?.registration_date,
      country: c.details?.location?.country,
    }));
  } catch (err) {
    console.log("Error in fetching customers:", err);
    throw new Error("Fetching customers failed");
  }
}

export async function queryAllCustomersBySearch(search, status, gender, sort) {
  try {
    const lowerSearch = search?.toLowerCase()?.trim();
    const whereConditions = [];

    if (lowerSearch) {
      whereConditions.push({
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(Sequelize.col("Customer.customer_id"), "varchar")
            ),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("Customer.username")),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("details.email")),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("details.phone")),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("details.first_name"),
                Sequelize.literal(`' '`),
                Sequelize.col("details.last_name")
              )
            ),
            {
              [Op.like]: `%${lowerSearch}%`,
            }
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("details.location.country")),
            { [Op.like]: `%${lowerSearch}%` }
          ),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(Sequelize.col("details.registration_date"), "TEXT")
            ),
            { [Op.like]: `%${lowerSearch}%` }
          ),
        ],
      });
    }

    if (status === "inactive") {
      whereConditions.push({ "$details.status$": false });
    } else if (status === "active") {
      whereConditions.push({ "$details.status$": true });
    }

    if (gender) {
      whereConditions.push(
        Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("details.gender")),
          gender.toLowerCase()
        )
      );
    }

    const sortMap = {
      nameAsc: [Sequelize.col("details.first_name"), "ASC"],
      nameDesc: [Sequelize.col("details.first_name"), "DESC"],
      joinedAsc: [Sequelize.col("details.registration_date"), "ASC"],
      joinedDesc: [Sequelize.col("details.registration_date"), "DESC"],
    };

    const order = sortMap[sort] || sortMap["nameAsc"];

    const foundCustomers = await models.Customer.findAll({
      attributes: ["customer_id", "username"],
      include: {
        model: models.CustomerDetail,
        as: "details",
        attributes: [
          "first_name",
          "last_name",
          "email",
          "phone",
          "gender",
          "status",
          "registration_date",
        ],
        include: {
          model: models.CustomerLocation,
          as: "location",
          attributes: ["country"],
        },
      },
      where: whereConditions.length ? { [Op.and]: whereConditions } : {},
      order: [order],
    });

    return foundCustomers.map((c) => ({
      customer_id: c.customer_id,
      username: c.username,
      name: `${c.details?.first_name || ""} ${c.details?.last_name || ""}`,
      email: c.details?.email,
      phone: c.details?.phone,
      gender: c.details?.gender,
      status: c.details?.status,
      registration_date: c.details?.registration_date,
      country: c.details?.location?.country,
    }));
  } catch (err) {
    console.log("Failed to fetch customers", err);
    throw new Error("No customer found");
  }
}

export async function queryACustomerInformation(customerId) {
  try {
    const customer = await models.Customer.findByPk(customerId, {
      attributes: ["customer_id", "username"],
      include: {
        model: models.CustomerDetail,
        as: "details",
        include: {
          model: models.CustomerLocation,
          as: "location",
        },
      },
    });

    return {
      customer_id: customer.customer_id,
      username: customer.username,
      first_name: customer.details?.first_name,
      last_name: customer.details?.last_name,
      email: customer.details?.email,
      phone: customer.details?.phone,
      gender: customer.details?.gender,
      birth_date: customer.details?.birth_date,
      registration_date: customer.details?.registration_date,
      status: customer.details?.status,
      profile_picture: customer.details?.profile_picture,
      address_line1: customer.details?.location?.address_line1,
      address_line2: customer.details?.location?.address_line2,
      city: customer.details?.location?.city,
      state: customer.details?.location?.state,
      zipcode: customer.details?.location?.zipcode,
      country: customer.details?.location?.country,
    };
  } catch (err) {
    console.log("Error in fetching customer info:", err);
    throw new Error("Fetching customer failed");
  }
}

export async function alterCustomerInfo(customerId, data) {
  const {
    username,
    first_name,
    last_name,
    email,
    phone,
    gender,
    birth_date,
    profile_picture,
    address_line1,
    address_line2,
    city,
    state,
    zipcode,
    country,
  } = data;

  try {
    const customer = await models.Customer.findByPk(customerId, {
      include: {
        model: models.CustomerDetail,
        as: "details",
        include: {
          model: models.CustomerLocation,
          as: "location",
        },
      },
    });

    if (!customer) throw new Error("Customer not found");

    await customer.update({ username });

    if (customer.details) {
      await customer.details.update({
        first_name,
        last_name,
        email,
        phone: phone,
        gender,
        birth_date,
        profile_picture,
      });
    } else {
      await models.CustomerDetail.create({
        customer_id: customerId,
        first_name,
        last_name,
        email,
        phone: phone,
        gender,
        birth_date,
        profile_picture,
      });
    }

    if (customer.details?.location) {
      await customer.details.location.update({
        address_line1,
        address_line2,
        city,
        state,
        zipcode,
        country,
      });
    } else {
      await models.CustomerLocation.create({
        customer_id: customerId,
        address_line1,
        address_line2,
        city,
        state,
        zipcode,
        country,
      });
    }

    return await queryACustomerInformation(customerId);
  } catch (err) {
    console.log("Error updating customer info:", err);
    throw new Error("Updating customer info failed");
  }
}

export async function alterCustomerStatus(customerId) {
  const t = await sequelize.transaction();

  try {
    const customerDetail = await models.CustomerDetail.findOne({
      where: { customer_id: customerId },
      attributes: ["status"],
      transaction: t,
    });

    if (!customerDetail) throw new Error("Customer detail not found");

    const newStatus = !customerDetail.status;

    const [updated] = await models.CustomerDetail.update(
      { status: newStatus },
      { where: { customer_id: customerId }, transaction: t }
    );

    if (updated === 0) {
      await t.rollback();
      return { message: "No status update", updated };
    }

    await t.commit();

    return {
      message: `Customer status updated to ${newStatus ? "active" : "inactive"}`,
      updated,
      newStatus,
    };
  } catch (error) {
    await t.rollback();
    console.log("Error updating customer status:", error.message);
    throw new Error("Failed to update customer status");
  }
}
