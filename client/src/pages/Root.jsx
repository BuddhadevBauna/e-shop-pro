import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navabr";
import Footer from "../components/Footer";
import AllCategories from "../components/products/allCategory/AllCategories";

const Root = () => {
    return (
        <div>
            <Navbar />
            <AllCategories />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Root;