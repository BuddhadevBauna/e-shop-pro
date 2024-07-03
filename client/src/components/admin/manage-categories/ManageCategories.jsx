import { useDispatch, useSelector } from "react-redux";
import "./ManageCategories.css";
import "../Common.css";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../store/context/auth";
import { fetchProductsCategory } from "../../../api/categories/categoryAPI";

const ManageCategories = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);

    const {AuthorizationToken} = useAuth();
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

    const deleteCategory = async (categoryId) => {
        try {
            const deleteCategoryURL = `${import.meta.env.VITE_DELETE_CATEGORY_SECTION_URL}?categoryId=${categoryId}`;
            // console.log(deleteCategoryURL);
            const response = await axios.delete(deleteCategoryURL, {
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            // console.log(response);
            if(response.status === 200) {
                fetchProductsCategory(dispatch);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const deleteSubCategory = async (categoryId, subCategoryId) => {
        try {
            const deleteSubCategoryURL = `${import.meta.env.VITE_DELETE_CATEGORY_SECTION_URL}?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
            // console.log(deleteCategoryURL);
            const response = await axios.delete(deleteSubCategoryURL, {
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            // console.log(response);
            if(response.status === 200) {
                fetchProductsCategory(dispatch);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <section className="container admin admin-categories-section">
                <div className="header-div">
                    <h1>All categories</h1>
                    <i><IoMdAddCircle /></i>
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
                                                        <button>Update</button>
                                                    </Link>
                                                </td>
                                                <td className={`subcategory-td ${(hoveredRow.categoryIndex === index && hoveredRow.subCategoryIndex === subIndex) ? 'subcategory-td-hover' : ''}`}>
                                                    <button onClick={() => deleteSubCategory(category._id, subCat._id)}>Delete</button>
                                                </td>
                                                {subIndex === 0 && (
                                                    <>
                                                        <td rowSpan={category.subCategory.length}>
                                                            <Link to={`update/q?categoryId=${category._id}`}>
                                                                <button>Update</button>
                                                            </Link>
                                                        </td>
                                                        <td rowSpan={category.subCategory.length}>
                                                            <button onClick={() => deleteCategory(category._id)}>Delete</button>
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
                                                    <button>Update</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
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
