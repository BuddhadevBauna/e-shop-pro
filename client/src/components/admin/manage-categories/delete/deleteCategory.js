import axios from "axios";
import { fetchAllCategory } from "../../../../api/categories/categoryAPI";
import { toast } from "react-toastify";

export const handleDeleteCategory = async (categoryId, data, dispatch) => {
    try {
        const deleteCategoryURL = `${import.meta.env.VITE_DELETE_CATEGORY}?categoryId=${categoryId}`;
        // console.log(deleteCategoryURL);

        const response = await axios.delete(deleteCategoryURL, {data: data, withCredentials: true});
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

export const handleDeleteSubCategory = async (categoryId, subCategoryId, data, dispatch) => {
    try {
        const deleteSubCategoryURL = `${import.meta.env.VITE_DELETE_SUBCATEGORY}?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
        // console.log(deleteCategoryURL);

        const response = await axios.delete(deleteSubCategoryURL, {withCredentials: true, data: data});
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