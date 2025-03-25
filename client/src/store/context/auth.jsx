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
        localStorage.removeItem("cartMergeAlreadyCall");
        localStorage.removeItem('mergedSuccess')
        setLoggedIn(false);
        setLoginUserData(null);
        setIsLoadingUserData(false);
        cartChannel.postMessage({ type: "LOGOUT" });
        await fetchCartProducts();
    }

    const mergerGuestUserCartItem = useCallback(async (userId, token) => {
        if (!userId || !token) return;
        // localStorage.setItem("cartMergeAlreadyCall", true);
        try {
            let guestCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            // console.log(guestCart);
            if (guestCart.length > 0) {
                const response = await axios.get(`http://localhost:3030/cart?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } });

                let userCart = response?.data?.items || [];
                let cartMap = new Map(userCart.map((item) => [item.product._id, item.product]));

                let cart = [];
                guestCart.forEach((guestItem) => {
                    if (!cartMap.has(guestItem.product)) cart.push(guestItem);
                })
                // console.log(cart);

                if (cart.length > 0) {
                    const data = { user: userId, guestCart: cart }
                    const response = await axios.post('http://localhost:3030/cart/merge', data, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // console.log(response);
                    if (response?.status >= 200 && response?.status <= 300) {
                        localStorage.removeItem('cart');
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

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
                        const items = cart.map((cartItem) => {
                            const product = products.find(product => product._id.toString() === cartItem.product);
                            if (!product) return null; // Skip missing products

                            const quantity = cartItem.quantity;
                            const totalMRP = product.mrp * quantity;
                            const totalDiscount = Math.round(totalMRP * (product.discountPercentage / 100));
                            const totalSalePrice = totalMRP - totalDiscount;
                            
                            if (!product.isDeleted) {
                                cartFinalMRP += totalMRP;
                                cartFinalDiscount += totalDiscount;
                                cartFinalPrice += totalSalePrice;
                            }
                            return { product, quantity, totalMRP, totalDiscount, totalSalePrice };
                        }).filter(item => item !== null); // Remove skipped products
                        setCartData({ items, cartFinalMRP, cartFinalDiscount, cartFinalPrice });
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
                    // console.log(response.data);
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

                const cartMergeAlreadyCall = localStorage.getItem("cartMergeAlreadyCall");
                const merging = localStorage.getItem("merging");
                if (!cartMergeAlreadyCall && !merging) {
                    localStorage.setItem('merging', true);
                    await mergerGuestUserCartItem(userId, token);
                    localStorage.setItem("cartMergeAlreadyCall", true);
                    localStorage.setItem('mergedSuccess', true);
                    localStorage.removeItem('merging');
                }

                if (localStorage.getItem('merging')) {
                    await new Promise(resolve => {
                        const checkMergedStatus = () => {
                            if (localStorage.getItem('mergedSuccess')) {
                                resolve();
                                window.removeEventListener('storage', checkMergedStatus);
                            }
                        }
                        window.addEventListener('storage', checkMergedStatus);
                    })
                }

                if (localStorage.getItem('mergedSuccess')) {
                    await fetchCartProducts(userId, token);
                }
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

    // useEffect(() => {
    //     console.log(isLoadingCartData);
    //     console.log(cartData);
    // }, [isLoadingCartData, cartData]);

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
