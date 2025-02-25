import React from "react";
import useForm from "../../../custom_hook/useForm";

const ForgotPassword = () => {
    const initialState = { email: "" };
    const requestMethod = "POST";
    const url = "http://localhost:3030/auth/send-link";
    const { values, handleChange, handleSubmit } = useForm(initialState, requestMethod, url);

    return (
        <section>
            <div className="auth-container">
                <div className="forgetPassword-form form-container">
                    <h1 className="main-heading">Trouble Logging In?</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                id="email"
                                autoComplete="off"
                                required
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn auth-btn btn-submit">
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;