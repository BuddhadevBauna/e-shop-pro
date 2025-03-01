import React, { useState } from "react";
import "./Popup.css";
import { handleDeleteCategory, handleDeleteSubCategory } from "./deleteCategory";
import { useAuth } from "../../../../store/context/auth";
import { useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";

const Popup = ({ data, onClose }) => {
    // console.log(data);
    const [chagePopUpInformation, setPChangePopupInformation] = useState(false);
    const [input, setInput] = useState({ "password": "" });
    const { token } = useAuth();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data?.type === "category") handleDeleteCategory(data?.data?._id, token, input, dispatch);
        else handleDeleteSubCategory(data?.data?.categoryId, data?.data?.subCategory?._id, token, input, dispatch);
        onClose();
    }

    return (
        <div className="popup-container">
            <div className="popup">
                <button className="close-btn" onClick={onClose}>
                    <i> <IoIosClose /> </i>
                </button>
                <h2 className="popup-title">Confirm Deletion</h2>
                <div className="popup-info">
                    {data &&
                        <>
                            {!chagePopUpInformation ? (
                                <>
                                    <p className="popup-message">
                                        <span>Are you sure you want to delete </span> 
                                        {data.type === "category" ? (
                                            <span className="bold">{data?.data?.name} category?</span>
                                        ) : (
                                            <span className="bold">{data?.data?.subCategory?.name} subCategory?</span>
                                        )}
                                    </p>
                                    <button className="btn confirm-btn" onClick={() => setPChangePopupInformation(true)}>I Want To Delete</button>
                                </>
                            ) : (
                                <div className="delete-form">
                                    <p className="popup-message">
                                        <span>Delete </span>
                                        {data.type === "category" ? (
                                            <span className="bold">{data?.data?.name} category.</span>
                                        ) : (
                                            <span className="bold">{data?.data?.subCategory?.name} subCategory.</span>
                                        )}
                                    </p>
                                    <form onSubmit={handleSubmit} className="form-container">
                                        <div className="form-menu">
                                            <label htmlFor="password" className="form-label">
                                                Please enter password for confirm delete
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
                                        <button className="btn submit-btn" type="submit">Delete</button>
                                    </form>
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Popup;