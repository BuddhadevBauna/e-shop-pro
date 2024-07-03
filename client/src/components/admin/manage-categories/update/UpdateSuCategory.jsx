import { useEffect, useState } from "react";
import "../Categories.css";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth";
import { fetchProductsCategory } from "../../../../api/categories/categoryAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const UpdateSubCategory = ({ categoryId, subCategoryId }) => {
    const [input, setInput] = useState({
        subCategoryName: "",
        subCategoryType: ""
    })
    // console.log(input);
    const [loading, setLoading] = useState(true);
    const {AuthorizationToken} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        try {
            const updateSubCategoryURL = `${import.meta.env.VITE_UPDATE_CATEGORY_SECTION_URL}?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
            // console.log(updateSubCategoryURL);
            const response = await axios.patch(updateSubCategoryURL, input, {
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            // console.log(response);
            if(response.status === 200) {
                fetchProductsCategory(dispatch);
                navigate('/admin/categories');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {loading ? (
                <div style={{ margin: "5rem 0 2rem" }}>
                    <h1 style={{ textAlign: "center" }}>Loading...</h1>
                </div>
            ) : (
                <section className="section-container">
                    <div className="section-header">
                        <h1>Update Subcategory</h1>
                    </div>
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