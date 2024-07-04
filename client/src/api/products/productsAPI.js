import axios from "axios";
import { setAllCategoriesProducts } from "../../store/redux/reducers/allCategoryProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSingleProduct } from "../../store/redux/reducers/singleProductSlice";

//get category of product
const fetchProductsOfCategory = async (categoryType, dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3030/products/category/${categoryType}`);
        // console.log(response.data);
        // console.log({categoryType, products: response.data});
        dispatch(setAllCategoriesProducts({ categoryType, products: response.data }));
    } catch (error) {
        console.error(`Error fetching products for ${categoryType}:`, error);
    }
}

//fetch products of all categories
const fetchProductsOfAllCategories = (categories, dispatch) => {
    categories.forEach(category => {
        if (category.subCategory.length === 0) {
            fetchProductsOfCategory(category.categoryType, dispatch);
        } else {
            category.subCategory.forEach(subCat => {
                fetchProductsOfCategory(subCat.categoryType, dispatch);
            })
        }
    })
}

// Custom hook use to fetch products of all categories
export const useFetchProductsOfAllCategories = () => {//custom hook
    const categories = useSelector(state => state.allCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProductsOfAllCategories(categories, dispatch);
    }, [categories, dispatch])
}



//get single product
export const fetchProduct = async (dispatch, productId) => {
    try {
        const response = await axios.get(`http://localhost:3030/products/${productId}`);
        // console.log(response.data);
        dispatch(setSingleProduct(response.data));
    } catch (error) {
        console.error(error);
    }
}

//custom hook for get single Product
export const useFetchProduct = (productId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchProduct(dispatch, productId);
    }, [dispatch, productId]);
}
