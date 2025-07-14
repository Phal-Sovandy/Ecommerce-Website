import { Sequelize, Op } from "sequelize";

export default function getDateWhereClause(dateColumn, timeFilter) {
  const whereConditions = [];

  if (timeFilter === "today") {
    whereConditions.push({
      [dateColumn]: {
        [Op.gte]: Sequelize.literal("CURRENT_DATE"),
        [Op.lt]: Sequelize.literal("CURRENT_DATE + INTERVAL '1 day'"),
      },
    });
  } else if (timeFilter === "thisMonth") {
    whereConditions.push({
      [dateColumn]: {
        [Op.gte]: Sequelize.literal("DATE_TRUNC('month', CURRENT_DATE)"),  
        [Op.lt]: Sequelize.literal("DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'"),
      },
    });
  } else if (timeFilter === "thisYear") {
    whereConditions.push({
      [dateColumn]: {
        [Op.gte]: Sequelize.literal("DATE_TRUNC('year', CURRENT_DATE)"),   
        [Op.lt]: Sequelize.literal("DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'"),
      },
    });
  }

  return whereConditions.length > 0 ? { [Op.and]: whereConditions } : {};
}
