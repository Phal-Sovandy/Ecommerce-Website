import models from "../models/index.js";

// Add product to cart
export async function addToCart(req, res) {
  const { customer_id, asin, quantity = 1, option } = req.body;
  
  console.log(`[${new Date().toISOString()}] --- REQUEST_METHOD: POST - PATH: /orders/cart/add`);
  console.log(`[${new Date().toISOString()}] Customer ${customer_id} is adding product ${asin} to cart`);
  
  try {
    // 1. Find or create a cart order
    let order = await models.Order.findOne({
      where: { customer_id, status: 'Processing' }
    });

    if (!order) {
      // Get any seller (temporary solution)
      const seller = await models.Seller.findOne();
      if (!seller) {
        throw new Error('No seller found');
      }
      
      // Get any delivery option (temporary solution)
      const delivery = await models.DeliveryOption.findOne();
      if (!delivery) {
        throw new Error('No delivery option found');
      }

      const orderData = {
        customer_id,
        status: 'Processing',
        seller_id: seller.seller_id,
        delivery_id: delivery.delivery_id
      };

      // Create the order
      order = await models.Order.create(orderData, {
        validate: true,
        returning: true
      });
    }

    // 2. Add item to order
    const [item, created] = await models.OrderedItem.findOrCreate({
      where: { order_id: order.order_id, asin },
      defaults: { 
        order_id: order.order_id, 
        asin, 
        quantity: parseInt(quantity, 10) || 1
      }
    });

    if (!created) {
      item.quantity = (parseInt(item.quantity, 10) || 0) + (parseInt(quantity, 10) || 1);
      await item.save();
    }

    // 3. Return success response
    return res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart: {
        order_id: order.order_id,
        items: [{
          asin: item.asin,
          quantity: item.quantity,
          option: item.option
        }]
      }
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in addToCart: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: 'Failed to add item to cart'
    });
  }
}

// Get cart for a customer
export async function getCart(req, res) {
  const { customer_id } = req.params;
  if (!customer_id) {
    return res.status(400).json({ error: "customer_id is required" });
  }
  
  console.log(`[${new Date().toISOString()}] --- REQUEST_METHOD: GET - PATH: /orders/cart/${customer_id}`);
  
  try {
    const order = await models.Order.findOne({
      where: { customer_id, status: "Processing" },
      include: [
        {
          model: models.OrderedItem,
          as: "orderedItems",
          include: [
            { 
              model: models.Product, 
              as: "product",
              include: [
                {
                  model: models.Media,
                  as: "media",
                  attributes: ['image_url']
                },
                {
                  model: models.Pricing,
                  as: "pricing",
                  attributes: ['final_price']
                }
              ]
            },
          ],
        },
      ],
    });
    
    if (!order || !order.orderedItems) {
      console.log(`[${new Date().toISOString()}] No cart found for customer ${customer_id}`);
      return res.status(200).json({ items: [] });
    }
    
    console.log(`[${new Date().toISOString()}] Found cart order: Order ID: ${order.order_id} with ${order.orderedItems.length} items`);
    
    // Format the response to include product details
    const sortedItems = [...order.orderedItems].sort((a, b) => {
      if (a.order_id !== b.order_id) {
        return a.order_id - b.order_id;
      }
      return a.asin.localeCompare(b.asin);
    });
    
    const items = sortedItems.map(item => {
      const mediaUrl = item.product?.media?.dataValues?.image_url || 'https://placehold.co/300x300?text=No+Image';
      const price = item.product?.pricing?.dataValues?.final_price || 0;
      const title = item.product?.title || 'Product not found';
      
      return {
        ...item.toJSON(),
        product: {
          ...(item.product?.toJSON() || {}),
          image_url: mediaUrl,
          price: price,
          title: title
        }
      };
    });
    
    res.status(200).json({ items });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching cart: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

// Remove item from cart
export async function removeFromCart(req, res) {
  const { customer_id, asin } = req.body;
  
  if (!customer_id || !asin) {
    return res.status(400).json({ error: "customer_id and asin are required" });
  }
  
  console.log(`[${new Date().toISOString()}] --- REQUEST_METHOD: DELETE - PATH: /orders/cart/remove (${asin})`);
  
  try {
    // Find the active cart order for the customer
    const order = await models.Order.findOne({
      where: { customer_id, status: 'Processing' }
    });
    
    if (!order) {
      console.log(`[${new Date().toISOString()}] No active cart found for customer: ${customer_id}`);
      return res.status(404).json({ 
        success: false,
        error: "Cart not found"
      });
    }
    
    const deleted = await models.OrderedItem.destroy({
      where: {
        order_id: order.order_id,
        asin
      },
    });
    
    if (deleted === 0) {
      console.log(`[${new Date().toISOString()}] Item not found in cart: ${asin}`);
      return res.status(404).json({ 
        success: false,
        error: "Item not found in cart"
      });
    }
    
    console.log(`[${new Date().toISOString()}] Removed item ${asin} from cart`);
    
    res.status(200).json({ 
      success: true,
      message: "Removed from cart",
      asin
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error removing from cart: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: "Failed to remove from cart"
    });
  }
}

// Clear cart
export async function clearCart(req, res) {
  const { customer_id } = req.body;
    
  if (!customer_id) {
    console.error(`[${new Date().toISOString()}] Missing customer_id in clearCart request`);
    return res.status(400).json({ 
      success: false,
      error: "customer_id is required"
    });
  }
    
  console.log(`[${new Date().toISOString()}] --- REQUEST_METHOD: DELETE - PATH: /orders/cart/clear (customer: ${customer_id})`);
    
  try {
    const order = await models.Order.findOne({
      where: { customer_id, status: "Processing" },
    });
    
    if (!order) {
      console.log(`[${new Date().toISOString()}] No active cart found for customer: ${customer_id}`);
      return res.status(404).json({ 
        success: false,
        error: "Cart not found"
      });
    }
    
    const deletedCount = await models.OrderedItem.destroy({ 
      where: { order_id: order.order_id } 
    });
    
    console.log(`[${new Date().toISOString()}] Cleared ${deletedCount} items from cart`);
    
    res.status(200).json({ 
      success: true,
      message: "Cart cleared successfully",
      items_removed: deletedCount
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error clearing cart: ${error.message}`);
    res.status(500).json({ 
      success: false,
      error: "Failed to clear cart"
    });
  }
}
