import React, { useCallback, useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../store/context/auth-context";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../../store/context/wishlist-context";
import { useNavigate } from "react-router-dom";
import { cartChannel } from "../../../store/context/cartUpdateChannel";

const WishList = ({ productId }) => {
    const { fetchWishlistItems, isLoadingWishlistProduct, wishListProduct, removeItemFromWishlist } = useWishlist();
    // console.log(isLoadingWishlistProduct, wishListProduct);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { isLoadingUserData, loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoadingUserData && userId) {
                await fetchWishlistItems(userId);
            }
        }
        fetchData();
    }, [userId, isLoadingUserData]);

    useEffect(() => {
        if (!isLoadingWishlistProduct && wishListProduct && productId) {
            setIsWishlisted(wishListProduct.includes(productId));
        }
    }, [isLoadingWishlistProduct, wishListProduct, productId])

    const toggleWishList = useCallback(async () => {
        if (userId && productId) {
            if (isWishlisted) {
                await removeItemFromWishlist(userId, productId, setIsWishlisted);
            } else {
                try {
                    const data = { user: userId, product: productId };
                    const response = await axios.post("http://localhost:3030/wishlists/add", data, { withCredentials: true });
                    if (response.status >= 200 && response.status <= 300) {
                        toast.success(response?.data?.message);
                        setIsWishlisted(true);
                        cartChannel.postMessage({ type: 'WISHLIST_ADDED' });
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.message);
                }
            }
        } else {
            navigate("/account/login");
        }
    }, [userId, productId, isWishlisted, removeItemFromWishlist]);

    if (isLoadingUserData && !userId && isLoadingWishlistProduct) return null;
    return (
        <i className="favourite" onClick={toggleWishList}>
            {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
        </i>
    );
}

export default WishList;