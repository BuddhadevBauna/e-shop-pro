import React, { useState } from "react";
import "./Navbar.css";
import { ImAidKit } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import { FaArrowUp, FaBars, FaCartArrowDown, FaRegHeart, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import SearchContainer from "./products/search/SearchContainer";


const Navbar = () => {
    const [isSearchContainerVisible, setSearchContainerVisible] = useState(false);
    const toggleSearchContainer = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }
    const collapseNavbar = () => {
        setSearchContainerVisible(!isSearchContainerVisible);
    }
    const [isListContainerVisible, setListContainerVisible] = useState(false);
    const toggleListContainer = () => {
        setListContainerVisible(!isListContainerVisible);
    }

    let login = false;
    const handleLogin = () => { }

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
                        <NavLink className="nav-link" to="/login" onMouseOver={handleLogin}>
                            <i><FaRegUserCircle /></i>
                            <p>
                                {!login ? <span>Login</span> : <span>Account</span>}
                                <i><IoIosArrowDown /></i></p>
                        </NavLink>
                        <div className="user-section" style={{ width: login ? "10rem" : "auto" }}>
                            {!login &&
                                <Link to={'/register'}>
                                    <div className="user-registration">
                                        <p>New Customer?</p>
                                        <p className="signup">Register</p>
                                    </div>
                                </Link>
                            }
                            {!login && <hr />}
                            <div className="user">
                                <p className="profile"><i><FaRegUserCircle /></i><span>My Profile</span></p>
                                <p className="wishlist"><i><FaRegHeart /></i><span>Wishlist</span></p>
                                {login && <p className="logout"><i><IoIosLogOut /></i><span>Logout</span></p>}
                            </div>
                        </div>
                    </li>
                    <li className="list-item">
                        <NavLink className="nav-link" to="/cart">
                            <i><FaCartArrowDown /></i>
                            <p>Cart</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Navbar;