import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice"
import productsOfCategoryReducer from "./reducers/productOfCategorySlice";
import filterAndSortProductReducer from "./reducers/filterAndSortProductSlice";
import searchCategoryReducer from "./reducers/searchCategorySlice";
import searchProductReducer from "./reducers/searchProductSlice";


const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        categoryOfProducts : productsOfCategoryReducer,
        filterAndSortProducts : filterAndSortProductReducer,
        searchCategories : searchCategoryReducer,
        searchProducts : searchProductReducer
    }
})

export default store;