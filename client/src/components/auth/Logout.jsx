import { useEffect } from "react";
import { useAuth } from "../../store/context/auth";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const {logoutUser} = useAuth();

    useEffect(() => {
        logoutUser();
    }, [logoutUser]);

    return (
        <>
            <Navigate to={'/'} />
        </>
    );
}

export default Logout;