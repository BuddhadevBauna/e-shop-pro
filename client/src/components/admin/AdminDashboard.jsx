import { NavLink } from "react-router-dom";
import "./AdminDashboard.css";
import { FaHome, FaProductHunt, FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const AdminDashboard = () => {
    return (
        <>
            <header>
                <div className="container admin-dashboard-container">
                    <nav>
                        <ul>
                            <li><NavLink to={'/'}><i><FaHome /></i>Home</NavLink></li>
                            <li><NavLink to={'/admin/categories'}><i><MdCategory /></i>categories</NavLink></li>
                            <li><NavLink to={'/admin/products'}><i><FaProductHunt /></i>products</NavLink></li>
                            <li><NavLink to={'/admin/user'}><i><FaUser /></i>users</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default AdminDashboard;