import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice"
import productsOfCategoryReducer from "./reducers/productOfCategorySlice";
import filterAndSortProductReducer from "./reducers/filterAndSortProductSlice";


const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        categoryOfProducts : productsOfCategoryReducer,
        filterAndSortProducts : filterAndSortProductReducer
    }
})

export default store;