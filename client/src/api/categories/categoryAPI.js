import { useDispatch } from "react-redux";
import { setCategories } from "../../store/redux/reducers/categorySlice";
import axios from "axios";
import { useEffect } from "react";

// fetch all category
export const fetchAllCategory = async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3030/categories');
        if (response.status === 200) {
            dispatch(setCategories({ categories: response.data }));
        }
    } catch (error) {
        console.log(error);
    }
}
//custom hook for fetch all category
export const useFetchAllCategory = async () => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchAllCategory(dispatch);
    }, [dispatch]);
}