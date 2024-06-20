import express from "express";
import addCategory from "../controllers/categories/category-add-controller.js";
import { getAllCategory } from "../controllers/categories/category-get-controller.js";
import categoryUpdate from "../controllers/categories/category-update-controller.js";

const router = express.Router();

//add category
router.route('/add').post(addCategory);
//get Category
router.route('/').get(getAllCategory);
//update category
router.route('/update/:particularCategory').patch(categoryUpdate);

export default router;