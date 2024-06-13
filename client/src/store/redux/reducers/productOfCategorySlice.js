import { createSlice } from "@reduxjs/toolkit";

const categoryOfProductSlice = createSlice(
    {
        name : "products of category",
        initialState : {
            products: [],
        },
        reducers : {
            setCategoryOfProduct(state, action) {
                // console.log(action.payload);
                return {
                    ...state, 
                    products: [...action.payload]
                };
            },
            removeCategoryOfProduct() {
                return {};
            },
        }
    }
)

export const { setCategoryOfProduct, removeCategoryOfProduct} = categoryOfProductSlice.actions
export default categoryOfProductSlice.reducer