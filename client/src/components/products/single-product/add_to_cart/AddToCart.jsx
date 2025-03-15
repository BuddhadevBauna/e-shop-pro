import React from "react";
import { useAuth } from "../../../../store/context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { cartChannel } from "../../../../store/context/cartUpdateChannel";

const AddToCart = ({ productId }) => {
    const { isLoadingUserData, isLoggedIn, loginUserData, token, fetchCartProducts } = useAuth();

    const addProductInCart = async () => {
        try {
            if (!isLoadingUserData) {
                if (!isLoggedIn) {
                    const cartData = {
                        product: productId,
                        quantity: 1
                    }
                    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
                    const existingItem = cart.find(item => item.product === cartData.product);
                    if (!existingItem) {
                        cart.push(cartData);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        cartChannel.postMessage({type: 'CART_ADDED'});
                        await fetchCartProducts();
                        toast.success("Product added to cart.");
                    } else {
                        toast.error("Product already exists in cart");
                    }
                } else {
                    const userId = loginUserData?.extraUserData?.id;
                    const cartData = {
                        user: userId,
                        product: productId,
                        quantity: 1
                    };
                    const response = await axios.post('http://localhost:3030/cart/add', cartData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // console.log(response);
                    if (response.status >= 200 && response.status <= 300) {
                        cartChannel.postMessage({type: 'CART_ADDED'});
                        await fetchCartProducts(userId, token);
                        toast.success(response?.data?.message);
                        navigate('/cart');
                    }
                }
            }
        } catch (error) {
            // console.error(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <button className={`btn`} onClick={addProductInCart}>Add To Cart</button>
    )
}

export default AddToCart;