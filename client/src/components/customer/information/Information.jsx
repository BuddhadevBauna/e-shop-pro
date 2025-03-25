import React from "react";
import InformationSidebar from "./sidebar/InformationSidebar";
import { Outlet } from "react-router-dom";

const Information = () => {
    return (
        <section>
            <InformationSidebar />
            <Outlet />
        </section>
    );
}

export default Information;