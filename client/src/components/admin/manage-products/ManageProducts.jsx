import "./ManageProducts.css";
import "../Common.css";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";

const ManageProducts = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);
    const products = useSelector(state => state.allCategoriesProducts);
    // console.log(products);

    return (
        <>
            <section className="container admin admin-products-section">
                <div className="header-div">
                    <h1>All products</h1>
                    <i><IoMdAddCircle /></i>
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
                                                <th className="first-th">Name</th>
                                                <th className="second-th">Brand</th>
                                                <th className="third-th">Price</th>
                                                <th className="fourth-th">Update</th>
                                                <th className="fifth-th">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products[category.categoryType]?.map((product, productIndex) => (
                                                <tr key={productIndex}>
                                                    <td>{product.title}</td>
                                                    <td>{product.brand || 'Null'}</td>
                                                    <td className="price-td">{product.price}</td>
                                                    <td><button>Update</button></td>
                                                    <td><button>Delete</button></td>
                                                </tr>
                                            ))}
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
                                                        <th className="first-th">Name</th>
                                                        <th className="second-th">Brand</th>
                                                        <th className="third-th">Price</th>
                                                        <th className="fourth-th">Update</th>
                                                        <th className="fifth-th">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products[subCat.categoryType]?.map((product, productIndex) => (
                                                        <tr key={productIndex}>
                                                            <td>{product.title}</td>
                                                            <td>{product.brand || 'Null'}</td>
                                                            <td className="price-td">{product.price}</td>
                                                            <td><button>Update</button></td>
                                                            <td><button>Delete</button></td>
                                                        </tr>
                                                    ))}
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