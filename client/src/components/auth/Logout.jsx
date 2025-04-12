import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartChannel } from "../../store/context/cartUpdateChannel";
import { useAuth } from "../../store/context/auth-context";
import { useCart } from "../../store/context/cart-context";
import { useWishlist } from "../../store/context/wishlist-context";

const Logout = () => {
    const hasLoggedOut = useRef(false);
    const { fetchLoggedinUserData } = useAuth();
    const { fetchCartProducts } = useCart();
    const { fetchWishlistItems } = useWishlist();
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        if (hasLoggedOut.current) return;
        hasLoggedOut.current = true;
        try {
            const response = await axios.post("http://localhost:3030/auth/logout", {}, { withCredentials: true });
            toast.success(response?.data?.message);
            await fetchLoggedinUserData();
            await fetchCartProducts();
            await fetchWishlistItems();
            cartChannel.postMessage({ type: "LOGOUT" });
            navigate("/");
        } catch (error) {
            // toast.error(error?.response?.data?.message);
        }
    }, [navigate]);

    useEffect(() => {
        logout();
    }, []);

    return null;
}

export default Logout;