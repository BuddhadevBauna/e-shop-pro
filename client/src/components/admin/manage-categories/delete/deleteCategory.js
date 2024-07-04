import axios from "axios";
import { fetchAllCategory } from "../../../../api/categories/categoryAPI";

export const deleteCategory = async (categoryId, AuthorizationToken, dispatch) => {
    try {
        const deleteCategoryURL = `${import.meta.env.VITE_DELETE_CATEGORY_SECTION_URL}?categoryId=${categoryId}`;
        // console.log(deleteCategoryURL);
        const response = await axios.delete(deleteCategoryURL, {
            headers: {
                Authorization: AuthorizationToken
            }
        });
        // console.log(response);
        if (response.status === 200) {
            fetchAllCategory(dispatch);
        }
    } catch (error) {
        console.error(error);
    }
}
export const deleteSubCategory = async (categoryId, subCategoryId, AuthorizationToken, dispatch) => {
    try {
        const deleteSubCategoryURL = `${import.meta.env.VITE_DELETE_CATEGORY_SECTION_URL}?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
        // console.log(deleteCategoryURL);
        const response = await axios.delete(deleteSubCategoryURL, {
            headers: {
                Authorization: AuthorizationToken
            }
        });
        // console.log(response);
        if (response.status === 200) {
            fetchAllCategory(dispatch);
        }
    } catch (error) {
        console.error(error);
    }
}