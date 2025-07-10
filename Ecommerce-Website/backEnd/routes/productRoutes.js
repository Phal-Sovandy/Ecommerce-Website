import express from 'express';
import {getAllProducts, getAProducts, getProductBySearch, changeProductBadge} from "../controllers/products.js";

const productRouters = express.Router();

productRouters.get("/search", getProductBySearch);
productRouters.route("/").get(getAllProducts);
productRouters.route("/:asin/badge").patch(changeProductBadge);
productRouters.route("/:asin").get(getAProducts);
//.put().delete()


// TODO

export default productRouters;