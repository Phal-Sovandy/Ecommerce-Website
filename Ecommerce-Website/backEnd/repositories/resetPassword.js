import models from "../models/index.js";
import { Op } from "sequelize";

export async function findUserByContact(contact) {
  const [customer, seller, admin] = await Promise.all([
    models.Customer.findOne({
      include: [
        {
          model: models.CustomerDetail,
          as: "details",
          where: {
            [Op.or]: [{ email: contact }, { phone: contact }],
          },
          attributes: ["email", "phone", "status", "customer_id"],
        },
      ],
    }),
    models.Seller.findOne({
      include: [
        {
          model: models.SellerDetail,
          as: "details",
          where: {
            [Op.or]: [{ email: contact }, { phone: contact }],
          },
          attributes: ["email", "phone", "status", "seller_id"],
        },
      ],
    }),
    models.Admin.findOne({
      where: {
        [Op.or]: [{ email: contact }, { phone: contact }],
      },
      attributes: ["email", "phone", "admin_id"],
    }),
  ]);

  return { customer, seller, admin };
}

export async function updateCustomerPassword(customerId, hashedPassword) {
  return models.CustomerDetail.update(
    { password_hash: hashedPassword },
    { where: { customer_id: customerId } }
  );
}

export async function updateSellerPassword(sellerId, hashedPassword) {
  return models.SellerDetail.update(
    { password_hash: hashedPassword },
    { where: { seller_id: sellerId } }
  );
}

export async function updateAdminPassword(adminId, hashedPassword) {
  return models.Admin.update(
    { hashed_password: hashedPassword },
    { where: { admin_id: adminId } }
  );
}
