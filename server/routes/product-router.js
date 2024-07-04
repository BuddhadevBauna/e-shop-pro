import express from "express";
import addProduct from "../controllers/products/add-product-controller.js";
import updateProduct from "../controllers/products/update-product-controller.js";
import * as getProduct from "../controllers/products/get-product-controller.js";
import searchProductsOrCategory from "../controllers/products/search-product-controller.js";
import * as sortAndFilterProduct from "../controllers/products/sort-filter-product-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import deleteProduct from "../controllers/products/delete-product-controller.js";

const router = express.Router();

//controlled by Admin
//add product
router.route('/add').post(authMiddleware, adminMiddleware, addProduct);
//update Product
router.route('/update/:productId').patch(authMiddleware, adminMiddleware, updateProduct);
//delete Product
router.route('/delete/:productId').delete(authMiddleware, adminMiddleware, deleteProduct);

//get product
router.route('/').get(getProduct.getAllProduct);
router.route('/category/:particularCategory').get(getProduct.getCategoryOfProduct);
//search product
router.route('/search').get(searchProductsOrCategory);
//sort & filter product
router.route('/category/:particularCategory/q').get(sortAndFilterProduct.sortAndFilterCategryOfProduct);
router.route('/search/q').get(sortAndFilterProduct.sortAndFilterSearchProducts);
//get product
router.route('/:productId').get(getProduct.getSingleProduct);

export default router;