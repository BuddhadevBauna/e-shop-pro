import "./Auth.css";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/context/auth";


const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    // console.log(storeTokenInLS);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);

        try {
            const response = await axios.post(`http://localhost:3030/auth/login`, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // console.log(response);
            if(response.statusText === 'OK') {
                const res_data = await response.data;
                // console.log(res_data);
                storeTokenInLS(res_data.token);
                setUser({
                    email: "",
                    password: ""
                })
                navigate('/');
            }
        } catch (err) {
            console.log("Login Error", err);
            const msg1 = err.response.data.extraDetails;
            const error = msg1 ? msg1 : err.response.data.message;
            console.log(error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-login">
                        <div className="auth-container">
                            <div className="login-form form-container">
                                <h1 className="main-heading">Login</h1>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input
                                            type="email"
                                            placeholder="enter your email"
                                            id="email"
                                            autoComplete="off"
                                            required
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input
                                            type="password"
                                            placeholder="enter your password"
                                            id="password"
                                            autoComplete="off"
                                            required
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
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
                    </div>
                </main>
            </section>
        </>
    );
}

export default Login;