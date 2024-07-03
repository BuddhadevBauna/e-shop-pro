import { useState } from "react";
import "./AddCategory.css";

const AddCategory = () => {
    const [subCategories, setSubCategories] = useState([
        {
            subCategoryName: "",
            subCategoryType: "",
        },
    ]);

    const addSubCategory = () => {
        setSubCategories([
            ...subCategories,
            {
                subCategoryName: "",
                subCategoryType: "",
            },
        ]);
    };

    const deleteSubCategory = (index) => {
        const newSubCategories = subCategories.filter(
            (_, subIndex) => subIndex !== index
        );
        setSubCategories(newSubCategories);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                            name="categoryName"
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="categoryType">Category Type:</label>
                        <input
                            type="text"
                            id="categoryType"
                            name="categoryType"
                            autoComplete="off"
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
                                        name="subCategoryName"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="form-menu">
                                    <label htmlFor={`subCategoryType${index}`}>
                                        Subategory Type:
                                    </label>
                                    <input
                                        type="text"
                                        id={`subCategoryType${index}`}
                                        name="subCategoryType"
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    className="subcategory-btn subcategory-delete-btn"
                                    onClick={() => deleteSubCategory(index)}
                                >
                                    <small>Delete subcategory</small>
                                </button>
                            </div>
                        ))}
                        <button
                            className="subcategory-btn subcategory-add-btn"
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
