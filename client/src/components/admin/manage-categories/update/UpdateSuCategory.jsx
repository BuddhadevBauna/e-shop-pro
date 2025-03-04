import { useEffect, useState } from "react";
import "../../Form.css";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateSubCategory = ({ categoryId, subCategoryId }) => {
    const [input, setInput] = useState({
        name: "",
        categoryType: ""
    })
    // console.log(input);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const getCategory = async () => {
            try {
                const subCategory = await axios.get(`http://localhost:3030/categories/q?categoryId=${categoryId}&subCategoryId=${subCategoryId}`);
                // console.log(subCategory.data.name);
                setInput({
                    name: subCategory?.data?.name,
                    categoryType: subCategory?.data?.categoryType
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getCategory();
    }, [categoryId, subCategoryId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setInput({
            ...input,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateSubCategoryURL = `${import.meta.env.VITE_UPDATE_CATEGORY}?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
            // console.log(updateSubCategoryURL);
            const response = await axios.patch(updateSubCategoryURL, input, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response);
            if(response.status === 200) {
                toast.success(response?.data?.message);
                navigate('/admin/categories');
            }
        } catch (error) {
            // console.error(error);
            toast.error(error?.response?.data?.message);
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
                            <label htmlFor="name">SubCategory Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={input.name}
                                placeholder="Enter SubCategory Name..."
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-menu">
                            <label htmlFor="categoryType">SubCategory Type:</label>
                            <input
                                type="text"
                                id="categoryType"
                                name="categoryType"
                                value={input.categoryType}
                                placeholder="Enter SubCategory Type..."
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </section>
            )}
        </>
    );
}

export default UpdateSubCategory;