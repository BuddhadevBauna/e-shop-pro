import axios from "axios";
import "./Verify.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/context/auth";
import { toast } from "react-toastify";

const Verify = () => {
    const location = useLocation();
    const { email, phone } = location.state;
    // console.log(email, phone);
    const [isVisible, setVisible] = useState(false);
    // console.log(isVisible);
    const [showResend, setShowResend] = useState(false);
    const [input, setInput] = useState("");
    // console.log(input);
    const { storeTokenInLocalStorage } = useAuth();
    const navigate = useNavigate();

    const sendCode = async (type) => {
        try {
            const response = await axios.post('http://localhost:3030/auth/send-code', { 'email': email });
            // console.log(response);
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                setVisible(true);
                if(type === "send") {
                    setTimeout(() => setShowResend(true), 30000);
                } else {
                    setShowResend(false);
                    setTimeout(() => setShowResend(true), 70000);
                }
            }
        } catch (error) {
            // console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const verify = async () => {
        if(input === "") {
            toast.error("Please fill the otp");
            return;
        } else if (!/^\d+$/.test(input)) {
            toast.error("Please enter a valid numeric OTP");
            return;
        }
        try {
            const otp = Number(input);
            const response = await axios.post('http://localhost:3030/auth/verify-email',
                { "email": email, "verificationCode": otp }
            );
            // console.log(response);
            if (response.status >= 200 && response.status <= 300) {
                storeTokenInLocalStorage(response?.data?.jwtToken);
                toast.success(response?.data?.message);
                navigate('/');
            }
        } catch (error) {
            // console.error(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <section className="verify-container">
            <h2>Verify Your Identity</h2>
            <div className="verify-box">
                <p>
                    <span>Verify Method : </span>
                    <span className="bold">Email</span>
                </p>
                {!isVisible ? (
                    <p>
                        <span>Send a verification code to </span>
                        <span className="bold">{email.charAt(0)}...{email.substring(email.indexOf('@') - 1)}</span>
                    </p>
                ) : (
                    <p>
                        <span>A verification code has been sent to </span>
                        <span className="bold">{email.charAt(0)}...{email.substring(email.indexOf('@') - 1)}</span>
                        <span>. Enter the code to continue.</span>
                    </p>
                )}
                <div className="verify-actions">
                    {!isVisible ? (
                        <button className="send-btn" onClick={() => sendCode("send")}>Send Code</button>
                    ) : (
                        <>
                            {showResend &&
                                <button className="resend-btn" onClick={() => sendCode("resend")}>Resend Code</button>
                            }
                            <div>
                                <input type="text" className="otp-input" id="otp" required value={input} onChange={handleChange}></input>
                                <button className="verify-btn" onClick={verify}>Verify</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Verify;