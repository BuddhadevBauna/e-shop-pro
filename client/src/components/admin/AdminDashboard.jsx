import { NavLink } from "react-router-dom";
import "./AdminDashboard.css";
import { FaHome, FaProductHunt, FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useAuth } from "../../store/context/auth";
import ClientError from "../error/ClientError";


const AdminDashboard = () => {
    const {loginUserData, isLoading} = useAuth();
    // console.log(loginUserData, isLoading);

    if(isLoading) {
        return <h1 className="container" style={{marginTop: "1rem"}}>Loading...</h1>;
    } else if(!loginUserData.isAdmin) {
        return <ClientError />;
    }
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