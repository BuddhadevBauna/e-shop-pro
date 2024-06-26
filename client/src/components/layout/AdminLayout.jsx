import { Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";
import AdminDashboard from "../admin/AdminDashboard";

const AdminLayout = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname === '/admin';
    
    return (
        <>
            <AdminDashboard />
            {isAdminRoute && <h1 className="admin-section-header">Welcome! to admin section</h1>}
            <Outlet />
        </>
    );
}

export default AdminLayout;