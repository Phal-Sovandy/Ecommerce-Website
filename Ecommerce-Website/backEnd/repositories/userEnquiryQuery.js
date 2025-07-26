import models from "../models/index.js";
import { Sequelize, Op } from "sequelize";

export async function queryAllUserEnquiry() {
  try {
    const allEnquiries = await models.UserEnquiry.findAll();
    return allEnquiries;
  } catch (err) {
    console.log("Error in fetching user enquiry:", err);
    throw new Error("Fetching user enquiry failed");
  }
}

export async function queryAUserEnquiry(enquiry_id) {
  try {
    const enquiry = await models.UserEnquiry.findByPk(enquiry_id);
    return enquiry;
  } catch (err) {
    console.log("Error in fetching user enquiry:", err);
    throw new Error("Fetching user enquiry failed");
  }
}

export async function queryAllUserEnquiryBySearch(
  search,
  priority,
  role,
  gender,
  sort
) {
  try {
    const whereConditions = [];
    const searchLower = search?.toLowerCase()?.trim();

    if (searchLower) {
      whereConditions.push({
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(Sequelize.col("enquiry_id"), "TEXT")
            ),
            { [Op.like]: `%${searchLower}%` }
          ),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("full_name")), {
            [Op.like]: `%${searchLower}%`,
          }),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("country")), {
            [Op.like]: `%${searchLower}%`,
          }),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("region")), {
            [Op.like]: `%${searchLower}%`,
          }),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("email")), {
            [Op.like]: `%${searchLower}%`,
          }),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("phone")), {
            [Op.like]: `%${searchLower}%`,
          }),
          Sequelize.where(
            Sequelize.fn(
              "LOWER",
              Sequelize.cast(Sequelize.col("enquiry_date"), "TEXT")
            ),
            { [Op.like]: `%${searchLower}%` }
          ),
        ],
      });
    }

    if (priority === "Priority" || priority === "Regular") {
      whereConditions.push({ badge: priority });
    }

    if (["Guess", "Seller", "Customer"].includes(role)) {
      whereConditions.push({ role });
    }

    if (["Male", "Female"].includes(gender)) {
      whereConditions.push({ gender });
    }

    const sortMap = {
      nameAsc: [Sequelize.col("full_name"), "ASC"],
      nameDesc: [Sequelize.col("full_name"), "DESC"],
      dateAsc: [Sequelize.col("enquiry_date"), "ASC"],
      dateDesc: [Sequelize.col("enquiry_date"), "DESC"],
    };

    const order = sortMap[sort] || sortMap["nameAsc"];

    const foundEnquiries = await models.UserEnquiry.findAll({
      where: whereConditions.length ? { [Op.and]: whereConditions } : {},
      order: [order],
    });

    return foundEnquiries;
  } catch (err) {
    console.error("Failed to fetch user enquiries", err);
    throw new Error("No user enquiries found");
  }
}

export async function alterEnquiryPriority(enquiry_id, priority) {
  try {
    const [updated] = await models.UserEnquiry.update(
      {
        badge: priority || "Regular",
      },
      { where: { enquiry_id } }
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

export async function removeUserEnquiry(enquiry_id) {
  try {
    const deleted = await models.UserEnquiry.destroy({
      where: { enquiry_id },
    });

    if (deleted === 0) {
      return { message: "No enquiry deleted", deleted };
    }

    return { message: "Enquiry deleted successfully", deleted };
  } catch (error) {
    console.log("Error: Failed to delete enquiry", error.message);
    throw new Error("Failed to delete enquiry");
  }
}
