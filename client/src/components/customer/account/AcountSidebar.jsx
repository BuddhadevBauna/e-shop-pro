import React from "react";
import "./AccountSidebar.css";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingBag, FaUser, FaHome, FaClipboardList, FaBell, FaHeart } from "react-icons/fa";
import { useAuth } from "../../../store/context/auth-context";
import { MdLogout } from "react-icons/md";

const AccountSidebar = () => {
    const { loginUserData } = useAuth();
    const name = loginUserData?.extraUserData?.name?.split(" ")[0];
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const endRoute = pathSegments[pathSegments.length - 1];
    // console.log(endRoute);

    return (
        <div className="information-sidebar-container">
            <div className="greeting">Hello {name} 👋</div>
            <div className="information-content">
                <div className="order-section">
                    <Link to={'orders'} className={`sidebar-link`}>
                        <span>
                            <i><FaShoppingBag className="icon" /></i>
                        </span>
                        <span>My Orders</span>
                    </Link>
                </div>
                <hr />
                <div className="setting-section">
                    <h2>
                        <span>
                            <i><FaUser className="icon" /></i>
                        </span>
                        <span>Account Settings</span>
                    </h2>
                    <Link to={''} className={`sidebar-link ${endRoute === "account" ? "active" : ""}`}>Profile Information</Link>
                    <Link to={'addresses'} className={`sidebar-link ${endRoute === "addresses" ? "active" : ""}`}>Manage Address</Link>
                </div>
                <hr />
                <div className="activities-section">
                    <h2>
                        <span>
                            <i><FaClipboardList className="icon" /></i>
                        </span>
                        <span>My Activities</span>
                    </h2>
                    <Link to={'rating-and-reviews'} className={`sidebar-link ${endRoute === "reviews" ? "active" : ""}`}>My Rating and Reviews</Link>
                    <Link to={'notifications'} className={`sidebar-link ${endRoute === "notifications" ? "active" : ""}`}>All Notification</Link>
                    <Link to={'wishlist'} className={`sidebar-link ${endRoute === "wishlist" ? "active" : ""}`}>My Wishlist</Link>
                </div>
                <hr />
                <div className="logout-section">
                    <Link to={'/account/logout'}>
                        <i><MdLogout /></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AccountSidebar;