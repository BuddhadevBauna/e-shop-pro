import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../store/context/auth";
import "./RoleBasedRoute.css";

const RoleBasedRoute = ({ allowedRoles }) => {
    const { isLoading, isLoggedIn, loginUserData } = useAuth();
    // console.log(isLoggedIn, loginUserData.userRole);

    if(isLoading) return <div>Loading...</div>;
    if (!isLoggedIn) {
        return (
            <div className="role-container">
                <p className="role-message">You must be logged in to access this page.</p>
                <Link to={'/account/login'} className="role-link">Login</Link>
            </div>
        );
    } else if (!loginUserData?.userRole.some(role => allowedRoles.includes(role))) {
        return (
            <div className="role-container">
                <p className="role-message">You do not have permission to access this page.</p>
                <Link to={'/'} className="role-link">return home</Link>
            </div>
        )
    }

    return <Outlet />;
};

export default RoleBasedRoute;