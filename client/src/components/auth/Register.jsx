import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/context/auth";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    console.log(storeTokenInLS);

    const handleInput = (e) => {
        let { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user);
        try {
            const response = await axios.post(`http://localhost:3030/auth/register`, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // console.log(response);
            if (response.statusText === "Created") {
                const res_data = response.data;
                // console.log(res_data);
                storeTokenInLS(res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                })
                navigate('/');
            }
        } catch (err) {
            // console.log("Registration Error", err);
            const msg1 = err.response.data.extraDetails;
            const error = msg1 ? msg1 : err.response.data.message;
            console.log(error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="auth-container">
                            <div className="registration-form form-container">
                                <h1 className="main-heading">Register</h1>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input
                                            type="text"
                                            placeholder="enter your username"
                                            id="username"
                                            autoComplete="off"
                                            required
                                            name="username"
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                    </div>
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
                                        <label htmlFor="phone">phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            placeholder="enter your phone"
                                            autoComplete="off"
                                            required
                                            name="phone"
                                            value={user.phone}
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
                                    <Link to={'/login'}>
                                        <span>Login</span>
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

export default Register;