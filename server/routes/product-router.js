import express from "express";
import addProduct from "../controllers/products/add-product-controller.js";
import updateProduct from "../controllers/products/update-product-controller.js";
import * as getProduct from "../controllers/products/get-product-controller.js";
import searchAndSelectProductsOrCategory from "../controllers/products/search-select-product-controller.js";
import deleteProduct from "../controllers/products/delete-product-controller.js";
import addReview from "../controllers/customer/review/add-review-controller.js";
import verifyToken from "../middlewares/verifyToken-middleware.js";
import getUserRole from "../middlewares/getUserRole-middleware.js";
import checkAdmin from "../middlewares/checkAdmin-middleware.js";
import validate from "../middlewares/validateUserProvidedData-middleware.js";
import { productSchema, updatedProductSchema } from "../validators/product_validator.js";
import validatePassword from "../middlewares/validatePassword-middleware.js";

const router = express.Router();

//controlled by Admin
//add product
router.route('/add').post(verifyToken, getUserRole, checkAdmin, validate(productSchema), addProduct);
//update Product
router.route('/update/:productId').patch(verifyToken, getUserRole, checkAdmin, validate(updatedProductSchema), updateProduct);
//delete Product
router.route('/delete/:productId').delete(verifyToken, getUserRole, checkAdmin, validatePassword, deleteProduct);

//get products
router.route('/').get(getProduct.getAllProduct);
router.route('/by-ids').get(getProduct.getProductsOfIds);
router.route('/category/:particularCategoryId').get(getProduct.getCategoryOfProduct);
//search, select, sort, filter product
router.route('/searchandSelect').get(searchAndSelectProductsOrCategory);

//get product
router.route('/:productId').get(getProduct.getSingleProduct);

export default router;