import axios from "axios";
import { toast } from "react-toastify";
import { fetchProductsOfAllCategories } from "../../../../api/products/productsAPI";

const handleSatatusChange = async (productId, token, isDeleted, dispatch, categories) => {
    try {
        const url = import.meta.env.VITE_UPDATE_PRODUCT_STATUS+'/'+productId;
        const data = {isDeleted: !isDeleted}
        const response = await axios.patch(url, data, {headers: {Authorization: `Bearer ${token}`}});
        if(response.status >= 200 && response.status <= 300) {
            toast.success(response?.data?.message);
            fetchProductsOfAllCategories(categories, dispatch);
        }
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}

export default handleSatatusChange;