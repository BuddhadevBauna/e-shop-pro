import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

//context api(create context, provider, consumer)
//Context create
export const AuthContext = createContext();

//provider(for data passing)
export const AuthProvider = ({ children }) => {
    const [isServerIssue, setServerIssue] = useState(true);
    const [isServerIssueLoading, setServerIssueLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginUserData, setLoginUserData] = useState("");
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);

    const checkServerStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3030/status');
            // console.log(response);
            if (response.status !== 200) {
                setServerIssue(true);
            } else {
                setServerIssue(false);
            }
        } catch (error) {
            setServerIssue(true);
        } finally {
            setServerIssueLoading(false);
        }
    }
    useEffect(() => {
        checkServerStatus();
    }, []);

    const fetchLoggedinUserData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3030/user', { withCredentials: true });
            // console.log(response);
            if (response?.status >= 200 && response?.status <= 300) {
                setLoggedIn(true);
                setLoginUserData(response.data);
            }
        } catch (error) {
            // console.error(error);
            setLoggedIn(false);
            setLoginUserData(null);
        } finally {
            setIsLoadingUserData(false);
        }
    }, []);

    useEffect(() => {
        fetchLoggedinUserData();
    }, [fetchLoggedinUserData]);

    return (
        <AuthContext.Provider
            value={{
                isServerIssueLoading,
                isServerIssue,
                fetchLoggedinUserData,
                isLoadingUserData,
                isLoggedIn,
                loginUserData,
                setLoggedIn, 
                setLoginUserData, 
                setIsLoadingUserData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

//custom hook
export const useAuth = () => {
    //Usecontext use for consumer
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        console.log("useauth used outside of the provider.");
    }
    return authContextValue;
};
