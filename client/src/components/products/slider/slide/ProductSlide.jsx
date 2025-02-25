import { useState } from "react";
import "./ProductSlide.css";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductSlide = ({ product }) => {
    let { _id, title, thumbnail, category, price, discountPercentage, rating } = product;
    let MRP = price / (1 - discountPercentage / 100);
    let MRPInt = Math.round(MRP);

    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {product && (
                <div className={`product-container`}>
                    <Link to={`/wishlist`}>
                        <i className="favourite">
                            <FaRegHeart />
                        </i>
                    </Link>
                    <Link to={`/products/${_id}`}>
                        <div className="product-img">
                            <img
                                src={thumbnail}
                                alt={`${category}-img`}
                                style={{ display: loaded ? "block" : "none" }}
                                onLoad={() => setLoaded(true)}
                            />
                        </div>
                        <div className="product-details">
                            <small className="category">{category}</small>
                            <p>{title.length > 25 ? title.substring(0, 25) + "..." : title}</p>
                            <small className="rating">{rating} ★</small>
                            <p>₹ {Math.round(price)}</p>
                            <small>
                                <span className="mrp">₹ {MRPInt}</span>
                                <span>{discountPercentage}% off</span>
                            </small>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export default ProductSlide;
