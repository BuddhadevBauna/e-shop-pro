import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { removeSearchProduct, setSearchProduct } from "../../../store/redux/reducers/searchProductSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { removeSearchCategories, setSearchCategories } from "../../../store/redux/reducers/searchCategorySlice";

const SearchContainer = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get the query parameter from the URL
        // console.log(location.search);
        const params = new URLSearchParams(location.search);
        const searchInput = params.get("searchInput");
        // console.log(params, searchInput);

        // If there's a search input in the URL, set it to the input state
        if (searchInput) {
            setInput(searchInput);
            searchProducts(searchInput);
        }
    }, [location.search]);

    const handleChange = (value) => {
        setInput(value);
    }

    const searchProducts = async (searchTerm) => {
        try {
            dispatch(removeSearchCategories());
            dispatch(removeSearchProduct());
            const response = await axios.get(`http://localhost:3030/products/search/?q=${searchTerm}`);
            if (response.data.searchData === "categories") {
                dispatch(setSearchCategories(response.data.categories))
            } else if (response.data.searchData === "products") {
                dispatch(setSearchProduct(response.data.products));
            }
            navigate(`/products/search/?q=${searchTerm}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchProducts(input);
            setInput("");
        }
    }

    const handleButtonClick = () => {
        searchProducts(input);
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