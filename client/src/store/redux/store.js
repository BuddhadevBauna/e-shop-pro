import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice"
import productsOfCategoryReducer from "./reducers/productOfCategorySlice";
import filterProductReducer from "./reducers/filterProductSlice";
import sortProductReducer from "./reducers/sortProductSlice";

const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        categoryOfProducts : productsOfCategoryReducer,
        filterProducts: filterProductReducer,
        sortProducts: sortProductReducer
    }
})

export default store;