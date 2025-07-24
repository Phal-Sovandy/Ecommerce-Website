import models from "../models/index.js";

// Add product to cart (create or update an order with status 'cart')
export async function addToCart(req, res) {
  const { customer_id, asin, quantity = 1, option } = req.body;
  if (!customer_id || !asin) {
    return res.status(400).json({ error: "customer_id and asin are required" });
  }
  try {
    // Find or create an order with status 'cart' for this customer
    let order = await models.Order.findOne({
      where: { customer_id, status: "cart" },
    });
    if (!order) {
      order = await models.Order.create({
        customer_id,
        status: "cart",
      });
    }
    // Check if item already in cart
    let item = await models.OrderedItem.findOne({
      where: {
        order_id: order.order_id,
        asin,
        option: option || null,
      },
    });
    if (item) {
      // Update quantity
      item.quantity += quantity;
      await item.save();
    } else {
      // Add new item
      await models.OrderedItem.create({
        order_id: order.order_id,
        asin,
        quantity,
        option: option || null,
      });
    }
    res.status(200).json({ message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
}

// Get cart for a customer
export async function getCart(req, res) {
  const { customer_id } = req.params;
  if (!customer_id) {
    return res.status(400).json({ error: "customer_id is required" });
  }
  try {
    const order = await models.Order.findOne({
      where: { customer_id, status: "cart" },
      include: [
        {
          model: models.OrderedItem,
          as: "orderedItems",
          include: [
            { model: models.Product, as: "product" },
          ],
        },
      ],
    });
    if (!order) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(order.orderedItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

// Remove item from cart
export async function removeFromCart(req, res) {
  const { customer_id, asin, option } = req.body;
  if (!customer_id || !asin) {
    return res.status(400).json({ error: "customer_id and asin are required" });
  }
  try {
    const order = await models.Order.findOne({
      where: { customer_id, status: "cart" },
    });
    if (!order) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const deleted = await models.OrderedItem.destroy({
      where: {
        order_id: order.order_id,
        asin,
        option: option || null,
      },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    res.status(200).json({ message: "Removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Failed to remove from cart" });
  }
}

// Clear cart
export async function clearCart(req, res) {
  const { customer_id } = req.body;
  if (!customer_id) {
    return res.status(400).json({ error: "customer_id is required" });
  }
  try {
    const order = await models.Order.findOne({
      where: { customer_id, status: "cart" },
    });
    if (!order) {
      return res.status(404).json({ error: "Cart not found" });
    }
    await models.OrderedItem.destroy({ where: { order_id: order.order_id } });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
}
