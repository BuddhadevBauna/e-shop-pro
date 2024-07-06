import { useState } from "react";
import "./ProductSlide.css";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";

const ProductSlide = ({ product }) => {
    let { _id, title, thumbnail, category, price, discountPercentage, rating } = product;
    let MRP = price / (1 - discountPercentage / 100);
    let MRPInt = Math.round(MRP);

    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {product && (
                <div className={`product-container`}>
                    <Link to={`/favourite`}>
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
                            <p>₹ {price}</p>
                            <small>
                                <span>₹ {MRPInt}</span>
                                {discountPercentage}% off{" "}
                            </small>
                            <small className="rating">{rating} ★</small>
                        </div>
                    </Link>
                    <div className="product-btn">
                        <Link to={"/cart"}>
                            <button type="button" className="btn">
                                Add To Cart
                            </button>
                        </Link>
                        <Link to={`/products/${_id}`}>
                            <button type="button" className="btn view-btn">
                                <i>
                                    <IoEyeSharp />
                                </i>
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductSlide;
