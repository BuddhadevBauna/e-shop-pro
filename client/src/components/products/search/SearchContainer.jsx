import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchContainer = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (value) => {
        setInput(value);
    }
    
    const searchProductsOrCategory = async (searchTerm) => {
        try {
            navigate(`/products/search/?q=${encodeURIComponent(searchTerm)}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if(input) {
                searchProductsOrCategory(input);
            }
            setInput("");
        }
    }

    const handleButtonClick = () => {
        if(input) {
            searchProductsOrCategory(input);
        }
        setInput("");
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search products by name category..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <button className="search-btn" onClick={() => handleButtonClick()}>
                <i className="search-icon">
                    <FaSearch />
                </i>
            </button>
        </>
    );
}

export default SearchContainer;