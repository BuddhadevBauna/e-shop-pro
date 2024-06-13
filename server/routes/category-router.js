import express from "express";
import { getAllCategory } from "../controllers/products/category-get-controller.js";

const router = express.Router();

//get Category
router.route('/').get(getAllCategory);

export default router;