import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { ImAidKit } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import { FaArrowUp, FaBars, FaCartArrowDown, FaRegHeart, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import SearchContainer from "./products/search/SearchContainer";
import { useAuth } from "../store/context/auth";


const Navbar = () => {
    const [isSearchContainerVisible, setSearchContainerVisible] = useState(false);
    const [isListContainerVisible, setListContainerVisible] = useState(false);
    const [isUserSectionActive, setUserSectionActive] = useState(false);
    const [totalCartItem, setTotalCartItem] = useState();
    const { isLoggedIn, cartData, isLoadingCartData } = useAuth();
    // console.log(isLoggedIn);

    const toggleSearchContainer = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }
    const collapseNavbar = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }
    const toggleListContainer = () => {
        setListContainerVisible(!isListContainerVisible);
    }

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
            <div className={`navabar-container ${isSearchContainerVisible ? "navbar-container-sm" : ""}`}>
                <div className="main-container">
                    <div className="sidebar-container">
                        <i className="sidebar-icon-sm" onClick={toggleListContainer}>
                            <FaBars />
                        </i>
                        <h1 className="logo">
                            <ImAidKit />
                        </h1>
                    </div>
                    <div className="search-and-account-sm">
                        <button className="search-btn" onClick={toggleSearchContainer}>
                            <i className="search-icon">
                                <FaSearch />
                            </i>
                        </button>
                        <NavLink className="nav-link" to="/login">
                            <i><MdAccountCircle /></i>
                            <p>Account</p>
                        </NavLink>
                    </div>
                </div>
                <div className={`search-container ${isSearchContainerVisible ? "search-active" : ""}`}>
                    <div className="search-box-and-submit-btn">
                        <SearchContainer />
                    </div>
                    <i className="collapse-icon-sm" onClick={collapseNavbar}>
                        <FaArrowUp />
                    </i>
                </div>
                <ul
                    className={`list-item-container ${isSearchContainerVisible ? "list-item-container-sm" : ""} 
                    ${isListContainerVisible ? "list-active" : ""}`}
                >
                    <li className="list-item">
                        {!isLoggedIn ? (
                            <NavLink
                                className="nav-link"
                                to="/login"
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
                                        <Link to={'/register'}>
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
                                        <Link to={'/login'}>
                                            <p className="profile"><i><FaRegUserCircle /></i><span>My Profile</span></p>
                                        </Link>
                                        :
                                        <p className="profile"><i><FaRegUserCircle /></i><span>My Profile</span></p>
                                    }
                                    {!isLoggedIn ?
                                        <Link to={'/login'}>
                                            <p className="wishlist"><i><FaRegHeart /></i><span>Wishlist</span></p>
                                        </Link>
                                        :
                                        <p className="wishlist"><i><FaRegHeart /></i><span>Wishlist</span></p>
                                    }
                                    {isLoggedIn &&
                                        <Link to={'/logout'}>
                                            <p className="logout"><i><IoIosLogOut /></i><span>Logout</span></p>
                                        </Link>
                                    }
                                </div>
                            </div>
                        }
                    </li>
                    <li className="list-item">
                        <NavLink className="nav-link" to="/cart">
                            <i>
                                <FaCartArrowDown />
                                {totalCartItem > 0 && <span>{totalCartItem}</span>}
                            </i>
                            <p>Cart</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Navbar;