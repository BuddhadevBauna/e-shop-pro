import { createSlice } from "@reduxjs/toolkit";

const allCategoryProductSlice = createSlice(
    {
        name: "all category product",
        initialState: {
            productsOfCategories: {},
            isCategoriesOfProductsLoading: true,
        },
        reducers: {
            fetchCategoriesOfProductsStart(state) {
                state.isCategoriesOfProductsLoading = true;
            },
            setAllCategoriesProducts(state, action) {
                const {categoryType, products} = action.payload;
                // console.log(categoryType, products);
                state.productsOfCategories = {
                    ...state.productsOfCategories,
                    [categoryType]: products.products
                };
                state.isCategoriesOfProductsLoading = false;
            }
        }
    }
)

export const {fetchCategoriesOfProductsStart, setAllCategoriesProducts} = allCategoryProductSlice.actions
export default allCategoryProductSlice.reducer