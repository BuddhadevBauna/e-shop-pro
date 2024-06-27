import { createSlice } from "@reduxjs/toolkit";

const allCategoryProductSlice = createSlice(
    {
        name: "all category product",
        initialState: {},
        reducers: {
            setAllCategoriesProducts(state, action) {
                const {categoryType, products} = action.payload;
                // console.log(categoryType, products);
                return {
                    ...state,
                    [categoryType]: products
                }
            },
            removeCategoriesProducts(state, action) {
                return {}
            }
        }
    }
)

export const {setAllCategoriesProducts, removeCategoriesProducts} = allCategoryProductSlice.actions
export default allCategoryProductSlice.reducer