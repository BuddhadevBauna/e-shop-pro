import { useDispatch, useSelector } from "react-redux";
import "./ManageCategories.css";
import "../Common.css";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../../../store/context/auth";
import { deleteCategory, deleteSubCategory } from "./delete/deleteCategory";

const ManageCategories = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);

    const { AuthorizationToken } = useAuth();
    const dispatch = useDispatch();

    const [hoveredRow, setHoveredRow] = useState({
        categoryIndex: null,
        subCategoryIndex: null
    });

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

    return (
        <>
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
                                <th colSpan="4">SubCategory</th>
                                <th rowSpan="2">Update</th>
                                <th rowSpan="2">Delete</th>
                            </tr>
                            <tr className="subcategory">
                                <th>SubCategory Name</th>
                                <th>SubCategory Type</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <React.Fragment key={index}>
                                    {category.subCategory.length > 0 ? (
                                        category.subCategory.map((subCat, subIndex) => (
                                            <tr key={subIndex}
                                                onMouseOver={() => handleMouseHover(index, subIndex)}
                                                onMouseLeave={handelMouseLeave}
                                            >
                                                {subIndex === 0 && (
                                                    <>
                                                        <td rowSpan={category.subCategory.length} className="centre-td">{category.name}</td>
                                                        <td rowSpan={category.subCategory.length} className="centre-td null-td">Null</td>
                                                    </>
                                                )}
                                                <td className={`subcategory-td ${(hoveredRow.categoryIndex === index && hoveredRow.subCategoryIndex === subIndex) ? 'subcategory-td-hover' : ''}`}>
                                                    {subCat.name}
                                                </td>
                                                <td className={`subcategory-td ${(hoveredRow.categoryIndex === index && hoveredRow.subCategoryIndex === subIndex) ? 'subcategory-td-hover' : ''}`}>
                                                    {subCat.categoryType}
                                                </td>
                                                <td className={`subcategory-td ${(hoveredRow.categoryIndex === index && hoveredRow.subCategoryIndex === subIndex) ? 'subcategory-td-hover' : ''}`}>
                                                    <Link to={`update/q?categoryId=${category._id}&subCategoryId=${subCat._id}`}>
                                                        <button className="btn">Update</button>
                                                    </Link>
                                                </td>
                                                <td className={`subcategory-td ${(hoveredRow.categoryIndex === index && hoveredRow.subCategoryIndex === subIndex) ? 'subcategory-td-hover' : ''}`}>
                                                    <button className="btn" onClick={() => deleteSubCategory(category._id, subCat._id, dispatch, AuthorizationToken)}>Delete</button>
                                                </td>
                                                {subIndex === 0 && (
                                                    <>
                                                        <td rowSpan={category.subCategory.length}>
                                                            <Link to={`update/q?categoryId=${category._id}`}>
                                                                <button className="btn">Update</button>
                                                            </Link>
                                                        </td>
                                                        <td rowSpan={category.subCategory.length}>
                                                            <button className="btn" onClick={() => deleteCategory(category._id, dispatch, AuthorizationToken)}>Delete</button>
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
                                                <Link to={`update/q?categoryId=${category._id}`}>
                                                    <button className="btn">Update</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn" onClick={() => deleteCategory(category._id, dispatch, AuthorizationToken)}>Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default ManageCategories;
