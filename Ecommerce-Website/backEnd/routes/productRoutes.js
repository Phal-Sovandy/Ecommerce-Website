import express from 'express';
import { queryAllProducts } from '../repositories/productQuery.js';

const productRouters = express.Router();

productRouters.get("/", queryAllProducts);

// TODO

export default productRouters;