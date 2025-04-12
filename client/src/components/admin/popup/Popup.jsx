import React, { useState } from "react";
import "./Popup.css";
import { handleDeleteCategory, handleDeleteSubCategory } from "../manage-categories/delete/deleteCategory";
import { useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { handleDeleteProduct } from "../manage-products/delete/deleteProduct";
import handleSatatusChange from "../manage-products/status/changeStatus";

const Popup = ({ data, onClose }) => {
    // console.log(data);
    const [chagePopUpInformation, setChangePopupInformation] = useState(false);
    const [input, setInput] = useState({ "password": "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (data?.data?.type === "category") handleDeleteCategory(data?.data?._id, input, dispatch);
        else if (data?.data?.type === "subCategory") handleDeleteSubCategory(data?.data?.categoryId, data?.data?._id, input, dispatch);
        else if (data?.data?.type === "product") handleDeleteProduct(data?.data?.productId, input, dispatch, data?.data?.categories);
        onClose();
    }

    const toggleStatus = (e) => {
        e.preventDefault();
        handleSatatusChange(data?.data?.productId, data?.data?.isDeleted, dispatch, data?.data?.categories);
        onClose();
    }

    const handleUpdate = () => {
        if (data?.data?.type === "category") navigate(`update/q?categoryId=${data?.data?._id}`);
        else if (data?.data?.type === "subCategory") navigate(`update/q?categoryId=${data.data.categoryId}&subCategoryId=${data.data._id}`);
    }

    return (
        data &&
        <div className="popup-container">
            <div className="popup">
                <button className="close-btn" onClick={onClose}>
                    <i> <IoIosClose /> </i>
                </button>
                <h2 className="popup-title">
                    {`Confirm 
                        ${data?.type === "delete"
                            ? `${data?.data?.type} Deletion.`
                            : `${data?.data?.type} ${data?.data?.modifiedField === "status" ? "status " : ""}updation.`
                        }`
                    }
                </h2>
                {data.data &&
                    <div className="popup-info">
                        {!chagePopUpInformation ? (
                            <>
                                <p className="popup-message">
                                    <span>Are you sure you want to </span>
                                    <span>{data.type} </span>
                                    {data.data.modifiedField === "status" &&
                                        <span>status of </span>
                                    }
                                    <span className="bold">{data.data.name} </span>
                                    <span>{data.data.type}</span>
                                </p>
                                <button className="btn confirm-btn" onClick={() => setChangePopupInformation(true)}>
                                    <span>I Want To </span>
                                    <span className="captalize">{data.type}</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="popup-message">
                                    <span className="captalize">{data.type} </span>
                                    {data.data.modifiedField === "status" &&
                                        <span>status of </span>
                                    }
                                    <span className="bold">{data.data.name} </span>
                                    <span>{data.data.type}.</span>
                                </p>
                                {data.type === "update" ? (
                                    (data.data.type === "category" || data.data.type === "subCategory") ? (
                                        <>
                                            <p className="popup-message">
                                                <span>If you update </span>
                                                <span>{data.data.name} {data.data.type}.</span>
                                                <span>Then it will update it's corresponding products category section.</span>
                                            </p>
                                            <button className="btn update-btn" onClick={() => handleUpdate()}>Update</button>
                                        </>
                                    ) : (data.data.type === "product") ? (
                                        <>
                                            <p className="popup-message">
                                                <span>If you update </span>
                                                {data.data.modifiedField === "status" &&
                                                    <span>status of </span>
                                                }
                                                <span>{data.data.name} {data.data.type}.</span>
                                                <span>
                                                    Then it's
                                                    {data.data.isDeleted ? ' again ' : ' not more '}
                                                    show in prductlisting page as it become
                                                    {data.data.isDeleted ? ' active.' : ' inactive.'}
                                                </span>
                                            </p>
                                            <button className="btn update-btn" onClick={toggleStatus}>Update</button>
                                        </>
                                    ) : null
                                ) : null}
                                {data.type === "delete" &&
                                    <form onSubmit={handleDelete} className="form-container">
                                        <div className="form-menu">
                                            <label htmlFor="password" className="form-label">
                                                <span>Please enter password for confirm delete</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="password"
                                                name="password"
                                                value={input.password}
                                                placeholder="Enter Password..."
                                                required
                                                onChange={handleChange}
                                                autoComplete="off"
                                                className="form-input"
                                            />
                                        </div>
                                        <button className="btn delete-btn" type="submit">Delete</button>
                                    </form>
                                }
                            </>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default Popup;