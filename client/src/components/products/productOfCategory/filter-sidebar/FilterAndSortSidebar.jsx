import { useSelector } from "react-redux";
import "./FilterAndSortSidebar.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RenderCategories from "./RenderCategories";
import RenderBrands from "./RenderBrands";

const FilterAndSortSidebar = (props) => {
    const { brandFilters, setBrandFilters, priceFilters, setPriceFilters, ratingFilters, setRatingFilters,
        setSearchCategory, searchProductsCategory, setSearchProductsCategory
    } = props;
    const products = useSelector((state) => state.categoryOfProducts);
    const searchCategories = useSelector((state) => state.searchCategories);
    const searchProducts = useSelector(state => state.searchProducts);
    // console.log(products, searchCategories, searchProducts);
    const params = useParams();
    const particularCategory = params.particularCategory;
    // console.log(particularCategory);
    const [finalProducts, setFinalProducts] = useState([]);

    const handlePriceChange = (price) => {
        setPriceFilters((prev) =>
            prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
        );
    };
    const handleRatingChange = (rating) => {
        setRatingFilters((prev) =>
            prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
        );
    };
    const isFilterActive = brandFilters.length > 0 || priceFilters.length > 0 || ratingFilters.length > 0;
    const clearFilters = () => {
        setBrandFilters([]);
        setPriceFilters([]);
        setRatingFilters([]);
    };

    useEffect(() => {
        setFinalProducts(products.length > 0 ? products : searchProducts);
    }, [products, searchProducts]);
    // console.log(finalProducts);

    if (!finalProducts) return <h1>Loading...</h1>;
    let uniqeBrands = [];
    finalProducts.forEach((product) => {
        if (product.brand && !uniqeBrands.includes(product.brand)) {
            uniqeBrands.push(product.brand);
        }
    });
    // console.log(uniqeBrands, uniqeBrands.length);
    const renderList = () => {
        return (
            <>
                <div className="filter-sidebar-container">
                    <div className="filter-sidebar">
                        <div className="filters">
                            <p className="first">Filters</p>
                            {isFilterActive && (
                                <p className="second" onClick={clearFilters}>
                                    Clear Filter
                                </p>
                            )}
                        </div>
                        <div className="filter-category">
                            <h1 className="category-header">Category</h1>
                            <div>
                                <RenderCategories
                                    particularCategory={particularCategory}
                                    searchCategories={searchCategories}
                                    searchProducts={searchProducts}
                                    setSearchCategory={setSearchCategory}
                                    setSearchProductsCategory={setSearchProductsCategory}
                                />
                            </div>
                        </div>
                        <>
                            <RenderBrands
                                searchProductsCategory={searchProductsCategory}
                                brandFilters={brandFilters}
                                setBrandFilters={setBrandFilters}
                            />
                        </>
                        <div className="filter-price">
                            <h1 className="price-header">Price</h1>
                            <div>
                                <ul>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={priceFilters.includes("500 & bellow")}
                                            onChange={() => handlePriceChange("500 & bellow")}
                                        />
                                        500 & bellow
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={priceFilters.includes("1000 & bellow")}
                                            onChange={() => handlePriceChange("1000 & bellow")}
                                        />
                                        1000 & bellow
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={priceFilters.includes("1500 & bellow")}
                                            onChange={() => handlePriceChange("1500 & bellow")}
                                        />
                                        1500 & bellow
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={priceFilters.includes("2000 & above")}
                                            onChange={() => handlePriceChange("2000 & above")}
                                        />
                                        2000 & above
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="filter-rating">
                            <h1 className="rating-header">Rating</h1>
                            <div>
                                <ul>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={ratingFilters.includes("2★ & above")}
                                            onChange={() => handleRatingChange("2★ & above")}
                                        />
                                        2★ & above
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={ratingFilters.includes("3★ & above")}
                                            onChange={() => handleRatingChange("3★ & above")}
                                        />
                                        3★ & above
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={ratingFilters.includes("4★ & above")}
                                            onChange={() => handleRatingChange("4★ & above")}
                                        />
                                        4★ & above
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return <>{renderList()}</>;
};

export default FilterAndSortSidebar;
