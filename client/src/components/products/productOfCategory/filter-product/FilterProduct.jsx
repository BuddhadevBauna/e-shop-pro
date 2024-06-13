import { useSelector } from "react-redux";
import "./FilterProduct.css";
import { FaRegHeart } from "react-icons/fa";

const FilterProduct = () => {
    const products = useSelector((state) => state.categoryOfProducts.products);
    // console.log(products);

    if (!products) return <h1>Loading...</h1>;
    const renderList = products.map((product, index) => {
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