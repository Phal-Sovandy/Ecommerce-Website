import models from "../models/index.js";
import { sequelize } from "../config/database.js";
import { Op } from "sequelize";

export async function findUserByEmailOrPhone(identifier) {
  const [customer, seller, admin] = await Promise.all([
    models.Customer.findOne({
      include: [
        {
          model: models.CustomerDetail,
          as: "details",
          where: {
            [Op.or]: [{ email: identifier }, { phone: identifier }],
          },
          attributes: ["email", "phone", "password_hash", "status"],
        },
      ],
    }),
    models.Seller.findOne({
      include: [
        {
          model: models.SellerDetail,
          as: "details",
          where: {
            [Op.or]: [{ email: identifier }, { phone: identifier }],
          },
          attributes: ["email", "phone", "password_hash", "status"],
        },
      ],
    }),
    models.Admin.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { phone: identifier }
        ].filter(Boolean),
      },
      attributes: ['admin_id', 'email', 'phone', 'hashed_password', 'created_at'],
      raw: true
    }),
  ]);

  if (customer && customer.details.status) {
    return { user: customer, role: "customer" };
  }

  if (seller && seller.details.status) {
    return { user: seller, role: "seller" };
  }

  if (admin) {
    return { user: admin, role: "admin" };
  }

  if (customer || seller) {
    return {
      user: customer || seller,
      role: customer ? "customer" : "seller",
      error: "Account is inactive",
    };
  }

  return { user: null, role: null };
}

export async function createCustomerWithDetailsAndLocation(data) {
  const {
    firstName,
    lastName,
    username,
    email,
    phone,
    gender,
    birthDate,
    country,
    state,
    city,
    zipCode,
    passwordHash,
    address1,
    address2,
  } = data;

  return await sequelize.transaction(async (t) => {
    const customer = await models.Customer.create(
      {
        username,
      },
      { transaction: t }
    );

    await models.CustomerDetail.create(
      {
        customer_id: customer.customer_id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        gender,
        birth_date: birthDate,
        country,
        state,
        city,
        zipcode: zipCode,
        password_hash: passwordHash,
        status: true,
      },
      { transaction: t }
    );

    await models.CustomerLocation.create(
      {
        customer_id: customer.customer_id,
        country,
        state,
        city,
        zipcode: zipCode,
        address_line1: address1,
        address_line2: address2,
      },
      { transaction: t }
    );

    return customer;
  });
}
