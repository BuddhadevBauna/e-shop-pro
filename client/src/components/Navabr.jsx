import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { ImAidKit } from "react-icons/im";
import { FaCartArrowDown, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchContainer from "./products/search/SearchContainer";
import { useAuth } from "../store/context/auth";


const Navbar = () => {
    const [isUserSectionActive, setUserSectionActive] = useState(false);
    const [totalCartItem, setTotalCartItem] = useState();
    const { isLoggedIn, cartData, isLoadingCartData } = useAuth();
    // console.log(isLoggedIn);
    const location = useLocation();

    const handleMouseOver = () => {
        setUserSectionActive(true);
    }
    const handleMouseLeave = () => {
        setUserSectionActive(false);
    }

    useEffect(() => {
        if (!isLoadingCartData && cartData) {
            setTotalCartItem(cartData.cartItems.length);
        }
    }, [isLoadingCartData, cartData])

    return (
        <div className="navbar">
            <div className="navabar-container">
                <div className="main-container">
                    <h1 className="logo"><ImAidKit /></h1>
                </div>
                <div className="search-container">
                    <div className="search-box-and-submit-btn">
                        <SearchContainer />
                    </div>
                </div>
                <ul className="list-item-container">
                    <li className="list-item">
                        {!isLoggedIn ? (
                            <NavLink
                                className="nav-link"
                                to="/account/login"
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                            >
                                <i><FaRegUserCircle /></i>
                                <p>
                                    <span>Login</span>
                                    {isUserSectionActive ? <i><IoIosArrowUp /></i> : <i><IoIosArrowDown /></i>}
                                </p>
                            </NavLink>
                        ) : (
                            <NavLink
                                className="nav-link"
                                to="/account"
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                            >
                                <i><FaRegUserCircle /></i>
                                <p>
                                    <span>Account</span>
                                    {isUserSectionActive ? <i><IoIosArrowUp /></i> : <i><IoIosArrowDown /></i>}
                                </p>
                            </NavLink>
                        )}
                        {isUserSectionActive &&
                            <div
                                className="user-section"
                                style={{ width: isLoggedIn ? "10rem" : "auto" }}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                            >
                                {!isLoggedIn &&
                                    <>
                                        <Link to={'/account/register'}>
                                            <div className="user-registration">
                                                <p>New Customer?</p>
                                                <p className="signup">Register</p>
                                            </div>
                                        </Link>
                                        <hr />
                                    </>
                                }
                                <div className="user">
                                    {!isLoggedIn ?
                                        <Link to={'/account/login'}>
                                            <p className="profile"><i><FaRegUserCircle /></i><span>My Profile</span></p>
                                        </Link>
                                        :
                                        <p className="profile"><i><FaRegUserCircle /></i><span>My Profile</span></p>
                                    }
                                    {!isLoggedIn ?
                                        <Link to={'/account/login'}>
                                            <p className="wishlist"><i><FaRegHeart /></i><span>Wishlist</span></p>
                                        </Link>
                                        :
                                        <p className="wishlist"><i><FaRegHeart /></i><span>Wishlist</span></p>
                                    }
                                    {isLoggedIn &&
                                        <Link to={'/account/logout'}>
                                            <p className="logout"><i><IoIosLogOut /></i><span>Logout</span></p>
                                        </Link>
                                    }
                                </div>
                            </div>
                        }
                    </li>
                    {location.pathname !== "/viewcart" && (
                        <li className="list-item">
                            <NavLink className="nav-link" to="/viewcart">
                                <i>
                                    <FaCartArrowDown />
                                    {totalCartItem > 0 && <span>{totalCartItem}</span>}
                                </i>
                                <p>Cart</p>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default Navbar;