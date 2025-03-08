import React from "react";
import authForm from "./form_controll/authForm";
import "./Auth.css";
import { Link } from "react-router-dom";

const Login = () => {
    const initialState = { email: "", password: "" };
    const requestMethod = "POST";
    const url = "http://localhost:3030/auth/login";
    const formType = "login"
    const { values, handleChange, handleSubmit } = authForm(initialState, requestMethod, url, formType);

    return (
        <section>
            <div className="auth-container">
                <div className="login-form form-container">
                    <h1 className="main-heading">Login</h1>
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
                        <div>
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                placeholder="Enter your password..."
                                id="password"
                                autoComplete="off"
                                required
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Link to={'/account/password/forgot'}>Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn auth-btn btn-submit">
                            Login Now
                        </button>
                    </form>
                    <div className="separate">
                        <hr />
                        <small>or</small>
                        <hr />
                    </div>
                    <div className="alternate">
                        <span>New Customer?</span>
                        <Link to={'/register'}>
                            <span>Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;