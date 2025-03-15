import React, { useEffect, useMemo, useState } from "react";
import "./CategoryInput.css";
import useFetchCategorySugession from "../../../../../custom_hook/useFetchCategorySugession";
import { Link } from "react-router-dom";

const CategoryInput = ({ label, type, required, name, value, mode, input, setInput }) => {
    let categories = useFetchCategorySugession();
    // console.log(categories);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".category-container")) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const handleCategoryClick = () => {
        setSearchTerm("");
        setShowDropdown(true);
    }

    const handleCategoryChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleCategorySelect = (category) => {
        setInput((prevInput) => ({
            ...prevInput,
            category: category
        }));
        setShowDropdown(false);
        setSearchTerm("");
    }

    const filteredCategories = useMemo(() => {
        if (categories.length === 0) return [];
        return categories.filter(category => category.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, categories]);

    return (
        <div className="form-menu category-container">
            <div className="category-input-container">
                <label htmlFor={name}>{label} :</label>
                <input
                    type={type}
                    id={name}
                    autoComplete="off"
                    required={required}
                    name={name}
                    value={value || ""}
                    placeholder={`Select a ${name}`}
                    onClick={handleCategoryClick}
                    readOnly
                />
                {showDropdown &&
                    <div className="dropdown-container">
                        <input
                            type="text"
                            className="search-box"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={handleCategoryChange}
                            autoFocus
                        />
                        <ul className="category-list">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category, index) => (
                                    <li key={index} onClick={() => handleCategorySelect(category)}>
                                        {category}
                                    </li>
                                ))
                            ) : (
                                <>
                                    <li className="no-results">No categories found</li>
                                    <li className="add-category">
                                        <Link to={'/admin/categories/add'}>Add Category</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                }
            </div>
            {(mode === "View") &&
                <button className="submit-btn" type="submit">
                    Update
                </button>
            }
        </div>
    )
}

export default CategoryInput;