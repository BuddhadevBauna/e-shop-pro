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
                <div className="order-container">
                    <div className="order">
                        {/* {order?.products.map((orderItem) => {
                            const { productId, quantity, productSnapshot, totalDiscount, totalMRP, totalSalePrice } = orderItem;
                            const { thumbnail, title, description, brand, shippingInformation } = productSnapshot;
                            const discountPercentage = Math.round((totalDiscount / totalMRP) * 100);

                            return (
                                <div className="order-item" key={productId}>
                                    <div className="image-container">
                                        <img src={thumbnail} alt={productId} />
                                    </div>
                                    <div className="description-container">
                                        <p className="title">{title}</p>
                                        <p className="description">
                                            {description.slice(0, 60)}...
                                        </p>
                                        {brand && <p className="brand">Brand : {brand}</p>}
                                        <p className={`price`}>
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
                                            <i onClick={() => handleDecrement(orderData.user, productId, quantity, stock, isDeleted)}>
                                                <FaMinus className="icon" />
                                            </i>
                                        </button>
                                        <p>{quantity}</p>
                                        <button className={`${isDeleted || stock === 0 || quantity >= (stock - reservedStock) || quantity >= maxOrderQuantity ? 'disable' : ''}`}>
                                            <i onClick={() => handleIncrement(orderData.user, productId, quantity, maxOrderQuantity, stock, reservedStock, isDeleted)}>
                                                <FaPlus className="icon" />
                                            </i>
                                        </button>
                                    </div>
                                    <div className={`remove-container`}>
                                        <button onClick={() => deleteorderItem(orderData.user, productId)}>
                                            REMOVE
                                        </button>
                                    </div>
                                </div>
                            );
                        })} */}
                    </div>
                </div>
            )}
            {activeSection[1] > 3 && <button className="change-btn" onClick={handleChange}>Change</button>}
        </div>
    );
}

export default OrderSummery;