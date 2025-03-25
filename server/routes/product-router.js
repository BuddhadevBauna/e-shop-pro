import express from "express";
import addProduct from "../controllers/products/add-product-controller.js";
import updateProduct from "../controllers/products/update-product-controller.js";
import * as getProduct from "../controllers/products/get-product-controller.js";
import searchAndSelectProductsOrCategory from "../controllers/products/search-select-product-controller.js";
import deleteProduct from "../controllers/products/delete-product-controller.js";
import verifyReqiredToken from "../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../middlewares/getUserRole-middleware.js";
import checkAdmin from "../middlewares/checkAdmin-middleware.js";
import validate from "../middlewares/validateUserProvidedData-middleware.js";
import { productSchema, updatedProductSchema } from "../validators/product_validator.js";
import validatePassword from "../middlewares/validatePassword-middleware.js";
import changeStatus from "../controllers/products/change-product-status-controller.js";
import verifyOptionalToken from "../middlewares/verifyOptionalToken-middleware.js";

const router = express.Router();

//controlled by Admin
//add product
router.route('/add').post(verifyReqiredToken, getUserRole, checkAdmin, validate(productSchema), addProduct);
//update Product
router.route('/update/:productId').patch(verifyReqiredToken, getUserRole, checkAdmin, validate(updatedProductSchema), updateProduct);
//delete Product
router.route('/delete/:productId').delete(verifyReqiredToken, getUserRole, checkAdmin, validatePassword, deleteProduct);
//Update product status (deleted or not)
router.route('/change-status/:productId').patch(verifyReqiredToken, getUserRole, checkAdmin, changeStatus);


//get products
router.route('/').get(getProduct.getAllProduct);
router.route('/by-ids').get(getProduct.getProductsOfIds);
router.route('/category/:particularCategoryId').get(verifyOptionalToken, getProduct.getCategoryOfProduct);
//search, select, sort, filter product
router.route('/searchandSelect').get(searchAndSelectProductsOrCategory);

//get product
router.route('/:productId').get(getProduct.getSingleProduct);

export default router;