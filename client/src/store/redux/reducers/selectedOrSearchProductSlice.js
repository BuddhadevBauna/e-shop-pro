import { createSlice } from "@reduxjs/toolkit";

const selectedOrSearchProductSlice = createSlice(
    {
        name : "selected or search products",
        initialState: {
            products: [],
            isProductsLoading: true
        },
        reducers : {
            fetchProductsStart(state) {
                state.isProductsLoading = true;
            },
            setSelectedOrSearchProducts(state, action) {
                // console.log(action.payload);
                state.products = action.payload;
                state.isProductsLoading = false;
            },
            removeSelectedOrSearchProducts(state) {
                state.products = [];
                state.isProductsLoading = false;
            }
        }
    }
)

export const { fetchProductsStart, setSelectedOrSearchProducts, removeSelectedOrSearchProducts} = selectedOrSearchProductSlice.actions
export default selectedOrSearchProductSlice.reducer