import React from "react";
import "./User.css";
import { useAuth } from "../../../../store/context/auth-context";
import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";

const User = ({ activeSection, setActiveSection }) => {
    const { loginUserData } = useAuth();
    const phone = loginUserData?.extraUserData?.phone;

    const continueCheckout = () => {
        setActiveSection(["deliveryAddress", 2]);
    }

    const handleChange = () => {
        setActiveSection(["user", 1]);
    }

    return (
        <div className={`placeorder-item user-container ${!activeSection.includes("user") ? "not-active" : ""}`}>
            <h2>
                <span>1</span>
                <span>Login</span>
                {activeSection[1] > 1 && <i><FiCheck /></i>}
            </h2>
            <p className="phone-number">Phone: {phone}</p>
            {activeSection.includes("user") && (
                <>
                    <Link className="logout" to={'/account/logout'}>Logout & sign in to another account</Link>
                    <button className="continue-checkout-btn" onClick={continueCheckout}>Continue Checkout</button>
                </>
            )}
            {activeSection[1] > 1 && <button className="change-btn" onClick={handleChange}>Change</button>}
        </div>
    );
}

export default User;