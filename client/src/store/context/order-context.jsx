import { createContext, useContext, useState } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, setorder] = useState([]);

    const getRecentorder = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3030/orders/recent/${userId}`, { withCredentials: true });
            // console.log(response?.data?.order);
            if (response.status >= 200 && response.status <= 300) {
                setorder(response?.data?.order);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <OrderContext.Provider value={{ getRecentorder, order }}>
            {children}
        </OrderContext.Provider>
    )
};

export const useorder = () => useContext(OrderContext);