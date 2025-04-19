import React from "react";
import "./OrderSummery.css";
import { FiCheck } from "react-icons/fi";
import { useorder } from "../../../../store/context/order-context";

const OrderSummery = ({ activeSection, setActiveSection }) => {
    const { getRecentorder, order } = useorder();
    const handleChange = () => {
        setActiveSection(["payment", 4]);
    }

    return (
        <div className={`placeorder-item order-summery-container ${!activeSection.includes("orderSummery") ? "not-active" : ""}`}>
            <h2>
                <span>3</span>
                <span>Order Summery</span>
                {activeSection[1] > 3 && <i><FiCheck /></i>}
            </h2>
            {activeSection.includes("orderSummery") && (
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
            )}
            {activeSection[1] > 3 && <button className="change-btn" onClick={handleChange}>Change</button>}
        </div>
    );
}

export default OrderSummery;