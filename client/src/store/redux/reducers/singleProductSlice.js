import { createSlice } from "@reduxjs/toolkit";

const singleProductSlice = createSlice({
    name: "get single product",
    initialState: {},
    reducers: {
        setSingleProduct: (state, action) => {
            return {...action.payload};
        },
        removeSingleProduct: (state, action) => {
            return {};
        }
    }
})

export const {setSingleProduct, removeSingleProduct} = singleProductSlice.actions
export default singleProductSlice.reducer