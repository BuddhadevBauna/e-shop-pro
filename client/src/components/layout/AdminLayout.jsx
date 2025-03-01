import { Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";
import AdminDashboard from "../admin/AdminDashboard";
import { useAuth } from "../../store/context/auth";
import ServerError from "../error/ServerError";

const AdminLayout = () => {
    const {isServerIssue} = useAuth();

    const location = useLocation();
    
    if(isServerIssue) {
        return <ServerError />;
    }
    return (
        <main>
            <AdminDashboard />
            {(location.pathname === '/admin' || location.pathname === '/admin/') && <h1 className="admin-section-header">Welcome! to admin section</h1>}
            <Outlet />
        </main>
    );
}

export default AdminLayout;