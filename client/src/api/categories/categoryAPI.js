import { setCategories } from "../../store/redux/reducers/categorySlice";
import axios from "axios";

export const fetchProductsCategory = async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3030/categories');
        if (response.status === 200) {
            dispatch(setCategories({ categories: response.data }));
        }
    } catch (error) {
        console.log(error);
    }
}