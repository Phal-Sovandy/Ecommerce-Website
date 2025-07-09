import models from "../models/index.js";

// Get all wishlists with their items and products
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
              include: [{ model: models.Pricing, as: "pricing" }],
            },
          ],
        },
        {
          model: models.Customer,
          as: "customer",
          attributes: ['customer_id', 'username']  // you can include customer info too
        }
      ],
    });

    if (wishlists.length === 0) {
      return res.status(404).json({ message: "No wishlists found." });
    }

    res.status(200).json(wishlists);
  } catch (err) {
    console.error("Error fetching all wishlists:", err);
    res.status(500).json({ error: "Failed to retrieve wishlists." });
  }
}

// Query all products in a wishlist by customer_id
export async function getWishlistByCustomerId(req, res) {
  const { customer_id } = req.params;
  try {
    const wishlists = await models.Wishlist.findAll({
      where: { customer_id },
      include: [
        {
          model: models.WishlistItem,
          as: "wishlistItems",
          include: [
            {
              model: models.Product,
              as: "product",
              include: [{ model: models.Pricing, as: "pricing" }],
            },
          ],
        },
      ],
    });

    if (wishlists.length === 0) {
      return res.status(404).json({ message: "Wishlist not found for customer." });
    }

    res.status(200).json(wishlists);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to retrieve wishlist." });
  }
}

// Add product to wishlist
export async function addProductToWishlist(req, res) {
  const { customer_id } = req.params;
  const { asin } = req.body;

  try {
    // Get or create wishlist
    let wishlist = await models.Wishlist.findOne({ where: { customer_id } });
    if (!wishlist) {
      wishlist = await models.Wishlist.create({ customer_id });
    }

    // Add product to wishlist
    const [item, created] = await models.WishlistItem.findOrCreate({
      where: {
        wishlist_id: wishlist.wishlist_id,
        asin,
      },
    });

    if (!created) {
      return res.status(409).json({ message: "Product already in wishlist." });
    }

    res.status(201).json({ message: "Product added to wishlist." });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ error: "Failed to add product to wishlist." });
  }
}

// Remove product from wishlist
export async function removeProductFromWishlist(req, res) {
  const { customer_id, asin } = req.params;

  try {
    const wishlist = await models.Wishlist.findOne({ where: { customer_id } });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found." });
    }

    const deleted = await models.WishlistItem.destroy({
      where: {
        wishlist_id: wishlist.wishlist_id,
        asin,
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found in wishlist." });
    }

    res.status(200).json({ message: "Product removed from wishlist." });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ error: "Failed to remove product." });
  }
}

// Delete entire wishlist
export async function deleteWishlist(req, res) {
  const { customer_id } = req.params;

  try {
    const wishlist = await models.Wishlist.findOne({ where: { customer_id } });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found." });
    }

    // Delete all items first (if foreign key constraints require it)
    await models.WishlistItem.destroy({ where: { wishlist_id: wishlist.wishlist_id } });

    await wishlist.destroy();

    res.status(200).json({ message: "Wishlist deleted." });
  } catch (err) {
    console.error("Error deleting wishlist:", err);
    res.status(500).json({ error: "Failed to delete wishlist." });
  }
}
