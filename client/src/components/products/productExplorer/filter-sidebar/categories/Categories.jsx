import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const categories = useSelector((state) => state.selectedOrSearchCategories);
    // console.log(categories);
    const [visibleSubCategories, setVisibleSubCategories] = useState({ 0: true });
    const navigate = useNavigate();

    const toggleSubCategory = (index) => {
        setVisibleSubCategories((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleCategoryClick = (categoryType) => {
        const url = new URL(window.location.href);
        // console.log(url);

        let query = url.searchParams;
        query.set("category", categoryType);
        // console.log(query.toString());

        // remove previous brands from query
        query.delete("brands");

        navigate(`${url.pathname}?${query.toString()}`);
    };

    const query = new URLSearchParams(location.search);
    let selectedCategory;
    if (query.has("category")) {
        selectedCategory = query.get("category");
    } else {
        if (categories?.length > 0) {
            if (!categories[0]?.subCategory || categories[0]?.subCategory?.length === 0) {
                selectedCategory = categories[0]?.categoryType;
            } else {
                selectedCategory = categories[0]?.subCategory[0]?.categoryType;
            }
        }
    }

    return (
        <div className="filter-category">
            <h1 className="category-header">Category</h1>
            {categories?.length > 0 &&
                <>
                    {categories.map((category, index) => (
                        <div key={index}>
                            {!category?.subCategory || category?.subCategory?.length === 0 ? (
                                <menu
                                    className={`category-menu ${selectedCategory === category.categoryType ? "active" : ""}`}
                                    onClick={() => handleCategoryClick(category.categoryType)}
                                >
                                    <i>
                                        <IoIosArrowForward />
                                    </i>
                                    {category.categoryType}
                                </menu>
                            ) : (
                                <>
                                    <menu
                                        className={`category-menu`}
                                        onClick={() => toggleSubCategory(index)}
                                    >
                                        {!visibleSubCategories[index] ? (
                                            <i>
                                                <IoIosArrowForward />
                                            </i>
                                        ) : (
                                            <i>
                                                <IoIosArrowDown />
                                            </i>
                                        )}
                                        {category.categoryType}
                                    </menu>
                                    {visibleSubCategories[index] && (
                                        <ul className="subCategory-ul">
                                            {category?.subCategory?.map((subCat, subInd) => {
                                                return (
                                                    <li
                                                        key={subInd}
                                                        className={`${selectedCategory === subCat.categoryType ? "active" : ""}`}
                                                        onClick={() => handleCategoryClick(subCat.categoryType)}
                                                    >
                                                        {subCat.categoryType}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </>
            }
        </div>
    );
};

export default Categories;
