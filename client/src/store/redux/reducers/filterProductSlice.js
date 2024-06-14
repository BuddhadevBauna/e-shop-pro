import { createSlice } from "@reduxjs/toolkit";

const filterProductSlice = createSlice(
    {
        name: "filter product",
        initialState: [],
        reducers: {
            setFilterProducts(state, action) {
                return [...action.payload]
            },
            removeFilterProducts(state, action) {
                return []
            }
        }
    }
)

export const { setFilterProducts, removeFilterProducts } = filterProductSlice.actions
export default filterProductSlice.reducer