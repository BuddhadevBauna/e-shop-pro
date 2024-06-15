import express from "express";
import { getAllCategory } from "../controllers/products/category-get-controller.js";
import categoryUpdate from "../controllers/products/category-update-controller.js";

const router = express.Router();

//get Category
router.route('/').get(getAllCategory);
//update category
router.route('/update/:particularCategory').patch(categoryUpdate);

export default router;