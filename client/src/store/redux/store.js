import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice"
import productsOfCategoryReducer from "./reducers/productOfCategorySlice";

const store = configureStore({
    reducer : {
        allCategory : categoryReducer,
        categoryOfProducts : productsOfCategoryReducer,
    }
})

export default store;