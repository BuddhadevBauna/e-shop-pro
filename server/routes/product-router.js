import express from "express";
import addProduct from "../controllers/products/add-product-controller.js";
import updateProduct from "../controllers/products/update-product-controller.js";
import * as getProduct from "../controllers/products/get-product-controller.js";
import searchAndSelectProductsOrCategory from "../controllers/products/search-select-product-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import deleteProduct from "../controllers/products/delete-product-controller.js";
import reviewProduct from "../controllers/products/review-product-controller.js";

const router = express.Router();

//controlled by Admin
//add product
router.route('/add').post(authMiddleware, adminMiddleware, addProduct);
//update Product
router.route('/update/:productId').patch(authMiddleware, adminMiddleware, updateProduct);
//delete Product
router.route('/delete/:productId').delete(authMiddleware, adminMiddleware, deleteProduct);

//get products
router.route('/').get(getProduct.getAllProduct);
router.route('/category/:particularCategory').get(getProduct.getCategoryOfProduct);
//search, select, sort, filter product
router.route('/searchandSelect').get(searchAndSelectProductsOrCategory);

//get product
router.route('/:productId').get(getProduct.getSingleProduct);

//controll by user
//review product
router.route('/:productId/review').post(authMiddleware, reviewProduct);

export default router;