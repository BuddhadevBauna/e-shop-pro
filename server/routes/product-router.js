import express from "express";
import addProduct from "../controllers/products/product-add-controller.js";
import addCategory from "../controllers/products/category-add-controller.js";
import * as getProduct from "../controllers/products/product-get-controller.js";
import searchProducts from "../controllers/products/product-search-controller.js";
import * as sortProducts from "../controllers/products/product-sort-controlller.js";
import * as filterProducts from "../controllers/products/product-filter-controller.js";
import updateProduct from "../controllers/products/product-update-controller.js";

const router = express.Router();

//add product
router.route('/add').post(addProduct);
//update Product
router.route('/update/:particularId').patch(updateProduct);
//add category
router.route('/categories/add').post(addCategory);
//get product
router.route('/').get(getProduct.getAllProduct);
router.route('/category/:particularCategory').get(getProduct.getCategoryOfProduct);
//search product
router.route('/search').get(searchProducts);
//sort product
router.route('/category/:particularCategory/sort').get(sortProducts.sortCategryOfProduct);
router.route('/search/sort').get(sortProducts.sortSearchProducts);
//filter product
router.route('/category/:particularCategory/filter').get(filterProducts.filterCategoryOfProduct);
router.route('/search/filter').get(filterProducts.filterSearchProducts);
//get product
router.route('/:particularId').get(getProduct.getSingleProduct);

export default router;