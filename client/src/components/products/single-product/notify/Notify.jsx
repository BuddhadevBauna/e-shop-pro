import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { useAuth } from "../../../../store/context/auth-context";
import { toast } from "react-toastify";

const Notify = ({ productId, isDeleted, stock }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    let type = "Product";
    let typeId = productId;
    let reason = "";
    if(isDeleted) reason = "product is unavailable";
    else if(stock === 0) reason = "product is out of stock";

    const checkSubscription = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3030/notifications/subscribe/check?userId=${userId}&type=${type}&typeId=${typeId}&reason=${reason}`, {
                withCredentials: true
            });
            setIsSubscribed(response?.data?.isSubscribed);
        } catch (error) {
            // console.log(error);
        }
    }, [userId, productId, type]);

    useEffect(() => {
        checkSubscription();
    }, [])

    const handleSubscribe = useCallback(async () => {
        const data = { type, typeId, reason }
        try {
            const response = await axios.patch(`http://localhost:3030/notifications/subscribe/${userId}`, data, {
                withCredentials: true 
            });
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                checkSubscription();
            }
        } catch (error) {
            // console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }, [productId, userId, type]);

    const handleUnsubscribe = useCallback(async () => {
        const data = { type, typeId, reason }
        try {
            const response = await axios.patch(`http://localhost:3030/notifications/unsubscribe/${userId}`, data, {
                withCredentials: true
            });
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                checkSubscription();
            }
        } catch (error) {
            // console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }, [productId, userId, type]);

    return (
        <button className={`btn notify-btn`} onClick={() => !isSubscribed ? handleSubscribe() : handleUnsubscribe()}>
            <i><MdNotificationsActive /></i>
            <span>
                {isSubscribed ? "Subscribed! You'll Be Notified" : "Notify Me"}
            </span>
        </button>
    )
}

export default Notify;