import express from 'express';
import {getAllProducts, getAProducts, getProductBySearch, changeProductBadge, removeProduct} from "../controllers/productsController.js";

const productRouters = express.Router();

productRouters.get("/search", getProductBySearch);
productRouters.route("/").get(getAllProducts).delete(removeProduct);
productRouters.route("/:asin/badge").patch(changeProductBadge);
productRouters.route("/:asin").get(getAProducts);
//.put().delete()


// TODO

export default productRouters;