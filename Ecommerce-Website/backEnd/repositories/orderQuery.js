import models from "../models/index.js";

// Query all products in an order by order_id
export async function getProductsByOrderId(order_id) {
  return await models.OrderedItem.findAll({
    where: { order_id },
    include: [
      {
        model: models.Product,
        as: 'product',
      },
    ],
  });
}

// Query all orders by customer_id
export async function getOrdersByCustomerId(customer_id) {
  return await models.Order.findAll({
    where: { customer_id },
    include: [
      {
        model: models.OrderedItem,
        as: 'orderedItems',
        include: [
          {
            model: models.Product,
            as: 'product',
          },
        ],
      },
    ],
    order: [['created_at', 'DESC']],
  });
}

// Query all orders by seller_id
export async function getOrdersBySellerId(seller_id) {
  return await models.Order.findAll({
    where: { seller_id },
    include: [
      {
        model: models.OrderedItem,
        as: 'orderedItems',
        include: [
          {
            model: models.Product,
            as: 'product',
          },
        ],
      },
    ],
    order: [['created_at', 'DESC']],
  });
}