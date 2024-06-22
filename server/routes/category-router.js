import express from "express";
import addCategory from "../controllers/categories/add-category-controller.js";
import { getAllCategory } from "../controllers/categories/get-category-controller.js";
import categoryUpdate from "../controllers/categories/update-category-controller.js";

const router = express.Router();

//add category
router.route('/add').post(addCategory);
//get Category
router.route('/').get(getAllCategory);
//update category
router.route('/update/:particularCategory').patch(categoryUpdate);

export default router;