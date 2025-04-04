import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/context/auth-context";
import "./RoleBasedRoute.css";
import ClientError from "../components/error/ClientError";

const RoleBasedRoute = ({ allowedRoles }) => {
    const { isLoadingUserData, isLoggedIn, loginUserData } = useAuth();
    // console.log(isLoggedIn, loginUserData.userRole);
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isLoadingUserData) {
        <div className='loading'>
            <p>Loading</p>
            <span>.</span><span>.</span><span>.</span>
        </div>
    }
    if (isAdminRoute) {
        if (!isLoggedIn || !loginUserData?.userRole?.includes("admin")) {
            return <ClientError />;
        }
    } else if (!isLoggedIn) {
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