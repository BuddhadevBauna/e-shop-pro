import { useState } from "react";
import "./ProductSlide.css";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductSlide = ({ product }) => {
    let { _id, title, thumbnail, category, mrp, salePrice, discountPercentage, rating } = product;

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
                    <Link to={`/products/${_id}`} target="_blank">
                        <div className="product-img">
                            <img
                                src={thumbnail}
                                alt={`${category.name}-img`}
                                style={{ display: loaded ? "block" : "none" }}
                                onLoad={() => setLoaded(true)}
                            />
                        </div>
                        <div className="product-details">
                            <small className="category">{category.name}</small>
                            <p>{title.length > 25 ? title.substring(0, 25) + "..." : title}</p>
                            <small className="rating">{rating} ★</small>
                            <p>₹ {salePrice}</p>
                            <small className="mrp-discount">
                                <span className="mrp">₹ {mrp}</span>
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
