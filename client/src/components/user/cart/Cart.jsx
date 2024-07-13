import { useMemo, useState } from "react";
import "./Cart.css";
import { useAuth } from "../../../store/context/auth";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";

const Cart = () => {
    const { cartData, isLoadingCartData, AuthorizationToken, fetchCartProducts } = useAuth();
    const [totalCartItemMRP, setTotalCartItemMRP] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleQuantityChange = async (itemID, quantity) => {
        try {
            const data = {
                "quantity": quantity
            }
            const respnse = await axios.patch(`http://localhost:3030/cart/update?userCartID=${cartData._id}&itemId=${itemID}`, data, {
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            // console.log(respnse);
            if (respnse.status === 200) {
                await fetchCartProducts();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const content = useMemo(() => {
        if (isLoadingCartData) {
            return <div className="cart-section" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Loading...</div>;
        }
        if (!cartData || !cartData.cartItems || cartData.cartItems.length === 0) {
            return <div className="cart-section" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Your cart is empty.</div>;
        }
        return (
            <section className="cart-section">
                <div className="cart-container">
                    <div className="cart">
                        {
                            cartData.cartItems.map((cartItem) => {
                                const { _id, productId, title, description, brand, price,
                                    discountPercentage, thumbnail, stock, shippingInformation,
                                    quantity
                                } = cartItem;
                                let totalPrice = price * quantity;
                                let MRP = totalPrice / (1 - discountPercentage / 100);

                                const handleIncrement = () => {
                                    if (stock > 10) {
                                        if (quantity < 5) {
                                            handleQuantityChange(_id, quantity + 1);
                                            setTotalAmount(totalAmount + totalPrice);
                                        }
                                    }
                                };

                                const handleDecrement = () => {
                                    if (quantity > 1) {
                                        handleQuantityChange(_id, quantity - 1);
                                    }
                                };

                                return (
                                    <div className="cart-item" key={_id}>
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
                                                <span className="sale-price">₹ {parseInt(totalPrice)}</span>
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
                                            <button>
                                                <i onClick={handleDecrement}>
                                                    <FaMinus className="icon" />
                                                </i>
                                            </button>
                                            <p>{quantity}</p>
                                            <button>
                                                <i onClick={handleIncrement}>
                                                    <FaPlus className="icon" />
                                                </i>
                                            </button>
                                        </div>
                                        <div className="remove-container">
                                            <button>REMOVE</button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="price-details-container">
                    <div className="price-details">
                        <h4>PRICE DETAILS</h4>
                        <hr style={{ borderTopStyle: "solid", }} />
                        <div>
                            <p>
                                <span>Price ({cartData.cartItems.length} item)</span>
                                <span>₹{totalCartItemMRP}</span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span className="discount">-₹{totalDiscount}</span>
                            </p>
                            <p>
                                <span>Delivery Charges</span>
                                <span className="delivery-charge">Free</span>
                            </p>
                            <hr />
                            <p className="total">
                                <span>Total Amount</span>
                                <span>₹{totalAmount}</span>
                            </p>
                            <hr />
                            <p className="saving">You will save ₹{totalDiscount} on this order</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }, [cartData])

    return content;
}

export default Cart;