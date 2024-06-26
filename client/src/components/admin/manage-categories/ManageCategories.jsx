import { useSelector } from "react-redux";
import "./ManageCategories.css";
import "../Common.css";
import React, { useState } from "react";

const ManageCategories = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);

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
                <div>
                    <h1>All categories Data</h1>
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
                                                    <button>Update</button>
                                                </td>
                                                <td className={`subcategory-td ${(hoveredRow.categoryIndex === index && hoveredRow.subCategoryIndex === subIndex) ? 'subcategory-td-hover' : ''}`}>
                                                    <button>Delete</button>
                                                </td>
                                                {subIndex === 0 && (
                                                    <>
                                                        <td rowSpan={category.subCategory.length}><button>Update</button></td>
                                                        <td rowSpan={category.subCategory.length}><button>Delete</button></td>
                                                    </>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr key={category._id}>
                                            <td className="centre-td">{category.name}</td>
                                            <td className="centre-td">{category.categoryType}</td>
                                            <td colSpan="4">No SubCategories</td>
                                            <td><button>Update</button></td>
                                            <td><button>Delete</button></td>
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
