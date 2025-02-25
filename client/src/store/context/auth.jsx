import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

//context api(create context, provider, consumer)
//Context create
export const AuthContext = createContext();

//provider(for data passing)
export const AuthProvider = ({ children }) => {
    const [isServerIssue, setServerIssue] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginUserData, setLoginUserData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [cartData, setCartData] = useState(null);
    const [isLoadingCartData, setLoadingCartData] = useState(true);

    const checkServerStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3030/status');
            // console.log(response);
            if (response.status !== 200) {
                setServerIssue(true);
            } else {
                setServerIssue(false);
            }
        } catch (error) {
            setServerIssue(true);
        }
    }
    useEffect(() => {
        checkServerStatus();
    }, []);

    const storeTokenInLocalStorage = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const removeTokenFromLocalStorage = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const fetchLoggedinUserData = async () => {
        try {
            const url = 'http://localhost:3030/user';
            const response = await axios.get(url, {headers: {"Authorization": `Bearer ${token}`}});
            // console.log(response);
            if(response?.status >= 200 && response?.status <= 300) {
                setLoggedIn(true);
                setLoginUserData(response.data);
            }
        } catch (error) {
            // console.error(error);
            setLoggedIn(false);
            setLoginUserData(null);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if(token) fetchLoggedinUserData();
        else {
            setLoggedIn(false);
            setLoginUserData(null);
            setIsLoading(false);
        }
    }, [token])

    const fetchCartProducts = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3030/cart?useremail=${loginUserData.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setCartData(response.data);
        } catch (error) {
            // console.error(error);
        } finally {
            setLoadingCartData(false);
        }
    }, [loginUserData?.email, token]);
    useEffect(() => {
        fetchCartProducts();
    }, [fetchCartProducts]);

    return (
        <AuthContext.Provider
            value={{
                isServerIssue,
                token,
                storeTokenInLocalStorage,
                removeTokenFromLocalStorage,
                isLoading,
                isLoggedIn,
                loginUserData,
                cartData,
                isLoadingCartData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

//custom hook
export const useAuth = () => {
    //Usecontext use for consumer
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        console.log("useauth used outside of the provider.");
    }
    return authContextValue;
};
