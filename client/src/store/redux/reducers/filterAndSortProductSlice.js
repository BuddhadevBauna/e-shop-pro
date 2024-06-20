import { createSlice } from "@reduxjs/toolkit";

const filterAndSortProductSlice = createSlice(
    {
        name: "filter & sort product",
        initialState: [],
        reducers: {
            setFilterAndSortProducts(state, action) {
                return [...action.payload]
            },
            removeFilterAndSortProducts(state, action) {
                return []
            }
        }
    }
)

export const { setFilterAndSortProducts, removeFilterAndSortProducts } = filterAndSortProductSlice.actions
export default filterAndSortProductSlice.reducer