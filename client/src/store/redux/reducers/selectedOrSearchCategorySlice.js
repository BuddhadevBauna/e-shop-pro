import { createSlice } from "@reduxjs/toolkit";

const selectedOrSearchCategorySlice = createSlice(
    {
        name : "selected or search categories",
        initialState: [],
        reducers : {
            setSelectedOrSearchCategories(state, action) {
                // console.log(action.payload);
                return action.payload;
            },
            removeSelectedOrSearchCategories() {
                return [];
            }
        }
    }
)

export const { setSelectedOrSearchCategories, removeSelectedOrSearchCategories } = selectedOrSearchCategorySlice.actions
export default selectedOrSearchCategorySlice.reducer