import { useEffect, useState } from "react";
import "../Categories.css";
import axios from "axios";

const UpdateSubCategory = ({ categoryId, subCategoryId }) => {
    const [input, setInput] = useState({
        subCategoryName: "",
        subCategoryType: ""
    })
    // console.log(input);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const subCategory = await axios.get(`http://localhost:3030/categories/q?categoryId=${categoryId}&subCategoryId=${subCategoryId}`);
                // console.log(subCategory.data.name);
                setInput({
                    subCategoryName: subCategory.data.name,
                    subCategoryType: subCategory.data.categoryType || "Null"
                })
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getCategory();
    }, [categoryId, subCategoryId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            {loading ? (
                <div style={{ margin: "5rem 0 2rem" }}>
                    <h1 style={{ textAlign: "center" }}>Loading...</h1>
                </div>
            ) : (
                <section className="section-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-menu">
                            <label htmlFor="subCategoryName">SubCategory Name:</label>
                            <input
                                type="text"
                                id="subCategoryName"
                                name="subCategoryName"
                                autoComplete="off"
                                value={input.subCategoryName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-menu">
                            <label htmlFor="subCategoryType">SubCategory Type:</label>
                            <input
                                type="text"
                                id="subCategoryType"
                                name="subCategoryType"
                                autoComplete="off"
                                value={input.subCategoryType}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </section>
            )}
        </>
    );
}

export default UpdateSubCategory;