import axios from "axios";
import { fetchProductsOfAllCategories } from "../../../../api/products/productsAPI";

export const deleteProduct = async (productId, AuthorizationToken, dispatch, categories) => {
    try {
        const deleteProductURL = import.meta.env.VITE_DELETE_PRODUCT+'/'+productId;
        const response = await axios.delete(deleteProductURL, {
            headers: {
                Authorization: AuthorizationToken
            }
        })
        // console.log(response);
        if(response.status === 200) {
            fetchProductsOfAllCategories(categories, dispatch);
        }
    } catch (error) {
        console.error(error);
    }
}