import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navabr";
import Footer from "../components/Footer";
import AllCategories from "../components/products/allCategory/AllCategories";
import ProductListing from "../components/products/allProducts/ProductListing";

const Root = () => {
    return (
        <div>
            <Navbar />
            <AllCategories />
            <ProductListing />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Root;