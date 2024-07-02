import { useEffect, useState } from "react";
import "../Categories.css";
import axios from "axios";

const UpdateCategory = ({ categoryId }) => {
    const [input, setInput] = useState({
        categoryName: "",
        categoryType: ""
    })
    // console.log(input);
    const [loading, setLoading] = useState(true);

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

    const handleSubmit = async () => {
        e.preventDefault();

    }

    return (
        <>
            {loading ? (
                <div style={{margin: "5rem 0 2rem"}}>
                    <h1 style={{textAlign: "center"}}>Loading...</h1>
                </div>
            ) : (
                <section className="section-container">
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
                        <button type="submit">Submit</button>
                    </form>
                </section>
            )}
        </>
    );
}

export default UpdateCategory;