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
    const wishlist = await models.Wishlist.findOne({
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

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
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

  try {
    // Find or create wishlist for the customer
    let wishlist = await models.Wishlist.findOne({ where: { customer_id: customerId } });
    if (!wishlist) {
      wishlist = await models.Wishlist.create({ customer_id: customerId });
    }

    // Add product to wishlist items (avoid duplicates)
    const [item, created] = await models.WishlistItem.findOrCreate({
      where: { wishlist_id: wishlist.wishlist_id, asin },
    });

    if (!created) {
      return res.status(409).json({ message: "Product already in wishlist" });
    }

    res.status(201).json({ message: "Product added to wishlist", item });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ error: "Failed to add product to wishlist" });
  }
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
