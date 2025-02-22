import React from "react";
import "./SortList.css";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const SortList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSort = (sortBy) => {
        const url = new URL(window.location.origin + location.pathname + location.search);
        let query = url.searchParams;
        query.set("sortBy", sortBy);
        navigate(`${url.pathname}?${query.toString()}`);
    }

    return (
        <div className="sort-list-container">
            <div>
                <h1 className="sort-list-heading">Sort By <i><IoIosArrowForward /></i></h1>
                <ul className="sort-list-list">
                    <li className="sort-list" onClick={() => handleSort("price_asc")}>Price - Low to High</li>
                    <li className="sort-list" onClick={() => handleSort("price_desc")}>Price - High to Low</li>
                </ul>
            </div>
        </div>
    );
}

export default SortList;