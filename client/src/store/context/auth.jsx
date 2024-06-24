import { createContext, useContext, useState } from "react";

//context api(create context, provider, consumer)
//Context create
export const AuthContext = createContext();

//provider(for data passing)
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setLoggedIn] = useState(!!token);

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