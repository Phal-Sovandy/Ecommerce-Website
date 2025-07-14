import queryNewUserPerMonth from "../repositories/admin/newUserPerMonthQuery.js";
import queryOrderStatusCount from "../repositories/admin/orderStatusCountQuery.js";
import queryRevenueOverTime from "../repositories/admin/revenueOverTimeQuery.js";
import querySalesByCategory from "../repositories/admin/salesByCategoryQuery.js";
import queryTopCustomer from "../repositories/admin/topCustomerQuery.js";
import queryTopSellers from "../repositories/admin/topSellersQuery.js";
import queryTopSellingProducts from "../repositories/admin/topSellingProduct.js";
import queryOrdersCount from "../repositories/admin/totalOrderCountQuery.js";
import queryTotalRevenue from "../repositories/admin/totalRevenueQuery.js";
import queryTotalUsers from "../repositories/admin/totalUserQuery.js";

export async function adminDashboardController(req, res) {
  try {
    const timeFilter = req.query.timeFilter || "allTime";

    const [
      totalUsers,
      totalRevenue,
      ordersCount,
      topCustomers,
      topSellers,
      newUsersPerMonth,
      revenueOverTime,
      orderStatusCount,
      salesByCategory,
      topSellingProducts,
    ] = await Promise.all([
      queryTotalUsers(timeFilter),
      queryTotalRevenue(timeFilter),
      queryOrdersCount(timeFilter),
      queryTopCustomer(timeFilter),
      queryTopSellers(timeFilter),
      queryNewUserPerMonth(timeFilter),
      queryRevenueOverTime(timeFilter),
      queryOrderStatusCount(timeFilter),
      querySalesByCategory(timeFilter),
      queryTopSellingProducts(timeFilter),
    ]);

    res.json({
      stats: {
        totalUsers,
        totalRevenue,
        ordersCount: ordersCount,
      },
      tops: { topCustomers, topSellers },
      charts: {
        newUsersPerMonth,
        revenueOverTime,
        orderStatusCount,
        salesByCategory,
        topSellingProducts,
      },
    });
  } catch (error) {
    console.error("Error generating admin dashboard data:", error);
    res.status(500).json({ error: "Failed to generate admin dashboard data" });
  }
}
