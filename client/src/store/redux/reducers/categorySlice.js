import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice(
    {
        name : "categories",
        initialState : [],
        reducers  : {
            setCategories(state, action){
                // console.log([...action.payload]);
                return [...action.payload];
            }
        }
    }
)

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer