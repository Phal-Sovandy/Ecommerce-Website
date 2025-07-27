import models from "../models/index.js";

// Get all wishlists (for all customers)
export async function getAllWishlists(req, res) {
  try {
    const wishlists = await models.Wishlist.findAll({
      include: [
        {
          model: models.WishlistItem,
          as: "wishlistItems",
          include: [
            {
              model: models.Product,
              as: "product",
            },
          ],
        },
        {
          model: models.Customer,
          as: "customer",
          attributes: ["customer_id", "username"],
        },
      ],
    });

    if (wishlists.length === 0) {
      return res.status(404).json({ message: "No wishlists found" });
    }

    res.status(200).json(wishlists);
  } catch (error) {
    console.error("Error fetching all wishlists:", error);
    res.status(500).json({ error: "Failed to retrieve wishlists" });
  }
}

// Get all products in a customer's wishlist
export async function getWishlistByCustomerId(req, res) {
  const customerId = req.params.customerId;
  try {
    // First, find or create the wishlist for the customer
    let wishlist = await models.Wishlist.findOne({
      where: { customer_id: customerId },
      include: [
        {
          model: models.WishlistItem,
          as: "wishlistItems",
          include: [
            {
              model: models.Product,
              as: "product",
            },
          ],
        },
      ],
    });

    // If wishlist doesn't exist, create a new one
    if (!wishlist) {
      wishlist = await models.Wishlist.create({
        customer_id: customerId,
        wishlistItems: []
      }, {
        include: [
          {
            model: models.WishlistItem,
            as: "wishlistItems",
          },
        ],
      });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to retrieve wishlist" });
  }
}

// Add a product to wishlist
export async function addProductToWishlist(req, res) {
  const customerId = req.params.customerId;
  const { asin } = req.body;
  
  // Get the sequelize instance from the model
  const sequelize = models.Wishlist.sequelize;
  
  // Use a retry mechanism for transaction conflicts
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    const t = await sequelize.transaction();
    
    try {
      // First, check if the product is already in the wishlist
      const existingWishlist = await models.Wishlist.findOne({
        where: { customer_id: customerId },
        include: [{
          model: models.WishlistItem,
          as: 'wishlistItems',
          where: { asin },
          required: false
        }],
        transaction: t
      });

      if (existingWishlist && existingWishlist.wishlistItems && existingWishlist.wishlistItems.length > 0) {
        await t.commit();
        return res.status(409).json({ 
          message: "Product already in wishlist",
          alreadyExists: true
        });
      }

      // If we get here, the product is not in the wishlist yet
      // Find or create the wishlist
      const [wishlist] = await models.Wishlist.findOrCreate({
        where: { customer_id: customerId },
        transaction: t,
        defaults: {
          customer_id: customerId,
          created_at: new Date()
        },
        lock: t.LOCK.UPDATE
      });

      // Add the product to the wishlist
      const item = await models.WishlistItem.create({
        wishlist_id: wishlist.wishlist_id,
        asin,
        added_at: new Date()
      }, { transaction: t });

      // If we got here, commit the transaction
      await t.commit();
      
      // Return the updated wishlist with the new item
      const updatedWishlist = await models.Wishlist.findByPk(wishlist.wishlist_id, {
        include: [{
          model: models.WishlistItem,
          as: 'wishlistItems',
          include: [{
            model: models.Product,
            as: 'product'
          }]
        }]
      });

      return res.status(201).json({ 
        message: "Product added to wishlist", 
        item,
        wishlist: updatedWishlist
      });
      
    } catch (error) {
      // Always roll back the transaction on error
      if (t && !t.finished) {
        await t.rollback();
      }
      
      // If it's a unique constraint violation, it means the item was already added
      // in a concurrent request, so we can treat this as success
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ 
          message: "Product already in wishlist",
          alreadyExists: true
        });
      }
      
      // If it's a serialization failure or could not serialize access, retry
      if (error.original && 
          (error.original.code === '40001' || // serialization_failure
           error.original.code === '40P01' || // deadlock_detected
           error.original.code === '55P03')) { // lock_not_available
        retryCount++;
        if (retryCount < maxRetries) {
          // Wait a bit before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, retryCount)));
          continue;
        }
      }
      
      // If we get here, it's an unexpected error or we've exhausted our retries
      console.error("Error adding product to wishlist:", error);
      return res.status(500).json({ 
        error: "Failed to add product to wishlist",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
  
  // If we've exhausted all retries
  return res.status(500).json({ 
    error: "Failed to add product to wishlist after multiple attempts"
  });
}

// Remove a product from wishlist
export async function removeProductFromWishlist(req, res) {
  const customerId = req.params.customerId;
  const asin = req.params.asin;

  try {
    const wishlist = await models.Wishlist.findOne({ where: { customer_id: customerId } });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const deletedCount = await models.WishlistItem.destroy({
      where: { wishlist_id: wishlist.wishlist_id, asin },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ error: "Failed to remove product from wishlist" });
  }
}

// Delete entire wishlist
export async function deleteWishlist(req, res) {
  const customerId = req.params.customerId;

  try {
    const deletedCount = await models.Wishlist.destroy({ where: { customer_id: customerId } });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    res.status(500).json({ error: "Failed to delete wishlist" });
  }
}
