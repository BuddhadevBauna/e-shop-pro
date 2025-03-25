import express from "express";
import * as getCategory from "../controllers/categories/get-category-controller.js";
import categoryOrSubCategoryUpdate from "../controllers/categories/update-category-controller.js";
import deleteCategory from "../controllers/categories/delete/delete-category-controller.js";
import deleteSubCategory from "../controllers/categories/delete/delete-subCategory-controller.js";
import verifyReqiredToken from "../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../middlewares/getUserRole-middleware.js";
import checkAdmin from "../middlewares/checkAdmin-middleware.js";
import validate from "../middlewares/validateUserProvidedData-middleware.js";
import validatePassword from "../middlewares/validatePassword-middleware.js";
import fullCategorySchema from "../validators/category-validator.js";
import addCategory from "../controllers/categories/add-category-controller.js";

const router = express.Router();

//controlled By Admin
router.route('/add').post(verifyReqiredToken, getUserRole, checkAdmin, validate(fullCategorySchema), addCategory);
router.route('/update').patch(verifyReqiredToken, getUserRole, checkAdmin, validate(fullCategorySchema), categoryOrSubCategoryUpdate);
router.route('/delete/category').delete(verifyReqiredToken, getUserRole, checkAdmin, validatePassword, deleteCategory);
router.route('/delete/subCategory').delete(verifyReqiredToken, getUserRole, checkAdmin, validatePassword, deleteSubCategory);

//get all category
router.route('/').get(getCategory.getAllCategory);
//get particular category or subcategory
router.route('/q').get(getCategory.getParticularCategoryOrSubCategory);


export default router;