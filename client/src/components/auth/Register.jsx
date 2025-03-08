import React from "react";
import "./Auth.css";
import authForm from "./form_controll/authForm";
import { Link } from "react-router-dom";

const Register = () => {
    const initialState = { name: "", email: "", phone: "", password: "" };
    const requestMethod = "POST";
    const url = "http://localhost:3030/auth/register";
    const formType = "register"
    const { values, handleChange, handleSubmit } = authForm(initialState, requestMethod, url, formType);
    return (
        <section>
            <div className="auth-container">
                <div className="registration-form form-container">
                    <h1 className="main-heading">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input
                                type="text"
                                placeholder="Enter your username..."
                                id="username"
                                autoComplete="off"
                                required
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </div>
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
                            <label htmlFor="phone">phone</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Enter your phone number..."
                                autoComplete="off"
                                required
                                name="phone"
                                value={values.phone}
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
                        <button type="submit" className="btn auth-btn btn-submit">
                            Register Now
                        </button>
                    </form>
                    <div className="separate">
                        <hr />
                        <small>or</small>
                        <hr />
                    </div>
                    <div className="alternate">
                        <span>Existing User?</span>
                        <Link to={'/account/login'}>
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;