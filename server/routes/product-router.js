import express from "express";
import addProduct from "../controllers/products/product-add-controller.js";

const router = express.Router();

router.route('/add').post(addProduct);

export default router;