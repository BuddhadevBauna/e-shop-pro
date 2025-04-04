import React from "react";
import "./AccountDashboard.css";
import AccountSidebar from "../components/customer/account/AcountSidebar";
import { Outlet } from "react-router-dom";

const AccountDashboard = () => {
    return (
        <section className="information-container">
            <AccountSidebar />
            <Outlet />
        </section>
    );
}

export default AccountDashboard;