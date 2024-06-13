import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchContainer = () => {
    const [input, setInput] = useState("");

    const handleChange = (value) => {
        setInput(value);
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("Enter key pressed");
            //function define
            setInput("");
        }
    }
    const handleButtonClick = () => {
        //function define
        setInput("");
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search products..."
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