import "./ProductOfCategory.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { removeCategoryOfProduct, setCategoryOfProduct } from "../../../store/redux/reducers/productOfCategorySlice";
import FilterSidebar from "./filter-sidebar/FilterSidebar";
import FilterProduct from "./filter-product/FilterProduct";

const ProductOfCategory = () => {
    const dispatch = useDispatch();
    const params = useParams();
    // console.log(params.particularCategory);
    const particularCategory = params.particularCategory;

    useEffect(() => {
        const fetchProductsCategory = async () => {
            dispatch(removeCategoryOfProduct());
            try {
                const response = await axios.get(`http://localhost:3030/products/category/${particularCategory}`);
                if (response.status === 200) {
                    // console.log(response);
                    // console.log(response.data);
                    dispatch(setCategoryOfProduct(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsCategory();
    }, [particularCategory, dispatch]);
    return (
        <>
            <section className="category-of-product">
                <FilterSidebar />
                <FilterProduct />
            </section>
        </>
    );
}

export default ProductOfCategory;