import { createContext, useContext, useState } from "react";
import axios from "axios";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]);

    const getRecentAddress = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3030/addresses/recent/${userId}`, { withCredentials: true });
            // console.log(response?.data?.addresses);
            if (response.status >= 200 && response.status <= 300) {
                setAddresses(response?.data?.addresses);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getAddress = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3030/addresses/${userId}`, { withCredentials: true });
            // console.log(response?.data?.addresses);
            if (response.status >= 200 && response.status <= 300) {
                setAddresses(response?.data?.addresses);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <AddressContext.Provider value={{ getAddress, getRecentAddress, addresses }}>
            {children}
        </AddressContext.Provider>
    )
};

export const useAddress = () => useContext(AddressContext);