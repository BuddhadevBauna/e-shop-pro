import { useDispatch, useSelector } from "react-redux";
import "./FilterAndSortProduct.css";
import { FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import constructQueryString from "./generate-query-string/constructQueryString";
import { removeFilterAndSortProducts, setFilterAndSortProducts } from "../../../../store/redux/reducers/filterAndSortProductSlice";

const FilterAndSortProduct = (props) => {
    const { brandFilters, priceFilters, ratingFilters, sortCriteria } = props;
    // console.log(brandFilters, priceFilters, ratingFilters, sortCriteria);

    const products = useSelector((state) => state.categoryOfProducts);
    // console.log(products);
    const filterAndSortProducts = useSelector(state => state.filterAndSortProducts);
    // console.log(filterAndSortProducts);

    const params = useParams();
    const particularCategory = params.particularCategory;
    const dispatch = useDispatch();

    let finalProducts = [];
    if (brandFilters.length > 0 || priceFilters.length > 0 || ratingFilters.length > 0 || sortCriteria) {
        finalProducts = filterAndSortProducts;
    } else {
        finalProducts = products;
    }
    // console.log(finalProducts);


    useEffect(() => {
        const getsortAndFilterProduct = async () => {
            try {
                dispatch(removeFilterAndSortProducts());

                const queryString = constructQueryString(brandFilters, priceFilters, ratingFilters, sortCriteria);
                console.log(queryString);

                const response = await axios.get(`http://localhost:3030/products/category/${particularCategory}/q${queryString}`);
                // console.log(response);

                if (response.status === 200) {
                    dispatch(setFilterAndSortProducts(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (brandFilters.length > 0 || priceFilters.length > 0 || ratingFilters.length > 0 || sortCriteria) {
            getsortAndFilterProduct();
        } else {
            dispatch(removeFilterAndSortProducts());
        }
    }, [brandFilters, priceFilters, ratingFilters, sortCriteria]);


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

export default FilterAndSortProduct;