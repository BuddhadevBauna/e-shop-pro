import { createSlice } from "@reduxjs/toolkit";

const categoryOfProductSlice = createSlice(
    {
        name : "products of category",
        initialState: [],
        reducers : {
            setCategoryOfProducts(state, action) {
                // console.log(action.payload);
                return [...action.payload]
            },
            removeCategoryOfProducts() {
                return [];
            }
        }
    }
)

export const { setCategoryOfProducts, removeCategoryOfProducts} = categoryOfProductSlice.actions
export default categoryOfProductSlice.reducer