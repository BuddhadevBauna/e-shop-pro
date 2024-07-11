import { useDispatch, useSelector } from "react-redux";
import "./FilterAndSortProduct.css";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import constructQueryString from "./generate-query-string/constructQueryString";
import {
    removeFilterAndSortProducts,
    setFilterAndSortProducts,
} from "../../../../store/redux/reducers/filterAndSortProductSlice";

const FilterAndSortProduct = (props) => {
    const {
        brandFilters,
        priceFilters,
        ratingFilters,
        sortCriteria,
        filterCategory,
        filterProductsCategory,
    } = props;
    // console.log(brandFilters, priceFilters, ratingFilters, sortCriteria, filterCategory, filterProductsCategory);

    const categoryOfproducts = useSelector((state) => state.categoryOfProducts);
    // console.log(categoryOfproducts);
    const searchCategories = useSelector((state) => state.searchCategories);
    // console.log(searchCategories);
    const searchProducts = useSelector((state) => state.searchProducts);
    // console.log(searchProducts);
    const filterAndSortProducts = useSelector(
        (state) => state.filterAndSortProducts
    );
    // console.log(filterAndSortProducts);
    const filterAndSearchProducts = useSelector(
        (state) => state.filterAndSearchProducts
    );
    // console.log(filterAndSearchProducts);

    const dispatch = useDispatch();
    const params = useParams();
    const particularCategory = params.particularCategory;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchInput = searchParams.get("q");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getsortAndFilterProduct = async () => {
            setLoading(true);
            try {
                dispatch(removeFilterAndSortProducts());

                const queryString = constructQueryString(brandFilters, priceFilters, ratingFilters, sortCriteria);
                // console.log(queryString);

                let response;
                if (particularCategory) {
                    response = await axios.get(
                        `http://localhost:3030/products/category/${particularCategory}/q${queryString}`
                    );
                } else if (filterCategory) {
                    response = await axios.get(
                        `http://localhost:3030/products/search/q${queryString}&searchInput=${filterCategory}`
                    );
                } else if (filterProductsCategory) {
                    response = await axios.get(
                        `http://localhost:3030/products/search/q${queryString}&searchInput=${searchInput}&filterCategory=${filterProductsCategory}`
                    );
                }
                // console.log(response);

                if (response.status === 200) {
                    dispatch(setFilterAndSortProducts(response.data));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (brandFilters.length > 0 || priceFilters.length > 0 || ratingFilters.length > 0 || sortCriteria || particularCategory || filterCategory || filterProductsCategory) {
            getsortAndFilterProduct();
        } else {
            dispatch(removeFilterAndSortProducts());
        }
    }, [brandFilters, priceFilters, ratingFilters, sortCriteria, particularCategory, filterCategory, filterProductsCategory,]);

    let finalProducts = [];
    if (brandFilters.length > 0 || priceFilters.length > 0 || ratingFilters.length > 0 || sortCriteria) {
        finalProducts = filterAndSortProducts;
    } else if (searchProducts.length > 0) {
        if (searchCategories.length > 0) {
            finalProducts = searchProducts;
        } else {
            finalProducts = filterAndSearchProducts;
        }
    } else {
        finalProducts = categoryOfproducts;
    }
    // console.log(finalProducts);


    if (loading) {
        return <h1>Loading...</h1>;
    }
    const renderList = finalProducts.map((product, index) => {
        let { _id, title, thumbnail, rating, description, price, discountPercentage, stock, } = product;
        let MRP = price / (1 - discountPercentage / 100);
        let MRPInt = Math.round(MRP);
        return (
            <div key={index} className="container-filter">
                <div className="product-details">
                    <Link to={`/favourite`} className="favourite">
                        <i className="icon"><FaRegHeart /></i>
                    </Link>
                    <Link to={`/products/${_id}`} className="product-img">
                        <img src={thumbnail} alt="product-img"></img>
                    </Link>
                    <Link to={`/products/${_id}`} className="product-details-container">
                        <div className="product-description">
                            <h2>
                                {window.innerWidth < 767 ? `${title.slice(0, 18)}...` : title}
                            </h2>
                            <p>
                                <span className="rating">{rating}★</span>{" "}
                                <span>80 Rating & 10 Reviews</span>
                            </p>
                            <p className="description">
                                {window.innerWidth < 767
                                    ? `${description.slice(0, 25)}...`
                                    : description}
                            </p>
                        </div>
                        <div className="product-buy">
                            <p>₹ {parseInt(price)}</p>
                            <small>
                                <span>₹ {MRPInt}</span> {discountPercentage}% off
                            </small>
                            <small className="stock">only {stock} left</small>
                        </div>
                    </Link>
                </div>
            </div>
        );
    });

    return (
        <>
            {finalProducts.length === 0 ?
                <div className="filter-product-container">
                    <h1 style={{ backgroundColor: "white", padding: "1rem", textAlign: "center", fontSize: "1.3rem" }}>No Product Found</h1>
                </div>
                :
                <div className="filter-product-container">{renderList}</div>
            }
        </>
    );
};

export default FilterAndSortProduct;
