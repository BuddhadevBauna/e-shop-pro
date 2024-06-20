import { createSlice } from "@reduxjs/toolkit";


const sortProductSlice = createSlice(
    {
        name: "sort Products",
        initialState: [],
        reducers: {
            setSortProducts(state, action) {
                return [...action.payload]
            },
            removeSortProducts(state, action) {
                return []
            }
        }
    }
)

export const { setSortProducts, removeSortProducts } = sortProductSlice.actions
export default sortProductSlice.reducer