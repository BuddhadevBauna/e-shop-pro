import axios from "axios";
import { fetchAllCategory } from "../../../../api/categories/categoryAPI";
import { toast } from "react-toastify";

export const handleDeleteCategory = async (categoryId, token, data, dispatch) => {
    try {
        const deleteCategoryURL = `${import.meta.env.VITE_DELETE_CATEGORY}?categoryId=${categoryId}`;
        // console.log(deleteCategoryURL);

        const response = await axios.delete(deleteCategoryURL, {headers: { Authorization: `Bearer ${token}`}, data: data});
        // console.log(response);
        if (response.status === 200) {
            toast.success(response?.data?.message);
            fetchAllCategory(dispatch);
        }
    } catch (error) {
        // console.error(error);
        toast.error(error?.response?.data?.message);
    }
}

export const handleDeleteSubCategory = async (categoryId, subCategoryId, token, data, dispatch) => {
    try {
        const deleteSubCategoryURL = `${import.meta.env.VITE_DELETE_SUBCATEGORY}?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
        // console.log(deleteCategoryURL);

        const response = await axios.delete(deleteSubCategoryURL, {headers: {Authorization: `Bearer ${token}`}, data: data});
        // console.log(response);
        if (response.status === 200) {
            toast.success(response?.data?.message);
            fetchAllCategory(dispatch);
        }
    } catch (error) {
        // console.error(error);
        toast.error(error?.response?.data?.message);
    }
}