import { useMemo, useState } from "react";
import "./Cart.css";
import { useAuth } from "../../../store/context/auth";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";

const Cart = () => {
    const { cartData, isLoadingCartData, AuthorizationToken, fetchCartProducts } = useAuth();

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

    const deleteCartItem = async (userCartID, cartItemId) => {
        try {
            const response = await axios.delete(`http://localhost:3030/cart/delete?userCartID=${userCartID}&cartItemId=${cartItemId}`, {
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            if (response.status === 200) {
                await fetchCartProducts();
            }
        } catch (error) {
            console.error(error);
        }
    }

    let totalSalePrice = 0;
    let totalMRP = 0;
    const content = useMemo(() => {
        if (isLoadingCartData) {
            return (
                <div className="cart-section" style={{ height: "12rem" }}>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Loading...</p>
                </div>
            );
        }
        if (!cartData || !cartData.cartItems || cartData.cartItems.length === 0) {
            return (
                <div className="cart-section empty-cart">
                    <p>Your cart is empty!</p>
                    <small>Add products to it now.</small>
                    <Link to={'/'}>
                        <button>Shop Now</button>
                    </Link>
                </div>
            );
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
                                let subTotalSalePrice = price * quantity;
                                let subTotalMRP = subTotalSalePrice / (1 - discountPercentage / 100);
                                totalSalePrice += subTotalSalePrice;
                                totalMRP += subTotalMRP;

                                const handleIncrement = () => {
                                    if (stock > 10) {
                                        if (quantity < 5) {
                                            handleQuantityChange(_id, quantity + 1);
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
                                                <span className="mrp">₹ {Math.round(subTotalMRP)}</span>
                                                <span className="sale-price">₹ {Math.round(subTotalSalePrice)}</span>
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
                                            <button onClick={() => deleteCartItem(cartData._id, _id)}>REMOVE</button>
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
                                <span>₹{Math.round(totalMRP)}</span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span className="discount">-₹{Math.round(totalMRP - totalSalePrice)}</span>
                            </p>
                            <p>
                                <span>Delivery Charges</span>
                                <span className="delivery-charge">Free</span>
                            </p>
                            <hr />
                            <p className="total">
                                <span>Total Amount</span>
                                <span>₹{Math.round(totalSalePrice)}</span>
                            </p>
                            <hr />
                            <p className="saving">You will save ₹{Math.round(totalSalePrice)} on this order</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }, [cartData])

    return content;
}

export default Cart;