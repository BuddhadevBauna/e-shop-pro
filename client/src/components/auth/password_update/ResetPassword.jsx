import React from "react";
import authForm from "../form_controll/authForm";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const params = useParams();
    const initialState = { password: "" };
    const requestMethod = "POST";
    const token = params.token;
    const url = `http://localhost:3030/auth/reset-password/${token}`;
    const formType = "resetPassword";
    const { values, handleChange, handleSubmit } = authForm(initialState, requestMethod, url, formType);

    return (
        <section>
            <div className="auth-container">
                <div className="resetPassword-form form-container">s
                    <h1 className="main-heading">Reset Passoword</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter your new password..."
                                id="password"
                                autoComplete="off"
                                required
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn auth-btn btn-submit">
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword;