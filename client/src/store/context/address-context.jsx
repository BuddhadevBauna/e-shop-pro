import { createContext, useContext, useState } from "react";
import { AuthContext, useAuth } from "./auth-context";
import axios from "axios";

const AddressContext = createContext();

export const AddressProvider = ({children}) => {
    const {token, loginUserData} = useAuth();
    const [addresses, setAddresses] = useState([]);

    const getAddress = async () => {
        const userId = loginUserData?.extraUserData?.id;
        try {
            const response = await axios.get(`http://localhost:3030/addresses/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response?.data?.addresses);
            if (response.status >= 200 && response.status <= 300) {
                setAddresses(response?.data?.addresses);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AddressContext.Provider value={{getAddress, addresses}}>
            {children}
        </AddressContext.Provider>
    )
};

export const useAddress = () => useContext(AddressContext);