import { useEffect, useMemo } from "react";
import "./Cart.css";
import { useAuth } from "../../../store/context/auth";
import { Link } from "react-router-dom";
import CartDetails from "./cart_details/CartDetails";

const Cart = () => {
    const { isLoggedIn, cartData, isLoadingCartData } = useAuth();
    // console.log(isLoggedIn, isLoadingCartData);

    const content = useMemo(() => {
        if (!isLoggedIn) {
            if (isLoadingCartData) {
                return (
                    <div className='loading'>
                        <p>Loading</p>
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                );
            }
            // console.log(cartData);
            if (!cartData || !cartData.items || cartData.items.length === 0) {
                return (
                    <div className="cart-section login-to-view">
                        <p>Missing Cart items?</p>
                        <small>Login to see the items you added previously.</small>
                        <Link to={"/account/login"}>
                            <button>Login</button>
                        </Link>
                    </div>
                );
            } else {
                return <CartDetails />;
            }
        } else {
            if (isLoadingCartData) {
                return (
                    <div className='loading'>
                        <p>Loading</p>
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                );
            }
            // console.log(cartData);
            if (!cartData || !cartData.items || cartData.items.length === 0) {
                return (
                    <div className="cart-section empty-cart">
                        <p>Your cart is empty!</p>
                        <small>Add products to it now.</small>
                        <Link to={"/"}>
                            <button>Shop Now</button>
                        </Link>
                    </div>
                );
            } else {
                return <CartDetails />;
            }
        }
    }, [isLoggedIn, isLoadingCartData, cartData]);

    return content;
};

export default Cart;