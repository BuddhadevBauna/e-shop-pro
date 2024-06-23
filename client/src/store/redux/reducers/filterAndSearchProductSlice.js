import { createSlice } from "@reduxjs/toolkit";

const filterAndSearchProductSlice = createSlice(
    {
        name: "filter & search product",
        initialState: [],
        reducers: {
            setFilterAndSearchProducts(state, action) {
                return [...action.payload]
            },
            removeFilterAndSearchProducts(state, action) {
                return []
            }
        }
    }
)

export const { setFilterAndSearchProducts, removeFilterAndSearchProducts } = filterAndSearchProductSlice.actions
export default filterAndSearchProductSlice.reducer