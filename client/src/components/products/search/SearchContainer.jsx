import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { setSearchProducts, removeSearchProducts } from "../../../store/redux/reducers/searchProductSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { removeSearchCategories, setSearchCategories } from "../../../store/redux/reducers/searchCategorySlice";
import { removeFilterAndSortProducts } from "../../../store/redux/reducers/filterAndSortProductSlice";
import { removeCategoryOfProducts } from "../../../store/redux/reducers/productOfCategorySlice";
// import { removeFilterAndSearchProducts } from "../../../store/redux/reducers/filterAndSearchProductSlice";


const SearchContainer = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (value) => {
        setInput(value);
    }

    useEffect(() => {
        // Get the query parameter from the URL
        const params = new URLSearchParams(location.search);
        const searchInput = params.get("q");
        // console.log(location.search, params, searchInput);

        // If there's a search input in the URL, set it to the input state
        if (searchInput) {
            searchProductsOrCategory(searchInput);
            setInput("");
        }
    }, [location.search]);

    
    const searchProductsOrCategory = async (searchTerm) => {
        try {
            dispatch(removeCategoryOfProducts());
            dispatch(removeSearchCategories());
            // dispatch(removeSearchProducts());
            // dispatch(removeFilterAndSearchProducts());
            dispatch(removeFilterAndSortProducts());
            const response = await axios.get(`http://localhost:3030/products/search/?q=${searchTerm}`);
            if (response.data.searchData === "categories") {
                dispatch(setSearchCategories(response.data.categories));
            } else if (response.data.searchData === "products") {
                dispatch(setSearchProducts(response.data.products));
            }
            navigate(`/products/search/?q=${searchTerm}`);
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