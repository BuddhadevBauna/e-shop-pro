import "./ProductOfCategory.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { removeCategoryOfProduct, setCategoryOfProduct } from "../../../store/redux/reducers/productOfCategorySlice";
import FilterAndSortSidebar from "./filter-sidebar/FilterAndSortSidebar";
import FilterAndSortProduct from "./filter-sort-product/FilterAndSortProduct";
import SortProduct from "./sort-product/SortProduct";
import { removeFilterAndSortProducts } from "../../../store/redux/reducers/filterAndSortProductSlice";
import { removeSearchProduct, setSearchProduct } from "../../../store/redux/reducers/searchProductSlice";
import { removeSearchCategories } from "../../../store/redux/reducers/searchCategorySlice";


const ProductOfCategory = () => {
    const searchCategories = useSelector((state) => state.searchCategories);
    const dispatch = useDispatch();
    const params = useParams();
    const particularCategory = params.particularCategory;
    // console.log(particularCategory);

    //for filter products
    const [brandFilters, setBrandFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);
    const [ratingFilters, setRatingFilters] = useState([]);
    //for sort product
    const [sortCriteria, setSortCriteria] = useState("");

    const [searchCategory, setSearchCategory] = useState("");
    useEffect(() => {
        if (searchCategories.length > 0) {
            setSearchCategory(searchCategories[0].url ? searchCategories[0].categoryType : searchCategories[0].subCategory[0].categoryType);
        }
    }, [searchCategories])
    // console.log(searchCategory);

    useEffect(() => {
        const fetchProductsCategory = async () => {
            dispatch(removeCategoryOfProduct());
            dispatch(removeSearchProduct());
            dispatch(removeFilterAndSortProducts());
            //dissable all previous sort and filter logic
            setBrandFilters([]);
            setPriceFilters([]);
            setRatingFilters([]);
            setSortCriteria("");
            try {
                let category = particularCategory ? particularCategory : searchCategory;
                if (category) {
                    let response = await axios.get(`http://localhost:3030/products/category/${category}`);
                    if (response.status === 200) {
                        // console.log(response);
                        // console.log(response.data);
                        if (particularCategory) {
                            dispatch(removeSearchCategories());
                            dispatch(setCategoryOfProduct(response.data));
                        } else if (searchCategory) {
                            
                            dispatch(setSearchProduct(response.data));
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsCategory();
    }, [particularCategory, searchCategory, dispatch]);

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
                    setSearchCategory={setSearchCategory}
                />
                <div className="sort-and-filter">
                    <SortProduct
                        setSortCriteria={setSortCriteria}
                    />
                    <FilterAndSortProduct
                        brandFilters={brandFilters}
                        priceFilters={priceFilters}
                        ratingFilters={ratingFilters}
                        sortCriteria={sortCriteria}
                    />
                </div>

            </section>
        </>
    );
}

export default ProductOfCategory;