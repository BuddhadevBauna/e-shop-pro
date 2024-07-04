import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice"
import productsOfCategoryReducer from "./reducers/productOfCategorySlice";
import filterAndSortProductReducer from "./reducers/filterAndSortProductSlice";
import searchCategoryReducer from "./reducers/searchCategorySlice";
import searchProductReducer from "./reducers/searchProductSlice";
import filterAndSearchProductReducer from "./reducers/filterAndSearchProductSlice";
import allCategoryProductReducer from "./reducers/allCategoryProductSlice";
import singleProductReducer from "./reducers/singleProductSlice";


const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        categoryOfProducts : productsOfCategoryReducer,
        allCategoriesProducts : allCategoryProductReducer,
        filterAndSortProducts : filterAndSortProductReducer,
        searchCategories : searchCategoryReducer,
        searchProducts : searchProductReducer,
        filterAndSearchProducts : filterAndSearchProductReducer,
        singleProduct : singleProductReducer
    }
})

export default store;