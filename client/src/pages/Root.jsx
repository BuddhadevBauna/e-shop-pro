import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navabr";
import Footer from "../components/Footer";

const Root = () => {
    return(
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Root;