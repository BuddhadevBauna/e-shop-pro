import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

//context api(create context, provider, consumer)
//Context create
export const AuthContext = createContext();

//provider(for data passing)
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setLoggedIn] = useState(!!token);
    const AuthorizationToken = `Bearer ${token}`;
    const [user, setUser] = useState("");

    //for store token in local storage
    const storeTokenInLS = (token) => {
        setToken(token);
        setLoggedIn(true);
        localStorage.setItem('token', token);
    }

    //for user logout
    const logoutUser = () => {
        setToken("");
        setLoggedIn(false);
        localStorage.removeItem('token');
    }

    //for get currently login user data
    const userAuthentication = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/auth/user`, {
                headers: {
                    Authorization: AuthorizationToken
                }
            })
            // console.log(response);
            if (response.statusText === "OK") {
                const data = response.data;
                setUser(data.userData);
            }
        } catch (error) {
            console.log("Error fetching userdata", error);
        }
    }
    useEffect(() => {
        if(token) {
            userAuthentication();
        } else {
            setUser("");
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                storeTokenInLS,
                isLoggedIn,
                logoutUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}


//custom hook
export const useAuth = () => {
    //Usecontext use for consumer
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        console.log("useauth used outside of the provider.");
    }
    return authContextValue;
}