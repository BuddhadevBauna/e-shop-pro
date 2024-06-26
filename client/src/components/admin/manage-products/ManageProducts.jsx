import "./ManageProducts.css";
import "../Common.css";
import { useSelector } from "react-redux";
import React from "react";

const ManageProducts = () => {
    const categories = useSelector(state => state.allCategory);



    return (
        <>
            <section className="container admin admin-products-section">
                <div>
                    <h1>All products</h1>
                </div>
                <div className="admin-container admin-products">
                    {categories.map((category, index) => (
                        <React.Fragment key={index}>
                            {category.subCategory.length === 0 ? (
                                <div>
                                    <menu>{category.name}</menu>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Brand</th>
                                                <th>Price</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <>
                                    {category.subCategory.map((subCat, subIndex) => (
                                        <div key={subIndex}>
                                            <menu>{subCat.name}</menu>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Brand</th>
                                                        <th>Price</th>
                                                        <th>Update</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </>
    );
}

export default ManageProducts;