import { useState } from "react";
import "../Categories.css";

const UpdateSubCategory = () => {
    const [input, setInput] = useState({
        subCategoryName: "",
        subCategoryType: ""
    })
    // console.log(input);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
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
        </>
    );
}

export default UpdateSubCategory;