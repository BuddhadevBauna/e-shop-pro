import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

//context api(create context, provider, consumer)
//Context create
export const AuthContext = createContext();

//provider(for data passing)
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setLoggedIn] = useState(!!token);
    const AuthorizationToken = `Bearer ${token}`;
    const [loginUserData, setLoginUserData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isServerIssue, setServerIssue] = useState(null);
    const [cartData, setCartData] = useState(null);
    const [isLoadingCartData, setLoadingCartData] = useState(true);

    //for store token in local storage
    const storeTokenInLS = (token) => {
        setToken(token);
        setLoggedIn(true);
        localStorage.setItem("token", token);
    };

    //for user logout
    const logoutUser = () => {
        setToken("");
        setLoggedIn(false);
        localStorage.removeItem("token");
    };

    //for check server status
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

    //for get currently login user data
    const userAuthentication = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/auth/user`, {
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            // console.log(response);
            if (response.statusText === "OK") {
                const data = response.data;
                setLoginUserData(data.userData);
                // setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching userdata", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            userAuthentication();
        } else {
            setLoginUserData("");
            setIsLoading(false);
        }
    }, [token]);

    const fetchCartProducts = useCallback(async () => {
        setLoadingCartData(true);
        try {
            const response = await axios.get(`http://localhost:3030/cart?useremail=${loginUserData.email}`, {
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            // console.log(response.data);
            setCartData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCartData(false);
        }
    }, [loginUserData.email, AuthorizationToken]);
    useEffect(() => {
        fetchCartProducts();
    }, [fetchCartProducts]);

    return (
        <AuthContext.Provider
            value={{
                storeTokenInLS,
                isLoggedIn,
                logoutUser,
                AuthorizationToken,
                loginUserData,
                isLoading,
                isServerIssue,
                cartData,
                isLoadingCartData,
                fetchCartProducts
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
