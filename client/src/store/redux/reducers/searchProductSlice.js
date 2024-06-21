import { createSlice } from "@reduxjs/toolkit";

const searchProductSlice = createSlice(
    {
        name : "search products",
        initialState: [],
        reducers : {
            setSearchProduct(state, action) {
                // console.log(action.payload);
                return [...action.payload]
            },
            removeSearchProduct() {
                return [];
            }
        }
    }
)

export const { setSearchProduct, removeSearchProduct} = searchProductSlice.actions
export default searchProductSlice.reducer