import { useSelector } from "react-redux";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";
import RenderCategories from "./RenderCategories";
import RenderBrands from "./RenderBrands";

const FilterSidebar = (props) => {
    const { brandFilters, setBrandFilters, priceFilters, setPriceFilters, ratingFilters, setRatingFilters,
        setFilterCategory, filterProductsCategory, setFilterProductsCategory
    } = props;

    const categoyProducts = useSelector((state) => state.categoryOfProducts);
    const searchProducts = useSelector(state => state.searchProducts);
    // console.log(categoyProducts, searchProducts);

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

    const [finalProducts, setFinalProducts] = useState([]);
    useEffect(() => {
        setFinalProducts(categoyProducts.length > 0 ? categoyProducts : searchProducts);
    }, [categoyProducts, searchProducts]);
    // console.log(finalProducts);

    if (!finalProducts) return <h1>Loading...</h1>;
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
                                    setFilterCategory={setFilterCategory}
                                    setFilterProductsCategory={setFilterProductsCategory}
                                />
                            </div>
                        </div>
                        <>
                            <RenderBrands
                                filterProductsCategory={filterProductsCategory}
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

export default FilterSidebar;
