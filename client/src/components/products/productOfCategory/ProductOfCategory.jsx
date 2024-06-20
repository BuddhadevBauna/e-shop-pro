import "./ProductOfCategory.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { removeCategoryOfProduct, setCategoryOfProduct } from "../../../store/redux/reducers/productOfCategorySlice";
import FilterAndSortSidebar from "./filter-sidebar/FilterAndSortSidebar";
import FilterAndSortProduct from "./filter-sort-product/FilterAndSortProduct";
import SortProduct from "./sort-product/SortProduct";



const ProductOfCategory = () => {
    const dispatch = useDispatch();
    const params = useParams();
    // console.log(params.particularCategory);
    const particularCategory = params.particularCategory;

    //for filter products
    const [brandFilters, setBrandFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);
    const [ratingFilters, setRatingFilters] = useState([]);

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
                <FilterAndSortSidebar
                    brandFilters={brandFilters}
                    setBrandFilters={setBrandFilters}
                    priceFilters={priceFilters}
                    setPriceFilters={setPriceFilters}
                    ratingFilters={ratingFilters}
                    setRatingFilters={setRatingFilters}
                />
                <div className="sort-and-filter">
                    <SortProduct />
                    <FilterAndSortProduct
                        brandFilters={brandFilters}
                        priceFilters={priceFilters}
                        ratingFilters={ratingFilters}
                    />
                </div>

            </section>
        </>
    );
}

export default ProductOfCategory;