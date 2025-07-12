import {
  queryAProductInfo,
  queryAllProducts,
  queryAllProductsBySearch,
  alterProductBadge,
  deleteProduct,
  alterProductInfo,
} from "../repositories/productQuery.js";

export async function getAllProductsController(req, res) {
  try {
    const products = await queryAllProducts();
    return res.json(products);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAProductsController(req, res) {
  try {
    const { asin } = req.params;
    const products = await queryAProductInfo(asin);
    return res.json(products);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductBySearchController(req, res) {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const badge = req.query.badge || null;
    const discount = req.query.discount || null;
    const sort = req.query.sort || "titleAsc";

    const products = await queryAllProductsBySearch(
      search,
      badge,
      discount,
      sort
    );
    return res.json(products);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function changeProductBadgeController(req, res) {
  try {
    const { asin } = req.params;
    const { badge } = req.body;
    const result = await alterProductBadge(asin, badge);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Failed to update badge" });
  }
}

export async function removeProductController(req, res) {
  try {
    const { asin } = req.params;
    const productDelete = await deleteProduct(asin);
    res.status(200).json(productDelete);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Failed to update badge" });
  }
}

export const updateProductController = async (req, res) => {
  const { asin } = req.params;
  const updatedData = req.body;

  try {
    const mainImageFile = req.files?.["image_url"]?.[0];
    const additionalImageFiles = req.files?.["images"] || [];

    if (mainImageFile) {
      updatedData.image_url = `http://localhost:3002/uploads/products/${mainImageFile.filename}`;
    }

    const imageIndexes = JSON.parse(req.body.imageIndexes || "[]");

    if (additionalImageFiles.length > 0 && imageIndexes.length > 0) {
      updatedData.images = {
        files: additionalImageFiles.map(
          (file) => `http://localhost:3002/uploads/products/${file.filename}`
        ),
        indexes: imageIndexes,
      };
    }

    if (updatedData.categories) {
      updatedData.categories = JSON.parse(updatedData.categories);
    }
    if (updatedData.features) {
      updatedData.features = JSON.parse(updatedData.features);
    }
    if (updatedData.variations) {
      updatedData.variations = JSON.parse(updatedData.variations);
    }

    const updatedProduct = await alterProductInfo(asin, updatedData);

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
