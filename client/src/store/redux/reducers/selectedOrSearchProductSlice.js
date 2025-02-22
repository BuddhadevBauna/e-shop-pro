import { createSlice } from "@reduxjs/toolkit";

const selectedOrSearchProductSlice = createSlice(
    {
        name : "selected or search products",
        initialState: [],
        reducers : {
            setSelectedOrSearchProducts(state, action) {
                // console.log(action.payload);
                return action.payload;
            },
            removeSelectedOrSearchProducts() {
                return [];
            }
        }
    }
)

export const { setSelectedOrSearchProducts, removeSelectedOrSearchProducts} = selectedOrSearchProductSlice.actions
export default selectedOrSearchProductSlice.reducer