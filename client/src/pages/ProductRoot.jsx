import "./ProductRoot.css";
import AllCategories from "../components/products/allCategory/AllCategories";
import ProductOfCategory from "../components/products/productOfCategory/ProductOfCategory";
import { Outlet } from "react-router-dom";

const ProductRoot = () => {
    return (
        <div className="container">
            <AllCategories />
            <Outlet />
        </div>
    );
}

export default ProductRoot;