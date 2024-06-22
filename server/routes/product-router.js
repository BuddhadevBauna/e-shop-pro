import express from "express";
import addProduct from "../controllers/products/add-product-controller.js";
import updateProduct from "../controllers/products/update-product-controller.js";
import * as getProduct from "../controllers/products/get-product-controller.js";
import searchProductsOrCategory from "../controllers/products/search-product-controller.js";
import * as sortAndFilterProduct from "../controllers/products/sort-filter-product-controller.js"

const router = express.Router();

//add product
router.route('/add').post(addProduct);
//update Product
router.route('/update/:particularId').patch(updateProduct);
//get product
router.route('/').get(getProduct.getAllProduct);
router.route('/category/:particularCategory').get(getProduct.getCategoryOfProduct);
//search product
router.route('/search').get(searchProductsOrCategory);
//sort & filter product
router.route('/category/:particularCategory/q').get(sortAndFilterProduct.sortAndFilterCategryOfProduct);
router.route('/search/q').get(sortAndFilterProduct.sortAndFilterSearchProducts);
//get product
router.route('/:particularId').get(getProduct.getSingleProduct);

export default router;