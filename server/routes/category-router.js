import express from "express";
import addCategory from "../controllers/categories/add-category-controller.js";
import * as getCategory from "../controllers/categories/get-category-controller.js";
import categoryUpdate from "../controllers/categories/update/update-category-controller.js";
import subCategoryUpdate from "../controllers/categories/update/update-subCategory-controller.js";
import deleteCategory from "../controllers/categories/delete/delete-category-controller.js";
import deleteSubCategory from "../controllers/categories/delete/delete-subCategory-controller.js";
import verifyToken from "../middlewares/verifyToken-middleware.js";
import getUserRole from "../middlewares/getUserRole-middleware.js";
import checkAdmin from "../middlewares/checkAdmin-middleware.js";
import validate from "../middlewares/validateUserProvidedData-middleware.js";
import {baseCategorySchema, fullCategorySchema, subCategorySchema} from "../validators/category-validator.js"
import validatePassword from "../middlewares/validatePassword-middleware.js";

const router = express.Router();

//controlled By Admin
router.route('/add').post(verifyToken, getUserRole, checkAdmin, validate(fullCategorySchema), addCategory);
router.route('/update/category').patch(verifyToken, getUserRole, checkAdmin, validate(baseCategorySchema), categoryUpdate);
router.route('/update/subCategory').patch(verifyToken, getUserRole, checkAdmin, validate(subCategorySchema), subCategoryUpdate);
router.route('/delete/category').delete(verifyToken, getUserRole, checkAdmin, validatePassword, deleteCategory);
router.route('/delete/subCategory').delete(verifyToken, getUserRole, checkAdmin, validatePassword, deleteSubCategory);

//get all category
router.route('/').get(getCategory.getAllCategory);
//get particular category or subcategory
router.route('/q').get(getCategory.getParticularCategoryOrSubCategory);


export default router;