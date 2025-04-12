import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./auth-context";
import { useCart } from "./cart-context";
import { cartChannel } from "./cartUpdateChannel";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { setLoggedIn, setLoginUserData, setIsLoadingUserData, isLoggedIn, loginUserData, fetchLoggedinUserData } = useAuth();
    const { fetchCartProducts } = useCart();
    const [wishListProduct, setWishListProduct] = useState([]);
    const [isLoadingWishlistProduct, setLoadingWishlistProduct] = useState(true);

    const fetchWishlistItems = async (userId) => {
        if (!userId) {
            setWishListProduct([]);
            setLoadingWishlistProduct(false);
        }
        try {
            const response = await axios.get(`http://localhost:3030/wishlists/all?user=${userId}`, { withCredentials: true });
            const productIds = response?.data?.wishlists.map((item) => item.product);
            setWishListProduct(productIds);
        } catch (error) {
            // console.error("Error fetching wishlist:", error);
        } finally {
            setLoadingWishlistProduct(false);
        }
    };

    const removeItemFromWishlist = async (userId, productId, setIsWishlisted) => {
        try {
            const response = await axios.delete("http://localhost:3030/wishlists/delete", {
                data: { user: userId, product: productId },
                withCredentials: true
            });
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                setIsWishlisted(false);
                cartChannel.postMessage({ type: 'WISHLIST_DELETED' });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        const handleMessage = async (event) => {
            // console.log(event);
            const message = event.data;
            if (message.type === "LOGIN") {
                await fetchLoggedinUserData();
                if(isLoggedIn && loginUserData) {
                    await fetchWishlistItems(loginUserData?.extraUserData?.id);
                }
            }
            if (message.type === "LOGOUT") {
                setLoggedIn(false);
                setLoginUserData(null);
                setIsLoadingUserData(false);
                localStorage.removeItem('mergedSuccess');
                await fetchCartProducts();
                await fetchWishlistItems();
            }
            if (['WISHLIST_ADDED', 'WISHLIST_DELETED'].includes(message.type)) {
                if(isLoggedIn && loginUserData) {
                    await fetchWishlistItems(loginUserData?.extraUserData?.id);
                }
            }
        };
        cartChannel.addEventListener("message", handleMessage);
        return () => {
            cartChannel.removeEventListener("message", handleMessage);
        }
    }, [isLoggedIn, loginUserData]);

    return (
        <WishlistContext.Provider value={{ fetchWishlistItems, isLoadingWishlistProduct, wishListProduct, removeItemFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
};

export const useWishlist = () => useContext(WishlistContext);