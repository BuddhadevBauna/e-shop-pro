import React from "react";
import "./TextAreaInput.css";

const TextAreaInput = ({ label, required, name, value, mode, input, setInput, }) => {
    const handleChange = (e) => {
        let { name, value } = e.target;

        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    }

    return (
        <div className="form-menu">
            <div className="category-input-container">
                <label htmlFor={name}>{label} :</label>
                <textarea
                    id={name}
                    autoComplete="off"
                    required={required}
                    rows={5}
                    name={name}
                    value={value}
                    onChange={handleChange}
                ></textarea>
            </div>
            {(mode === "View") &&
                <button className="submit-btn" type="submit">
                    Update
                </button>
            }
        </div>
    )
}

export default TextAreaInput;