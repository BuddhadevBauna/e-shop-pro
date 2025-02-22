import React, { useEffect, useState } from "react";
import "./FilterSidebar.css";
import Ratings from "./ratings/Ratings";
import Categories from "./categories/Categories";
import Brands from "./brands/Brands";
import { useLocation, useNavigate } from "react-router-dom";

const FilterSidebar = () => {
    const [isFilterActive, setFilterActive] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setFilterActive(query.has("category") || query.has("brands") || query.has("minRatings"));
    }, [location.search]);

    const clearFilters = () => {
        const url = new URL(window.location.origin + location.pathname + location.search);
        let query = url.searchParams;
        query.delete("category");
        query.delete("brands");
        query.delete("minRatings");
        navigate(`${location.pathname}?${query.toString()}`);
    }

    return (
        <div className="filter-sidebar-container">
            <div className="filter-sidebar">
                <div className="filters">
                    <p className="first">Filters</p>
                    {isFilterActive && (
                        <p className="second" onClick={() => clearFilters()}>Clear Filter</p>
                    )}
                </div>
                <Categories />
                <Brands />
                <Ratings />
            </div>
        </div>
    );
}

export default FilterSidebar;