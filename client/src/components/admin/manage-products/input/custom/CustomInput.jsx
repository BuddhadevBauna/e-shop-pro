import React, { useState } from "react";

const CustomInput = ({ label, type, required, name, value, mode, input, setInput, ...rest }) => {
    const [error, setError] = useState("")

    const handleChange = (e) => {
        let { name, value } = e.target;
        // console.log(rest);
        if (Object.keys(rest).length !== 0) {
            let min = rest.min;
            let max = rest.max;
            if (min !== undefined && max !== undefined) {
                if (value < min || value > max) setError(`${name} must be between ${min} and ${max}.`);
                else setError("");
            } else if (min !== undefined) {
                if (value < min) setError(`${name} must be greater or equal to ${min}.`);
                else setError("");
            }
        }

        setInput((prevInput) => ({
            ...prevInput,
            [name]: type === "number" ? (value === "" ? "" : Number(value)) : value
        }));
    };

    return (
        <div className="form-menu">
            <div className="category-input-container">
                <label htmlFor={name}>{label} :</label>
                <input
                    type={type}
                    id={name}
                    autoComplete="off"
                    required={required}
                    {...rest}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {error && <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>}
            </div>
            {(mode === "View") &&
                <button className="submit-btn" type="submit">
                    Update
                </button>
            }
        </div>
    )
}

export default CustomInput;