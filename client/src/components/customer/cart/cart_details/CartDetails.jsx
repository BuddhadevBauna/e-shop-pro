import React from "react";
import "./CartDetails.css";
import "../../common.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { cartChannel } from "../../../../store/context/cartUpdateChannel";
import { useCart } from "../../../../store/context/cart-context";
import createOrder from "./createOrder";

const CartDetails = () => {
    const { cartData, fetchCartProducts } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = async (userID, productId, quantity) => {
        if (!userID) {
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            const existingItem = cart.find((item) => item.product === productId);
            if (existingItem) {
                existingItem.quantity = quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                cartChannel.postMessage({ type: "CART_UPDATED" });
                await fetchCartProducts();
                toast.success("Cart item quantity updated successfully.");
            } else {
                toast.error("Cart item quantity updated unsuccessful.");
            }
        } else {
            try {
                const data = { quantity: quantity };
                const response = await axios.patch(
                    `http://localhost:3030/cart/update?userID=${userID}&productId=${productId}`,
                    data,
                    { withCredentials: true }
                );
                // console.log(response);
                if (response.status === 200) {
                    cartChannel.postMessage({ type: 'CART_UPDATED' });
                    await fetchCartProducts(userID);
                    toast.success(response?.data?.message);
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
    };
    const handleIncrement = (userID, productId, quantity, maxOrderQuantity, stock, reservedStock, isDeleted) => {
        if (!isDeleted && stock > 0) {
            if (quantity < (stock - reservedStock) && quantity < maxOrderQuantity) {
                handleQuantityChange(userID, productId, quantity + 1);
            }
        }
    };
    const handleDecrement = (userID, productId, quantity, stock, isDeleted) => {
        if (!isDeleted && stock > 0) {
            if (quantity > 1) {
                handleQuantityChange(userID, productId, quantity - 1);
            }
        }
    };

    const deleteCartItem = async (userID, productId) => {
        if (!userID) {
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            const updatedCart = cart.filter(item => item.product !== productId);
            if (cart.length !== updatedCart.length) {
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                cartChannel.postMessage({ type: 'CART_DELETED' });
                await fetchCartProducts();
                toast.success("Cart item deleted successfully.");
            } else {
                toast.error("cart item delete unsucessful.");
            }
        } else {
            try {
                const response = await axios.delete(
                    `http://localhost:3030/cart/delete?userID=${userID}&productId=${productId}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    cartChannel.postMessage({ type: 'CART_DELETED' });
                    await fetchCartProducts(userID);
                    toast.success(response?.data?.message);
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
    };

    const handleOrderClick = (cartData) => {
        const orderData = {userId: cartData.user};
        orderData.products = cartData.items.map(item => ({
            productId: item.product._id,
            quantity: item.quantity,
            productSnapshot: {
                thumbnail: item.product.thumbnail,
                title: item.product.title,
                description: item.product.description,
                mrp: item.product.mrp,
                discountPercentage: item.product.discountPercentage
            }
        }));
        createOrder(orderData, navigate);
    }

    return (
        <section className="cart-section">
            <div className="cart-container">
                <div className="cart">
                    <>
                        {cartData?.items.map((cartItem) => {
                            const { product, quantity, totalDiscount, totalMRP, totalSalePrice } = cartItem;
                            const { _id, title, description, brand, thumbnail, stock, reservedStock, maxOrderQuantity, shippingInformation,
                                isDeleted } = product;
                            const discountPercentage = Math.round((totalDiscount / totalMRP) * 100);

                            return (
                                <div className="cart-item" key={_id}>
                                    <div className="image-container">
                                        <Link to={`/products/${_id}`}>
                                            <img src={thumbnail} alt={_id} />
                                        </Link>
                                    </div>
                                    <div className="description-container">
                                        <Link to={`/products/${_id}`}>
                                            <p className="title">{title}</p>
                                            <p className="description">
                                                {description.slice(0, 60)}...
                                            </p>
                                        </Link>
                                        {brand && <p className="brand">Brand : {brand}</p>}
                                        <p className={`price ${isDeleted ? 'not-include-pice' : ''}`}>
                                            <span className="mrp">₹ {totalMRP}</span>
                                            <span className="sale-price">₹ {totalSalePrice}</span>
                                            <span className="discount">
                                                {discountPercentage}% off
                                            </span>
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
                                        <button className={`${(isDeleted || stock === 0 || quantity === 1) ? 'disable' : ''}`}>
                                            <i onClick={() => handleDecrement(cartData.user, _id, quantity, stock, isDeleted)}>
                                                <FaMinus className="icon" />
                                            </i>
                                        </button>
                                        <p>{quantity}</p>
                                        <button className={`${isDeleted || stock === 0 || quantity >= (stock - reservedStock) || quantity >= maxOrderQuantity ? 'disable' : ''}`}>
                                            <i onClick={() => handleIncrement(cartData.user, _id, quantity, maxOrderQuantity, stock, reservedStock, isDeleted)}>
                                                <FaPlus className="icon" />
                                            </i>
                                        </button>
                                    </div>
                                    <div className={`remove-container`}>
                                        <button onClick={() => deleteCartItem(cartData.user, _id)}>
                                            REMOVE
                                        </button>
                                    </div>
                                    {isDeleted ? (
                                        <p className="error">This product is no longer available.</p>
                                    ) : stock === 0 ? (
                                        <p className="error">Product is out of stock.</p>
                                    ) : quantity > (stock - reservedStock) ? (
                                        <p className="error">Only {stock - reservedStock} left in stock.</p>
                                    ) : quantity > maxOrderQuantity ? (
                                        <p className="error">Maximum {maxOrderQuantity} units allowed per order.</p>
                                    ) : null}
                                </div>
                            );
                        })}
                        <div className="order-btn-container">
                            <button className="order-btn" onClick={() => handleOrderClick(cartData)}>Place Order</button>
                        </div>
                    </>
                </div>
            </div>
            <div className="price-details-container">
                <div className="price-details">
                    {cartData?.items && (
                        <>
                            <h4>PRICE DETAILS</h4>
                            <hr style={{ borderTopStyle: "solid" }} />
                            <div>
                                <p>
                                    <span>Price ({cartData.items?.length} item)</span>
                                    <span>₹{cartData?.cartFinalMRP}</span>
                                </p>
                                <p>
                                    <span>Discount</span>
                                    <span className="discount">-₹{cartData?.cartFinalDiscount}</span>
                                </p>
                                <p>
                                    <span>Delivery Charges</span>
                                    <span className="delivery-charge">Free</span>
                                </p>
                                <hr />
                                <p className="total">
                                    <span>Total Amount</span>
                                    <span>₹{cartData?.cartFinalPrice}</span>
                                </p>
                                <hr />
                                <p className="saving">You will save ₹{cartData?.cartFinalDiscount} on this order</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CartDetails;