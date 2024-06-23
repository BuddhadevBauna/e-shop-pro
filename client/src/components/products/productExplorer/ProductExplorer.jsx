import "./ProductExplorer.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { removeCategoryOfProducts, setCategoryOfProducts } from "../../../store/redux/reducers/productOfCategorySlice";
import FilterSidebar from "./filter-sidebar/FilterSidebar";
import FilterAndSortProduct from "./filter-sort-product/FilterAndSortProduct";
import SortList from "./sort-list/SortList";
import { removeSearchProducts, setSearchProducts } from "../../../store/redux/reducers/searchProductSlice";
import { removeSearchCategories } from "../../../store/redux/reducers/searchCategorySlice";
import { removeFilterAndSearchProducts, setFilterAndSearchProducts } from "../../../store/redux/reducers/filterAndSearchProductSlice";


const ProductExplorer = () => {
    const searchCategories = useSelector((state) => state.searchCategories);
    // console.log(searchCategories)
    const searchProducts = useSelector(state => state.searchProducts);
    // console.log(searchProducts);

    //for filter products
    const [brandFilters, setBrandFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);
    const [ratingFilters, setRatingFilters] = useState([]);
    //for sort product
    const [sortCriteria, setSortCriteria] = useState("");
    //for set filter category of searching category or products
    const [filterCategory, setFilterCategory] = useState("");
    const [filterProductsCategory, setFilterProductsCategory] = useState("");

    useEffect(() => {
        if (searchCategories.length > 0) {
            const firstCategory = searchCategories[0];
            setFilterCategory(filterCategory.url ? firstCategory.categoryType : firstCategory.subCategory[0].categoryType);
            setFilterProductsCategory("");
        }
    }, [searchCategories]);
    // console.log("filterCategory ",filterCategory);
    useEffect(() => {
        if (searchCategories.length === 0 && searchProducts.length > 0) {
            setFilterProductsCategory(searchProducts[0].category);
            setFilterCategory("");
        }
    }, [searchProducts, searchCategories]);
    // console.log("filterProductsCategory ", filterProductsCategory);

    const params = useParams();
    const particularCategory = params.particularCategory;
    // console.log(particularCategory);

    useEffect(() => {
        //dissable all previous sort and filter logic
        const resetFiltersAndSort = () => {
            setBrandFilters([]);
            setPriceFilters([]);
            setRatingFilters([]);
            setSortCriteria("");
        }
        if (filterCategory || particularCategory || filterProductsCategory) {
            resetFiltersAndSort();
        }
    }, [particularCategory, filterCategory, filterProductsCategory]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductsOfCategory = async () => {
            try {
                dispatch(removeCategoryOfProducts());
                dispatch(removeSearchProducts());
                let category = particularCategory || filterCategory;
                if (category) {
                    let response = await axios.get(`http://localhost:3030/products/category/${category}`);
                    if (response.status === 200) {
                        // console.log(response);
                        // console.log("data", response.data);
                        if (particularCategory) {
                            dispatch(removeSearchCategories());
                            dispatch(setCategoryOfProducts(response.data));
                        } else if (filterCategory) {
                            dispatch(setSearchProducts(response.data));
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductsOfCategory();
    }, [particularCategory, filterCategory]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchInput = searchParams.get('q');

    useEffect(() => {
        const getFilterSearchProducts = async () => {
            try {
                dispatch(removeFilterAndSearchProducts());
                const response = await axios.get(`http://localhost:3030/products/search/q?searchInput=${searchInput}&filterCategory=${filterProductsCategory}`);
                // console.log(response.data);
                dispatch(setFilterAndSearchProducts(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        if (filterProductsCategory) {
            getFilterSearchProducts();
        }
    }, [filterProductsCategory])

    return (
        <>
            <section className="category-of-product">
                <FilterSidebar
                    brandFilters={brandFilters}
                    setBrandFilters={setBrandFilters}
                    priceFilters={priceFilters}
                    setPriceFilters={setPriceFilters}
                    ratingFilters={ratingFilters}
                    setRatingFilters={setRatingFilters}
                    setFilterCategory={setFilterCategory}
                    filterProductsCategory={filterProductsCategory}
                    setFilterProductsCategory={setFilterProductsCategory}
                />
                <div className="sort-and-filter">
                    <SortList
                        setSortCriteria={setSortCriteria}
                    />
                    <FilterAndSortProduct
                        brandFilters={brandFilters}
                        priceFilters={priceFilters}
                        ratingFilters={ratingFilters}
                        sortCriteria={sortCriteria}
                        filterCategory={filterCategory}
                        filterProductsCategory={filterProductsCategory}
                    />
                </div>

            </section>
        </>
    );
}

export default ProductExplorer;