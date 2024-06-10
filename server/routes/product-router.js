import express from "express";
import addProduct from "../controllers/products/product-add-controller.js";
import addCategory from "../controllers/products/category-add-controller.js";

const router = express.Router();

router.route('/add').post(addProduct);
router.route('/categories/add').post(addCategory);

export default router;