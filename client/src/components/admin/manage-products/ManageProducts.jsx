import "./ManageProducts.css";
import "../Common.css";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFetchProductsOfAllCategories } from "../../../api/products/productsAPI";
import Popup from "../popup/Popup";

const ManageProducts = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);
    const products = useSelector(state => state.allCategoriesProducts);
    // console.log(products);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState(null);

    useFetchProductsOfAllCategories();

    const deleteProduct = (productId, name, categories) => {
        setPopupData({ "type": "delete", "data": { "type": "product", productId, name, categories } });
        setPopupVisible(true);
    }

    const updateProductStatus = (productId, name, isDeleted, categories) => {
        setPopupData({ "type": "update", "data": { "type": "product", "modifiedField": "status", productId, name, isDeleted, categories } });
        setPopupVisible(true);
    }

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
                                                    <th className="name-th">Name</th>
                                                    <th className="brand-th">Brand</th>
                                                    <th className="price-th">Price</th>
                                                    <th className="view-th">View</th>
                                                    <th className="status-th">Sattus</th>
                                                    <th className="update-th">Update</th>
                                                    <th className="delete-th">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.productsOfCategories[category.categoryType]?.map((product, productIndex) => (
                                                    <tr key={productIndex}>
                                                        <td>{product.title}</td>
                                                        <td>{product.brand || 'Null'}</td>
                                                        <td className="price-td">{product.salePrice}</td>
                                                        <td>
                                                            <Link to={`${product._id}/view`}>
                                                                <button className="btn view-btn">View</button>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className={`btn ${!product.isDeleted ? "active-status" : "inactive-status"}`}
                                                                onClick={() => updateProductStatus(product._id, product.title, product.isDeleted, categories)}
                                                            >
                                                                {!product.isDeleted ? "Active" : "Inactive"}
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <Link to={`${product._id}/update`}>
                                                                <button className="btn update-btn">Update</button>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn delete-btn"
                                                                onClick={() => deleteProduct(product._id, product.title, categories)}
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
                                                            <th className="name-th">Name</th>
                                                            <th className="brand-th">Brand</th>
                                                            <th className="price-th">Price</th>
                                                            <th className="view-th">View</th>
                                                            <th className="status-th">Sattus</th>
                                                            <th className="update-th">Update</th>
                                                            <th className="delete-th">Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.productsOfCategories[subCat.categoryType]?.map((product, productIndex) => (
                                                            <tr key={productIndex}>
                                                                <td>{product.title}</td>
                                                                <td>{product.brand || 'Null'}</td>
                                                                <td className="price-td">{product.salePrice}</td>
                                                                <td>
                                                                    <Link to={`${product._id}/view`}>
                                                                        <button className="btn view-btn">View</button>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className={`btn ${!product.isDeleted ? "active-status" : "inactive-status"}`}
                                                                        onClick={() => updateProductStatus(product._id, product.title, product.isDeleted, categories)}
                                                                    >
                                                                        {!product.isDeleted ? "Active" : "Inactive"}
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <Link to={`${product._id}/update`}>
                                                                        <button className="btn update-btn">Update</button>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn delete-btn"
                                                                        onClick={() => deleteProduct(product._id, product.title, categories)}
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
                {isPopupVisible &&
                    <Popup data={popupData} onClose={() => setPopupVisible(false)} />
                }
            </section>
        </>
    );
}

export default ManageProducts;