import { useMemo } from "react";
import "./Cart.css";
import { useAuth } from "../../../store/context/auth";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
    const { cartData, isLoadingCartData } = useAuth();

    const content = useMemo(() => {
        if (isLoadingCartData) {
            return <div className="cart-section" style={{fontSize: "1.2rem", fontWeight: "bold"}}>Loading...</div>;
        }
        if (!cartData || !cartData.cartItems || cartData.cartItems.length === 0) {
            return <div className="cart-section" style={{fontSize: "1.2rem", fontWeight: "bold"}}>Your cart is empty.</div>;
        }
        return (
            <section className="cart-section">
                <div className="cart-container">
                    {
                        cartData.cartItems.map((cartItem) => {
                            const { _id, productId, title, description, brand, price, discountPercentage,
                                thumbnail, stock, shippingInformation } = cartItem;
                            let MRP = price / (1 - discountPercentage / 100);
                            return (
                                <div className="cart" key={_id}>
                                    <div className="image-container">
                                        <Link to={`/products/${productId}`}>
                                            <img src={thumbnail} alt={_id} />
                                        </Link>
                                    </div>
                                    <div className="description-container">
                                        <Link to={`/products/${productId}`}>
                                            <p className="title">{title}</p>
                                            <p className="description">{description.slice(0, 60)}...</p>
                                        </Link>
                                        {brand && <p className="brand">Brand : {brand}</p>}
                                        <p className="price">
                                            <span className="mrp">₹ {Math.round(MRP)}</span>
                                            <span className="sale-price">₹ {parseInt(price)}</span>
                                            <span className="discount">{discountPercentage}% off</span>
                                        </p>
                                    </div>
                                    <div className="shipping-container">
                                        <p className="shipping-information">
                                            <span>{shippingInformation}</span>
                                            <span className="or"> | </span>
                                            <span>Free</span>
                                        </p>
                                    </div>
                                    <div className="increment-decrement-container">
                                        <i><FaMinus /></i>
                                        <input type="number" name="" />
                                        <i><FaPlus /></i>
                                    </div>
                                    <div className="remove-container">
                                        <button>REMOVE</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="price-details-container">
                    <div className="price-details">
                        <h4>PRICE DETAILS</h4>
                        <hr style={{borderTopStyle: "solid", }}/>
                        <div>
                            <p>
                                <span>Price ({cartData.cartItems.length} item)</span>
                                <span>₹1200</span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span className="discount">₹600</span>
                            </p>
                            <p>
                                <span>Delivery Charges</span>
                                <span className="delivery-charge">Free</span>
                            </p>
                            <hr />
                            <p className="total">
                                <span>Total Amount</span>
                                <span>₹600</span>
                            </p>
                            <hr />
                            <p className="saving">You will save ₹600 on this order</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }, [cartData])

    return content;
}

export default Cart;