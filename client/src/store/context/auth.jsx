import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cartChannel } from "./cartUpdateChannel";

//context api(create context, provider, consumer)
//Context create
export const AuthContext = createContext();

//provider(for data passing)
export const AuthProvider = ({ children }) => {
    const [isServerIssue, setServerIssue] = useState(true);
    const [isServerIssueLoading, setServerIssueLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginUserData, setLoginUserData] = useState("");
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
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
        } finally {
            setServerIssueLoading(false);
        }
    }
    useEffect(() => {
        checkServerStatus();
    }, []);

    const storeTokenInLocalStorage = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
        cartChannel.postMessage({ type: "LOGIN" });
    };

    const removeTokenFromLocalStorage = async () => {
        setToken(null);
        localStorage.removeItem('token');
        setLoggedIn(false);
        setLoginUserData(null);
        setIsLoadingUserData(false);
        cartChannel.postMessage({ type: "LOGOUT" });
        await fetchCartProducts();
    }

    const mergerGuestUserCartItem = useCallback(async (userId, token) => {
        if (!userId || !token) return;
        try {
            const response = await axios.get(`http://localhost:3030/cart?userId=${userId}`, {headers: {Authorization: `Bearer ${token}`}});
            let userCart = response?.data?.items || [];
            let cartMap = new Map(userCart.map((item) => [item.product._id, item.product]))
            let guestCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            let cart = [];
            guestCart.forEach((guestItem) => {
                if(!cartMap.has(guestItem.product)) cart.push(guestItem); 
            })
            if (cart.length > 0) {
                const data = { user: userId, guestCart: cart }
                const response = await axios.post('http://localhost:3030/cart/merge', data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                // console.log(response);
                if (response?.status >= 200 && response?.status <= 300) {
                    localStorage.removeItem('cart');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    const fetchCartProducts = useCallback(async (userId, token) => {
        if (!userId || !token) {
            let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            if (cart.length > 0) {
                try {
                    const productIds = cart.map(item => item.product).join(',');
                    const response = await axios.get(`http://localhost:3030/products/by-ids?ids=${productIds}`);
                    // console.log(response);
                    if (response?.status >= 200 && response?.status <= 300) {
                        const products = response.data;
                        let cartFinalMRP = 0;
                        let cartFinalDiscount = 0;
                        let cartFinalPrice = 0;
                        const cartItems = cart.map((cartItem) => {
                            const product = products.find(product => product._id.toString() === cartItem.product);
                            if (!product) return null; // Skip missing products

                            const quantity = cartItem.quantity;
                            const totalMRP = parseFloat((product.mrp * quantity).toFixed(2));
                            const totalDiscount = parseFloat((totalMRP * (product.discountPercentage / 100)).toFixed(2));
                            const totalSalePrice = parseFloat((totalMRP - totalDiscount).toFixed(2));

                            cartFinalMRP += totalMRP;
                            cartFinalDiscount += totalDiscount;
                            cartFinalPrice += totalSalePrice;
                            return { product, quantity, totalMRP, totalDiscount, totalSalePrice };
                        }).filter(item => item !== null); // Remove skipped products
                        cartFinalMRP = parseFloat(cartFinalMRP.toFixed(2));
                        cartFinalDiscount = parseFloat(cartFinalDiscount.toFixed(2));
                        cartFinalPrice = parseFloat(cartFinalPrice.toFixed(2));
                        const cartSummery = { cartItems, cartFinalMRP, cartFinalDiscount, cartFinalPrice };
                        // console.log(cartSummery)
                        setCartData({ cartSummery });
                    }
                } catch (error) {
                    setCartData(null);
                } finally {
                    setLoadingCartData(false);
                }
            } else {
                setCartData(null);
                setLoadingCartData(false);
            }
        } else {
            try {
                const response = await axios.get(`http://localhost:3030/cart?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response?.status >= 200 && response?.status <= 300) {
                    // console.log(response);
                    setCartData(response.data);
                }
            } catch (error) {
                // console.error(error);
                setCartData(null);
            } finally {
                setLoadingCartData(false);
            }
        }
    }, []);

    const fetchLoggedinUserData = useCallback(async () => {
        if (!token) {
            setLoggedIn(false);
            setLoginUserData(null);
            setIsLoadingUserData(false);
            await fetchCartProducts();
            return;
        }
        try {
            const response = await axios.get('http://localhost:3030/user', {
                headers: { "Authorization": `Bearer ${token}` }
            });
            // console.log(response);
            if (response?.status >= 200 && response?.status <= 300) {
                const userId = response?.data?.extraUserData?.id;
                setLoggedIn(true);
                setLoginUserData(response.data);
                await mergerGuestUserCartItem(userId, token);
                await fetchCartProducts(userId, token);
            }
        } catch (error) {
            // console.error(error);
            setLoggedIn(false);
            setLoginUserData(null);
        } finally {
            setIsLoadingUserData(false);
        }
    }, [token, mergerGuestUserCartItem, fetchCartProducts]);

    useEffect(() => {
        fetchLoggedinUserData();
    }, [fetchLoggedinUserData]);

    useEffect(() => {
        const handleMessage = async (event) => {
            // console.log(event);
            const message = event.data;
            if (message.type === "LOGIN") {
                setToken(localStorage.getItem("token"));
            } else if (message.type === "LOGOUT") {
                setToken(null);
                setLoggedIn(false);
                setLoginUserData(null);
                setIsLoadingUserData(false);
                await fetchCartProducts();
            }
            if (["CART_ADDED", "CART_UPDATED", "CART_DELETED"].includes(message.type)) {
                if (isLoggedIn) {
                    const userId = loginUserData?.extraUserData?.id;
                    await fetchCartProducts(userId, token);
                } else {
                    await fetchCartProducts();
                }
            }
        };
        cartChannel.addEventListener("message", handleMessage);
        return () => {
            cartChannel.removeEventListener("message", handleMessage);
        }
    }, [isLoggedIn, loginUserData, token]);

    // window.addEventListener("storage", async (event) => {
    //     if(event.key === 'cart') {
    //         await fetchCartProducts();
    //     }
    // });      

    // useEffect(() => {
    //     console.log(token);
    //     console.log(isLoggedIn, isLoadingUserData);
    //     console.log(loginUserData);
    // }, [token, isLoggedIn, isLoadingCartData, loginUserData]);

    return (
        <AuthContext.Provider
            value={{
                isServerIssueLoading,
                isServerIssue,
                token,
                storeTokenInLocalStorage,
                removeTokenFromLocalStorage,
                isLoadingUserData,
                isLoggedIn,
                loginUserData,
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
