import { useEffect } from "react";
import { useAuth } from "../../store/context/auth";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const {removeTokenFromLocalStorage} = useAuth();
    useEffect(() => {
        removeTokenFromLocalStorage();
    }, []);

    return (
        <>
            <Navigate to={'/'} />
        </>
    );
}

export default Logout;