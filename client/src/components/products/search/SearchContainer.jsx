import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./SearchContainer.css";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useProductsSearchSuggestions from "../../../custom_hook/useSearchProductsSuggestions";
import debounce from "lodash.debounce";

const SearchContainer = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const suggestions = useProductsSearchSuggestions();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        if(location.pathname === '/products/search/') {
            const searchTerm = searchParams.get("q") || "";
            setInputValue(searchTerm);
        } else {
            setInputValue('');
        }
    }, [location, searchParams]);

    const filteredSuggestions = useMemo(() => {
        if (inputValue === "") return suggestions.slice(0, 10);
        return suggestions.filter(item =>
            item.toLowerCase().includes(inputValue.toLowerCase())
        ).slice(0, 10);
    }, [inputValue, suggestions]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".search-box-and-submit-btn")) {
                setShowDropdown(false);
                if(selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
                    setInputValue(filteredSuggestions[selectedIndex]);
                    setSelectedIndex(-1);
                }
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [filteredSuggestions, selectedIndex]);

    const handleClick = () => {
        setShowDropdown(true);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setShowDropdown(true);
        setSelectedIndex(-1);
    };

    const searchProducts = (term) => {
        if (term) {
            navigate(`/products/search/?q=${encodeURIComponent(term)}`);
            setShowDropdown(false);
            setSelectedIndex(-1);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prevIndex) =>
                prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
            );
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0) {
                searchProducts(filteredSuggestions[selectedIndex]);
            } else {
                searchProducts(inputValue);
            }
        }
    };

    const handleButtonClick = () => {
        if(selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
            searchProducts(filteredSuggestions[selectedIndex]);
        } else {
            searchProducts(inputValue);
        }
    }

    return (
        <div className="search-container">
            <div className="search-box-and-submit-btn">
                <input
                    type="text"
                    placeholder="Search products by category name or product name..."
                    value={selectedIndex >= 0 ? filteredSuggestions[selectedIndex] : inputValue}
                    onClick={handleClick}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-btn" onClick={handleButtonClick}>
                    <i className="search-icon"><FaSearch /></i>
                </button>
            </div>
            {showDropdown && filteredSuggestions.length > 0 && (
                <ul>
                    {filteredSuggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => searchProducts(item)}
                            className={index === selectedIndex ? "active" : ""}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchContainer;