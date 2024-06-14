import { useDispatch, useSelector } from "react-redux";
import "./FilterProduct.css";
import { FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { removeFilterProducts, setFilterProducts } from "../../../../store/redux/reducers/filterProductSlice";

const constructQueryString = (brandFilters, priceFilters, ratingFilters) => {
    const query = [];
    // Add brand filters to the query
    if (brandFilters.length > 0) {
        query.push(`filterBrand=${brandFilters.join(",")}`);
    }
    // Add price filters to the query
    if (priceFilters.length > 0) {
        const priceQueries = [];
        priceFilters.forEach(price => {
            if (price === "500 & bellow") priceQueries.push("maxPrice=500");
            if (price === "1000 & bellow") priceQueries.push("maxPrice=1000");
            if (price === "1500 & bellow") priceQueries.push("maxPrice=1500");
            if (price === "2000 & above") priceQueries.push("minPrice=2000");
        });
        query.push(priceQueries.join("&"));
    }
    // Add rating filters to the query
    if (ratingFilters.length > 0) {
        const ratingQueries = [];
        ratingFilters.forEach(rating => {
            if (rating === "2★ & above") ratingQueries.push("minRating=2");
            if (rating === "3★ & above") ratingQueries.push("minRating=3");
            if (rating === "4★ & above") ratingQueries.push("minRating=4");
        });
        query.push(ratingQueries.join("&"));
    }
    return query.length > 0 ? `?${query.join("&")}` : "";
};

const FilterProduct = (props) => {
    const { brandFilters, priceFilters, ratingFilters } = props;
    console.log(brandFilters, priceFilters, ratingFilters);
    const products = useSelector((state) => state.categoryOfProducts);
    // console.log(products);
    const filterProducts = useSelector(state => state.filterProducts);
    // console.log(filterProducts);
    const finalProducts = filterProducts.length > 0 ? filterProducts : products;
    // console.log(finalProducts);
    const params = useParams();
    const particularCategory = params.particularCategory;
    const dispatch = useDispatch();

    
    useEffect(() => {
        const getFilterProducts = async () => {
            try {
                dispatch(removeFilterProducts());
                const queryString = constructQueryString(brandFilters, priceFilters, ratingFilters);
                // console.log(queryString);
                const response = await axios.get(`http://localhost:3030/products/category/${particularCategory}/filter${queryString}`);
                if (response.status === 200) {
                    dispatch(setFilterProducts(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(brandFilters.length > 0 || priceFilters.length > 0 || ratingFilters.length > 0) {
            getFilterProducts();
        } else {
            dispatch(removeFilterProducts());
        }
    }, [brandFilters, priceFilters, ratingFilters]);

    if (!finalProducts) return <h1>Loading...</h1>;
    const renderList = finalProducts.map((product, index) => {
        let { title, thumbnail, rating, description, price, discountPercentage, stock } = product;
        let MRP = price / (1 - discountPercentage / 100);
        let MRPInt = Math.round(MRP);
        return (
            <div key={index} className="container-filter">
                <div className="product-img">
                    <img src={thumbnail} alt="product-img"></img>
                </div>
                <div className="product-details">
                    <div className="icon">
                        <i>
                            <FaRegHeart />
                        </i>
                    </div>
                    <div className="product-details-container">
                        <div className="product-description">
                            <h2>{window.innerWidth < 767 ? `${title.slice(0, 18)}...` : title}</h2>
                            <p>
                                <span className="rating">{rating}★</span>{" "}
                                <span>80 Rating & 10 Reviews</span>
                            </p>
                            <p className="description">
                                {window.innerWidth < 767 ? `${description.slice(0, 25)}...` : description}
                            </p>
                        </div>
                        <div className="product-buy">
                            <p>₹ {price}</p>
                            <small>
                                <span>₹ {MRPInt}</span> {discountPercentage}% off
                            </small>
                            <small className="stock">only {stock} left</small>
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    })

    return (
        <>
            <div className="filter-product-container">
                {renderList}
            </div>
        </>
    );
}

export default FilterProduct;