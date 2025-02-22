import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categorySlice";
import allCategoryProductReducer from "./reducers/allCategoryProductSlice";
import selectedOrSearchCategoriesReducer from "./reducers/selectedOrSearchCategorySlice";
import selectedOrSearchProductReducer from "./reducers/selectedOrSearchProductSlice";
import brandsOfSelectedOrSearchProductsReducer from "./reducers/brandsOfSelectedOrSearchProductSlice";
import singleProductReducer from "./reducers/singleProductSlice";

const store = configureStore({
  reducer: {
    allCategory: categoryReducer,
    allCategoriesProducts: allCategoryProductReducer,
    selectedOrSearchCategories: selectedOrSearchCategoriesReducer,
    selectedOrSearchProducts: selectedOrSearchProductReducer,
    brandsOfSelectedOrSearchProducts: brandsOfSelectedOrSearchProductsReducer,
    singleProduct: singleProductReducer,
  },
});

export default store;