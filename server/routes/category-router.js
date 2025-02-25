import express from "express";
import addCategory from "../controllers/categories/add-category-controller.js";
import * as getCategory from "../controllers/categories/get-category-controller.js";
import categoryUpdate from "../controllers/categories/update-category-controller.js";
import deleteCategory from "../controllers/categories/delete-category-controller.js";
import verifyToken from "../middlewares/verifyToken-middleware.js";
import getUserRole from "../middlewares/getUserRole-middleware.js";
import checkAdmin from "../middlewares/checkAdmin-middleware.js";

const router = express.Router();

//controlled By Admin
//add category
router.route('/add').post(verifyToken, getUserRole, checkAdmin, addCategory);
//update category
router.route('/update/q').patch(verifyToken, getUserRole, checkAdmin, categoryUpdate);
//delete category
router.route('/delete/q').delete(verifyToken, getUserRole, checkAdmin, deleteCategory);

//get all category
router.route('/').get(getCategory.getAllCategory);
//get particular category or subcategory
router.route('/q').get(getCategory.getParticularCategoryOrSubCategory);


export default router;