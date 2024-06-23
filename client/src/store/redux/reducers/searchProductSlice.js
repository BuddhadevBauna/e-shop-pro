import { createSlice } from "@reduxjs/toolkit";

const searchProductSlice = createSlice(
    {
        name : "search products",
        initialState: [],
        reducers : {
            setSearchProducts(state, action) {
                // console.log(action.payload);
                return [...action.payload]
            },
            removeSearchProducts() {
                return [];
            }
        }
    }
)

export const { setSearchProducts, removeSearchProducts} = searchProductSlice.actions
export default searchProductSlice.reducer