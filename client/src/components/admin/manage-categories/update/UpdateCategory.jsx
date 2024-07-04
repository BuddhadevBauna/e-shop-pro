import { useEffect, useState } from "react";
import "../../Form.css";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth";
import { useNavigate } from "react-router-dom";

const UpdateCategory = ({ categoryId }) => {
    const [input, setInput] = useState({
        categoryName: "",
        categoryType: ""
    })
    // console.log(input);
    const [loading, setLoading] = useState(true);
    const {AuthorizationToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const getCategory = async () => {
            try {
                const particularCategory = await axios.get(`http://localhost:3030/categories/q?categoryId=${categoryId}`);
                // console.log(particularCategory.data);
                setInput({
                    categoryName: particularCategory.data.name,
                    categoryType: particularCategory.data.categoryType || "Null"
                })
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getCategory();
    }, [categoryId])

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
            const updateCategoryURL = `${import.meta.env.VITE_UPDATE_CATEGORY_SECTION_URL}?categoryId=${categoryId}`;
            // console.log(updateCategoryURL);
            const response = await axios.patch(updateCategoryURL, input, {
                headers: {
                    Authorization: AuthorizationToken
                }
            });
            // console.log(response);
            if(response.status === 200) {
                navigate('/admin/categories');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {loading ? (
                <div style={{margin: "5rem 0 2rem"}}>
                    <h1 style={{textAlign: "center"}}>Loading...</h1>
                </div>
            ) : (
                <section className="section-container">
                    <div className="section-header">
                        <h1>Update Category</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-menu">
                            <label htmlFor="categoryName">Category Name:</label>
                            <input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                autoComplete="off"
                                value={input.categoryName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-menu">
                            <label htmlFor="categoryType">Category Type:</label>
                            <input
                                type="text"
                                id="categoryType"
                                name="categoryType"
                                autoComplete="off"
                                value={input.categoryType}
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

export default UpdateCategory;