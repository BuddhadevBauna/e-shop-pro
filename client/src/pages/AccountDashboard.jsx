import React from "react";
import "./AccountDashboard.css";
import AccountSidebar from "../components/customer/account/AcountSidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../store/context/auth-context";

const AccountDashboard = () => {
    const {isLoadingUserData, loginUserData} = useAuth();
    if(isLoadingUserData || !loginUserData) return <p>Loading...</p>;
    return (
        <section className="information-container">
            <AccountSidebar />
            <Outlet />
        </section>
    );
}

export default AccountDashboard;