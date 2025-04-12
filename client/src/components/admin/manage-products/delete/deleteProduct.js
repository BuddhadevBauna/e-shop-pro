import axios from "axios";
import { fetchProductsOfAllCategories } from "../../../../api/products/productsAPI";
import { toast } from "react-toastify";

export const handleDeleteProduct = async (productId, data, dispatch, categories) => {
    try {
        const deleteProductURL = import.meta.env.VITE_DELETE_PRODUCT+'/'+productId;
        const response = await axios.delete(deleteProductURL, {withCredentials: true, data: data});
        // console.log(response);
        if(response.status === 200) {
            toast.success(response?.data?.message);
            fetchProductsOfAllCategories(categories, dispatch);
        }
    } catch (error) {
        // console.error(error);
        toast.error(error?.response?.data?.message);
    }
}