import express from "express";
import addProduct from "../controllers/products/product-add-controller.js";
import updateProduct from "../controllers/products/product-update-controller.js";
import * as getProduct from "../controllers/products/product-get-controller.js";
import searchProducts from "../controllers/products/product-search-controller.js";
import * as sortAndFilterProduct from "../controllers/products/product-sort-filter-controller.js"

const router = express.Router();

//add product
router.route('/add').post(addProduct);
//update Product
router.route('/update/:particularId').patch(updateProduct);
//get product
router.route('/').get(getProduct.getAllProduct);
router.route('/category/:particularCategory').get(getProduct.getCategoryOfProduct);
//search product
router.route('/search').get(searchProducts);
//sort & filter product
router.route('/category/:particularCategory/q').get(sortAndFilterProduct.sortAndFilterCategryOfProduct);
router.route('/search/q').get(sortAndFilterProduct.sortAndFilterSearchProducts);
//get product
router.route('/:particularId').get(getProduct.getSingleProduct);

export default router;