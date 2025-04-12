import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { cartChannel } from "./cartUpdateChannel";
import axios from "axios";

// Cart Context Creation
export const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
    const { isLoadingUserData, isLoggedIn, loginUserData } = useAuth();
    const [cartData, setCartData] = useState(null);
    const [isLoadingCartData, setLoadingCartData] = useState(true);

    const fetchCartProducts = useCallback(async (userId) => {
        if (!userId) {
            let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            if (cart.length > 0) {
                try {
                    const productIds = cart.map(item => item.product).join(',');
                    const response = await axios.get(`http://localhost:3030/products/by-ids?ids=${productIds}`);
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

                            if (!product.isDeleted && product.stock > 0) {
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
                const response = await axios.get(`http://localhost:3030/cart?userId=${userId}`, { withCredentials: true });
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

    const mergerGuestUserCartItem = useCallback(async (userId) => {
        if (!userId) return;
        try {
            let guestCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            // console.log(guestCart);
            if (guestCart.length > 0) {
                const data = { user: userId, guestCart };
                const response = await axios.post('http://localhost:3030/cart/merge', data, { withCredentials: true });
                // console.log(response);
                if (response?.status >= 200 && response?.status <= 300) {
                    localStorage.removeItem('cart');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoadingUserData) {
                if (isLoggedIn) {
                    const userId = loginUserData?.extraUserData?.id;

                    const cartMergeSuccess = localStorage.getItem("mergedSuccess");
                    const mergInProcess = localStorage.getItem("merging");
                    if (!cartMergeSuccess && !mergInProcess) {
                        localStorage.setItem('merging', true);
                        await mergerGuestUserCartItem(userId);
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
                        await fetchCartProducts(userId);
                    }
                } else {
                    await fetchCartProducts();
                }
            }
        };
        fetchData();
    }, [isLoadingUserData, isLoggedIn, loginUserData, fetchCartProducts, mergerGuestUserCartItem]);

    useEffect(() => {
        const handleMessage = async (event) => {
            // console.log(event);
            const message = event.data;
            if (["CART_ADDED", "CART_UPDATED", "CART_DELETED"].includes(message.type)) {
                if (isLoggedIn && loginUserData) {
                    await fetchCartProducts(loginUserData?.extraUserData?.id);
                } else {
                    await fetchCartProducts();
                }
            }
        };
        cartChannel.addEventListener("message", handleMessage);
        return () => {
            cartChannel.removeEventListener("message", handleMessage);
        }
    }, [isLoggedIn, loginUserData]);

    return (
        <CartContext.Provider
            value={{
                cartData,
                isLoadingCartData,
                fetchCartProducts
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook to use CartContext
export const useCart = () => {
    const cartContextValue = useContext(CartContext);
    if (!cartContextValue) {
        console.log("useCart used outside of the CartProvider.");
    }
    return cartContextValue;
};