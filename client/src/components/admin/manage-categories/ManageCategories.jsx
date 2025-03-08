import { useSelector } from "react-redux";
import "./ManageCategories.css";
import "../Common.css";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Popup from "../popup/Popup";
import { useFetchAllCategory } from "../../../api/categories/categoryAPI";

const ManageCategories = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);
    const [hoveredRow, setHoveredRow] = useState({ categoryIndex: null, subCategoryIndex: null });
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState(null);

    useFetchAllCategory();

    const handleMouseHover = (index, subIndex) => {
        setHoveredRow({
            categoryIndex: index,
            subCategoryIndex: subIndex
        });
    }
    const handelMouseLeave = () => {
        setHoveredRow({
            categoryIndex: null,
            subCategoryIndex: null
        });
    }

    const deleteCategory = (category) => {
        setPopupData({ "type": "delete", "data": { "type": "category", ...category } });
        setPopupVisible(true);
    }
    const deleteSubCategory = (categoryId, subCategory) => {
        setPopupData({ "type": "delete", "data": { "type": "subCategory", categoryId, ...subCategory } })
        setPopupVisible(true);
    }

    const updateCategory = (category) => {
        setPopupData({ "type": "update", "data": { "type": "category", ...category } });
        setPopupVisible(true);
    }
    const updateSubCategory = (categoryId, subCategory) => {
        setPopupData({ "type": "update", "data": { "type": "subCategory", categoryId, ...subCategory } });
        setPopupVisible(true);
    }

    return (
        (categories || categories.length !== 0) &&
        <section className="container admin admin-categories-section">
            <div className="header-div">
                <h1>All categories</h1>
                <Link to={`add`}>
                    <i><IoMdAddCircle /></i>
                </Link>
            </div>
            <div className="admin-container admin-categories">
                <table>
                    <thead>
                        <tr className="category">
                            <th rowSpan="2">Category Name</th>
                            <th rowSpan="2">Category Type</th>
                            <th colSpan="5">SubCategory</th>
                            <th rowSpan="2">Update</th>
                            <th rowSpan="2"></th>
                        </tr>
                        <tr className="subcategory">
                            <th>SubCategory Name</th>
                            <th>SubCategory Type</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <React.Fragment key={index}>
                                {category?.subCategory?.length > 0 ? (
                                    category.subCategory.map((subCat, subIndex) => (
                                        <tr key={subIndex}
                                            onMouseOver={() => handleMouseHover(index, subIndex)}
                                            onMouseLeave={() => handelMouseLeave()}
                                            className={`${(hoveredRow.categoryIndex === index && hoveredRow.subCategoryIndex === subIndex) ? 'subcategory-tr-hover' : ''}`}
                                        >
                                            {subIndex === 0 && (
                                                <>
                                                    <td rowSpan={category.subCategory.length} className="category-td centre-td">{category.name}</td>
                                                    <td rowSpan={category.subCategory.length} className="category-td centre-td null-td">{category.categoryType}</td>
                                                </>
                                            )}
                                            <td className={`subcategory-td`}>
                                                {subCat.name}
                                            </td>
                                            <td className={`subcategory-td`}>
                                                {subCat.categoryType}
                                            </td>
                                            <td className={`subcategory-td`}>
                                                <button className="btn" onClick={() => updateSubCategory(category._id, subCat)}>Update</button>
                                            </td>
                                            <td className={`subcategory-td`}>
                                                <button className="btn" onClick={() => deleteSubCategory(category._id, subCat)}>Delete</button>
                                            </td>
                                            {subIndex === 0 && (
                                                <>
                                                    <td rowSpan={category.subCategory.length}>
                                                        <Link to={`add/subCategory?categoryId=${category._id}`}>
                                                            <button className="btn">Add</button>
                                                        </Link>
                                                    </td>
                                                    <td rowSpan={category.subCategory.length}>
                                                        <button className="btn" onClick={() => updateCategory(category)}>Update</button>
                                                    </td>
                                                    <td rowSpan={category.subCategory.length}>
                                                        <button className="btn" onClick={() => deleteCategory(category)}>Delete</button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr key={category._id}>
                                        <td className="centre-td">{category.name}</td>
                                        <td className="centre-td">{category.categoryType}</td>
                                        <td colSpan="4">No SubCategories</td>
                                        <td>
                                            <Link to={`add/subCategory?categoryId=${category._id}`}>
                                                <button className="btn">Add</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn" onClick={() => updateCategory(category)}>Update</button>
                                        </td>
                                        <td>
                                            <button className="btn" onClick={() => deleteCategory(category)}>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            {isPopupVisible &&
                <Popup data={popupData} onClose={() => setPopupVisible(false)} />
            }
        </section>
    );
};

export default ManageCategories;
