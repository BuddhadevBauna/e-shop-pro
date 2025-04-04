import { useState } from "react";
import "../../Form.css";
import "./AddCategory.css";
import "../../Button.css";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategory = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: "",
        categoryType: ""
    })
    // console.log(category);
    const [subCategories, setSubCategories] = useState([
        {
            name: "",
            categoryType: "",
        },
    ]);
    // console.log(subCategories);

    const addSubCategory = () => {
        setSubCategories([
            ...subCategories,
            {
                name: "",
                categoryType: "",
            },
        ]);
    };

    const deleteSubCategory = (index) => {
        const newSubCategories = subCategories.filter(
            (_, subIndex) => subIndex !== index
        );
        setSubCategories(newSubCategories);
    };

    const handleCategoryChange = (e) => {
        const {name, value} = e.target;
        setCategory({
            ...category,
            [name]: value
        })
    }

    const handleSubCategoryChange = (e, index) => {
        const {name, value} = e.target;
        // console.log(name, value);
        const updatedSubCategories = [...subCategories];
        updatedSubCategories[index] = {
            ...updatedSubCategories[index],
            [name]: value
        }
        setSubCategories(updatedSubCategories);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = {
            ...category,
            "subCategory": subCategories
        }
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
                } else if(response.status === 207) {
                    toast.warn(response?.data?.message);
                }
                navigate('/admin/categories');
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        addCategory();
    };

    return (
        <>
            <section className="section-container">
                <div className="section-header">
                    <h1>Add Category</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-menu">
                        <label htmlFor="categoryName">Category Name:</label>
                        <input
                            type="text"
                            id="categoryName"
                            autoComplete="off"
                            required
                            name="name"
                            value={category.name}
                            placeholder="Enter Unique Category name..."
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="categoryType">Category Type:</label>
                        <input
                            type="text"
                            id="categoryType"
                            autoComplete="off"
                            name="categoryType"
                            value={category.categoryType}
                            placeholder="Enter Unique Category type..."
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className="subCategory-container">
                        {subCategories.map((subCategory, index) => (
                            <div className="subCategory" key={index}>
                                <div className="form-menu">
                                    <label htmlFor={`subCategoryName-${index}`}>
                                        SubCategory Name:
                                    </label>
                                    <input
                                        type="text"
                                        id={`subCategoryName-${index}`}
                                        autoComplete="off"
                                        required
                                        name="name"
                                        value={subCategory.name}
                                        placeholder="Enter subCategory name..."
                                        onChange={(e) => handleSubCategoryChange(e, index)}
                                    />
                                </div>
                                <div className="form-menu">
                                    <label htmlFor={`subCategoryType${index}`}>
                                        Subategory Type:
                                    </label>
                                    <input
                                        type="text"
                                        id={`subCategoryType${index}`}
                                        autoComplete="off"
                                        required
                                        name="categoryType"
                                        value={subCategory.categoryType}
                                        placeholder="Enter subCategory type..."
                                        onChange={(e) => handleSubCategoryChange(e, index)}
                                    />
                                </div>
                                <button
                                    className="btn delete-btn"
                                    onClick={() => deleteSubCategory(index)}
                                >
                                    <small>Delete subcategory</small>
                                </button>
                            </div>
                        ))}
                        <button
                            className="btn add-btn"
                            onClick={addSubCategory}
                        >
                            {subCategories.length === 0 ? (
                                <small>Add subcategory</small>
                            ) : (
                                <small>Add more subcategory</small>
                            )}
                        </button>
                    </div>
                    <button className="submit-btn" type="submit">
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
};

export default AddCategory;
