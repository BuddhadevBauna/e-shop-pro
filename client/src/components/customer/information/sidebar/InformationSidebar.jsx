import React from "react";
import "./InformationSidebar.css";
import { Link } from "react-router-dom";

const InformationSidebar = () => {
    const name = "Buddhadev";

    return (
        <div className="information-sidebar-container">
            <div className="greeting">Hello {name} 👋</div>
            <div className="">
                <div className="order-section">
                    <Link to={'orders'} className="sidebar-link"></Link>My Orders</div>
                <div className="setting-section">
                    <h2>Account Settings</h2>
                    <Link to={'profile'} className="sidebar-link">Profile Information</Link>
                    <Link to={'address'} className="sidebar-link">Manage Address</Link>
                </div>
                <div className="activities-section">
                    <h2>My Activities</h2>
                    <Link to={'reviews'} className="sidebar-link">My Rating and Reviews</Link>
                    <Link to={'/wishlist'} className="sidebar-link">My Wishlist</Link>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default InformationSidebar;