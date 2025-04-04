import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../store/context/auth-context";
import { toast } from "react-toastify";

const AddSubCategory = () => {
    const [category, setCategory] = useState({ name: "", categoryType: "" });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("categoryId");
    const {token} = useAuth();
    const navigate = useNavigate();

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = {...category, "parent": categoryId}
        const addCategory = async () => {
            try {
                const addCategoryURL = import.meta.env.VITE_ADD_CATEGORY;
                const response = await axios.post(addCategoryURL, input, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // console.log(response);
                if(response.status === 201) {
                    toast.success(response?.data?.message);
                    navigate('/admin/categories');
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        addCategory();
    };

    return (
        <section className="section-container">
            <div className="section-header">
                <h1>Add SubCategory</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-menu">
                    <label htmlFor="categoryName">SubCategory Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        autoComplete="off"
                        required
                        name="name"
                        value={category.name}
                        placeholder="Enter Unique SubCategory name..."
                        onChange={handleCategoryChange}
                    />
                </div>
                <div className="form-menu">
                    <label htmlFor="categoryType">SubCategory Type:</label>
                    <input
                        type="text"
                        id="categoryType"
                        autoComplete="off"
                        name="categoryType"
                        value={category.categoryType}
                        placeholder="Enter Unique SubCategory type..."
                        onChange={handleCategoryChange}
                    />
                </div>
                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
        </section>
    );
};

export default AddSubCategory;
