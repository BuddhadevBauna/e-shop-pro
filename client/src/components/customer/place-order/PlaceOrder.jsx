import React, { useEffect, useState } from "react";
import "./PlaceOrder.css";
import "../../customer/common.css";
import User from "./user/User";
import DeliveryAddress from "./delivery-address/DeliveryAddress";
import OrderSummery from "./order-summery/OrderSummery";
import { useAuth } from "../../../store/context/auth-context";
import { useorder } from "../../../store/context/order-context";

const PlaceOrder = () => {
    const { isLoadingUserData, loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const { getRecentorder, order } = useorder();
    const [activeSection, setActiveSection] = useState(["deliveryAddress", 2]);

    useEffect(() => {
        const getData = async () => {
            if (!isLoadingUserData && userId) {
                await getRecentorder(userId);
            }
        }
        getData();
    }, [isLoadingUserData, userId]);

    if(isLoadingUserData) return <p>Loading...</p>;
    return (
        <section className="placeorder-container">
            <div className="order-process-container">
                <User
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
                <DeliveryAddress 
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
                <OrderSummery 
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            </div>
            <div className="price-details-container">
                <div className="price-details">
                    {order?.products && (
                        <>
                            <h4>PRICE DETAILS</h4>
                            <hr style={{ borderTopStyle: "solid" }} />
                            <div>
                                <p>
                                    <span>Price ({order.products?.length} item)</span>
                                    <span>₹{order?.orderFinalMRP}</span>
                                </p>
                                <p>
                                    <span>Discount</span>
                                    <span className="discount">-₹{order?.orderFinalDiscount}</span>
                                </p>
                                <p>
                                    <span>Delivery Charges</span>
                                    <span className="delivery-charge">Free</span>
                                </p>
                                <hr />
                                <p className="total">
                                    <span>Total Amount</span>
                                    <span>₹{order?.orderFinalPrice}</span>
                                </p>
                                <hr />
                                <p className="saving">You will save ₹{order?.orderFinalDiscount} on this order</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default PlaceOrder;