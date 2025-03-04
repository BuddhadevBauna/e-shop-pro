import "./ManageProducts.css";
import "../Common.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { deleteProduct } from "./delete/deleteProduct";
import { useAuth } from "../../../store/context/auth";

const ManageProducts = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);
    const products = useSelector(state => state.allCategoriesProducts);
    // console.log(products);

    const { token } = useAuth();
    const dispatch = useDispatch();

    if (!categories || categories.length === 0 || !products || products?.isCategoriesOfProductsLoading) {
        return (
            <div className='loading'>
                <p>Loading</p>
                <span>.</span><span>.</span><span>.</span>
            </div>
        )
    }
    return (
        <>
            <section className="container admin admin-products-section">
                <div className="header-div">
                    <h1>All products</h1>
                    <Link to={'add'}>
                        <i><IoMdAddCircle /></i>
                    </Link>
                </div>
                <div className="admin-container admin-products">
                    {categories.map((category, index) => (
                        <React.Fragment key={index}>
                            {category.subCategory.length === 0 ? (
                                products?.productsOfCategories[category.categoryType] && (
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
                                                {products.productsOfCategories[category.categoryType]?.map((product, productIndex) => (
                                                    <tr key={productIndex}>
                                                        <td>{product.title}</td>
                                                        <td>{product.brand || 'Null'}</td>
                                                        <td className="price-td">{product.price}</td>
                                                        <td>
                                                            <Link to={`update/${product._id}`}>
                                                                <button className="btn">Update</button>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn"
                                                                onClick={() => deleteProduct(product._id, AuthorizationToken, dispatch, categories)}
                                                            >Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            ) : (
                                <>
                                    {category.subCategory.map((subCat, subIndex) => (
                                        products?.productsOfCategories[subCat.categoryType] && (
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
                                                        {products.productsOfCategories[subCat.categoryType]?.map((product, productIndex) => (
                                                            <tr key={productIndex}>
                                                                <td>{product.title}</td>
                                                                <td>{product.brand || 'Null'}</td>
                                                                <td className="price-td">{product.price}</td>
                                                                <td>
                                                                    <Link to={`update/${product._id}`}>
                                                                        <button className="btn">Update</button>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn"
                                                                        onClick={() => deleteProduct(product._id, AuthorizationToken, dispatch, categories)}
                                                                    >Delete</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )
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