import express from 'express';
import {queryAllProducts, queryAProductInfo, queryAllProductsBySearch} from '../repositories/productQuery.js';

const productRouters = express.Router();

productRouters.route("/").get(queryAllProducts);
productRouters.route("/:productId").get(queryAProductInfo);
productRouters.get("/search", queryAllProductsBySearch);


// TODO

export default productRouters;