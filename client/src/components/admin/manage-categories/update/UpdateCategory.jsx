import { useState } from "react";
import "../Categories.css";

const UpdateCategory = () => {
    const [input, setInput] = useState({
        categoryName: "",
        categoryType: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        // console.log(name, value);
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    console.log(input);

    const handleSubmit = async () => {
        e.preventDefault();
        
    }

    return (
        <>
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
        </>
    );
}

export default UpdateCategory;