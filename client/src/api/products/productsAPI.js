import axios from "axios";
import { setAllCategoriesProducts } from "../../store/redux/reducers/allCategoryProductSlice";

export const fetchProducts = async (dispatch, categoryType) => {
    try {
        const response = await axios.get(`http://localhost:3030/products/category/${categoryType}`);
        // console.log(response.data);
        // console.log({categoryType, products: response.data});
        dispatch(setAllCategoriesProducts({ categoryType, products: response.data }));
    } catch (error) {
        console.error(`Error fetching products for ${categoryType}:`, error);
    }
}