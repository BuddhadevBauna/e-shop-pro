import express from "express";
import addCategory from "../controllers/categories/add-category-controller.js";
import * as getCategory from "../controllers/categories/get-category-controller.js";
import categoryUpdate from "../controllers/categories/update-category-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import deleteCategory from "../controllers/categories/delete-category-controller.js";

const router = express.Router();

//controlled By Admin
//add category
router.route('/add').post(authMiddleware,adminMiddleware, addCategory);
//update category
router.route('/update/q').patch(authMiddleware, adminMiddleware, categoryUpdate);
//delete category
router.route('/delete/q').delete(authMiddleware, adminMiddleware, deleteCategory);

//get all category
router.route('/').get(getCategory.getAllCategory);
//get particular category or subcategory
router.route('/q').get(getCategory.getParticularCategoryOrSubCategory);


export default router;