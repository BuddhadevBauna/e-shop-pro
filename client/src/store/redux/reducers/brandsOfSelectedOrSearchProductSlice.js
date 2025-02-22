import { createSlice } from "@reduxjs/toolkit";

const brandsOfSelectedOrSearchProductsSlice = createSlice(
    {
        name : "brands of selected or search products",
        initialState: [],
        reducers : {
            setBrandsOfSelectedOrSearchProducts(state, action) {
                // console.log(action.payload);
                return action.payload;
            },
            removeBrandsOfSelectedOrSearchProducts() {
                return [];
            }
        }
    }
)

export const { setBrandsOfSelectedOrSearchProducts, removeBrandsOfSelectedOrSearchProducts } = brandsOfSelectedOrSearchProductsSlice.actions
export default brandsOfSelectedOrSearchProductsSlice.reducer