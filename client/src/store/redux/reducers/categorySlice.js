import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice(
    {
        name : "categories",
        initialState : [],
        reducers  : {
            setCategories(state, action){
                const {categories} = action.payload;
                // console.log(categories);
                return [
                    ...categories
                ];
            }
        }
    }
)

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer