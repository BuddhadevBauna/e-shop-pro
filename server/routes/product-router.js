import express from "express";
import addProduct from "../controllers/products/product-add-controller.js";
import addCategory from "../controllers/products/category-add-controller.js";
import * as getProduct from "../controllers/products/product-get-controller.js";

const router = express.Router();

router.route('/add').post(addProduct);
router.route('/categories/add').post(addCategory);
router.route('/').get(getProduct.getAllProduct);
router.route('/category/:particularCategory').get(getProduct.getCategoryOfProduct);
router.route('/:particularId').get(getProduct.getSingleProduct);

export default router;