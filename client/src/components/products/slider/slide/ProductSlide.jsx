import "./ProductSlide.css";
import { FaRegHeart } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { Link } from "react-router-dom";

const ProductSlide = ({ product}) => {
    let { id, title, thumbnail, category, price, discountPercentage, rating } = product;
    let MRP = price / (1 - discountPercentage / 100);
    let MRPInt = Math.round(MRP);

    return (
        <>
            <div className={`product-container`}>
                <img className="product-img" src={thumbnail} alt={`${category}-img`} />
                <div className="product-body">
                    <div className="product-stock">
                        <small>{category}</small>
                        <i>
                            <FaRegHeart />
                        </i>
                    </div>
                    <p>{title.length > 25 ? title.substring(0, 25) + "..." : title}</p>
                    <div className="product-buy">
                        <p>₹ {price}</p>
                        <small>
                            <span>₹ {MRPInt}</span> {discountPercentage}% off{" "}
                        </small>
                        <small className="rating">{rating} ★</small>
                    </div>
                    <div className="product-btn">
                        <Link to={"/cart"}>
                            <button type="button" className="btn">Add To Cart</button>
                        </Link>
                        <Link to={`/products/${id}`}>
                            <button type="button" className="btn view-btn">
                                <i><GrFormView /></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductSlide;
