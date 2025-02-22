import axios from "axios";
import React, { useEffect } from "react";
import "./ProductExplorer.css";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { removeSelectedOrSearchCategories, setSelectedOrSearchCategories } from "../../../store/redux/reducers/selectedOrSearchCategorySlice";
import { removeSelectedOrSearchProducts, setSelectedOrSearchProducts } from "../../../store/redux/reducers/selectedOrSearchProductSlice";
import FilterSidebar from "./filter-sidebar/FilterSidebar";
import SortList from "./sort-list/SortList";
import FilterAndSortProduct from "./filter-sort-product/FilterAndSortProduct";
import { removeBrandsOfSelectedOrSearchProducts, setBrandsOfSelectedOrSearchProducts } from "../../../store/redux/reducers/brandsOfSelectedOrSearchProductSlice";

const ProductExplorer = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const fetchCategoriesAndProducts = async(url) => {
        try {
            dispatch(removeSelectedOrSearchCategories());
            dispatch(removeBrandsOfSelectedOrSearchProducts());
            dispatch(removeSelectedOrSearchProducts());
            const response = await axios.get(url);
            const categories = response?.data?.categories;
            const products = response?.data?.products;
            const brands = response?.data?.uniqueBrands;
            // console.log(categories, brands, products);
            dispatch(setSelectedOrSearchCategories(categories));
            dispatch(setBrandsOfSelectedOrSearchProducts(brands));
            dispatch(setSelectedOrSearchProducts(products));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const q = searchParams.get("q");
        const category = searchParams.get("category");
        const brands = searchParams.get("brands");
        const minRatings = searchParams.get("minRatings");
        const sortBy = searchParams.get("sortBy");
        // console.log(q, category, brands, minRatings, sortBy);

        let url = `http://localhost:3030/products/searchandSelect?q=${encodeURIComponent(q)}`;
        if(category) url += `&category=${encodeURIComponent(category)}`;
        if(brands) url += `&brands=${encodeURIComponent(brands)}`;
        if(minRatings) url+= `&minRatings=${encodeURIComponent(minRatings)}`;
        if(sortBy) url += `&sortBy=${encodeURIComponent(sortBy)}`;

        if(url) fetchCategoriesAndProducts(url);
        // console.log(url);
    }, [searchParams]);

    return (
        <section className="category-of-product">
            <FilterSidebar />
            <div className="sort-and-filter">
                <SortList />
                <FilterAndSortProduct />
            </div>
        </section>
    );
}

export default ProductExplorer;