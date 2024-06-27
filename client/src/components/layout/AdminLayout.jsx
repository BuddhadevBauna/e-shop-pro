import { Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";
import AdminDashboard from "../admin/AdminDashboard";
import { useAuth } from "../../store/context/auth";
import ServerError from "../error/ServerError";

const AdminLayout = () => {
    const {isServerIssue, loginUserData} = useAuth();

    const location = useLocation();
    const isAdminRoute = location.pathname === '/admin';
    
    if(isServerIssue) {
        return <ServerError />;
    }
    return (
        <>
            <AdminDashboard />
            {isAdminRoute && loginUserData.isAdmin && <h1 className="admin-section-header">Welcome! to admin section</h1>}
            <Outlet />
        </>
    );
}

export default AdminLayout;