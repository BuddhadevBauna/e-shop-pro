import React, { useState } from "react";
import "../../Account.css";
import "./Details.css";
import { useAuth } from "../../../../../store/context/auth-context";

const Details = () => {
    const { loginUserData } = useAuth();
    // console.log(loginUserData);
    const [email, setEmail] = useState(loginUserData?.extraUserData?.email);
    const [phone, setPhone] = useState(loginUserData?.extraUserData?.phone);
    const [isEditingEmail, setEditingEmail] = useState(false);
    const [isEditingPhone, setEditingPhone] = useState(false);

    const toggleEmailEdit = () => setEditingEmail(!isEditingEmail);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleEmailSubmit = (e) => {
        e.preventDefault();
    }

    const togglePhoneEdit = () => setEditingPhone(!isEditingPhone);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePhoneSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <section className="account-container details-container">
            <h2 className="heading">Personal Information</h2>
            <div className="details-item">
                <p className="details-label">
                    <span>Email Address</span>
                    <span>
                        <button className="toggle-btn" onClick={toggleEmailEdit}>
                            {!isEditingEmail ? "Edit" : "Cancel"}
                        </button>
                    </span>
                </p>
                <form className="details-form" onSubmit={handleEmailSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        required
                        autoComplete="off"
                        disabled={!isEditingEmail}
                        className={`details-input ${isEditingEmail ? 'active' : ''}`}
                        onChange={handleEmailChange}
                    />
                    {isEditingEmail &&
                        <button className="save-btn">Save</button>
                    }
                </form>
            </div>
            <div className="details-item">
                <p className="details-label">
                    <span>Mobile Number</span>
                    <span>
                        <button className="toggle-btn" onClick={togglePhoneEdit}>
                            {!isEditingPhone ? "Edit" : "Cancel"}
                        </button>
                    </span>
                </p>
                <form className="details-form" onSubmit={handlePhoneSubmit}>
                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        required
                        autoComplete="off"
                        disabled={!isEditingPhone}
                        className={`details-input ${isEditingPhone ? 'active' : ''}`}
                        onChange={handlePhoneChange}
                    />
                    {isEditingPhone &&
                        <button className="save-btn">Save</button>
                    }
                </form>
            </div>
        </section>
    )
}

export default Details;