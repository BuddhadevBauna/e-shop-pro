import { createSlice } from "@reduxjs/toolkit";

const searchCategorySlice = createSlice(
    {
        name : "search categories",
        initialState: [],
        reducers : {
            setSearchCategories(state, action) {
                // console.log(action.payload);
                return [...action.payload]
            },
            removeSearchCategories() {
                return [];
            }
        }
    }
)

export const { setSearchCategories, removeSearchCategories} = searchCategorySlice.actions
export default searchCategorySlice.reducer