import React, { useState } from "react";
import "./Navbar.css";
import { ImAidKit } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import {
    FaArrowUp,
    FaBars,
    FaCartArrowDown,
    FaSearch,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
                        <NavLink className="nav-link" to="/login">
                            <i><MdAccountCircle /></i>
                            <p>Account</p>
                        </NavLink>
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