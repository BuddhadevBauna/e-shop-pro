import express from "express";
import addCategory from "../controllers/categories/add-category-controller.js";
import { getAllCategory } from "../controllers/categories/get-category-controller.js";
import categoryUpdate from "../controllers/categories/update-category-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

const router = express.Router();

//controlled By Admin
//add category
router.route('/add').post(authMiddleware,adminMiddleware, addCategory);
//update category
router.route('/update/:particularCategory').patch(authMiddleware, adminMiddleware, categoryUpdate);

//get Category
router.route('/').get(getAllCategory);


export default router;